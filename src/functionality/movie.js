//addMovie, editMovie, removeMovie, getMovies

import { collection, getDocs, doc, setDoc, updateDoc, where, addDoc, deleteDoc, Timestamp, where, query } from "firebase/firestore";
import { db } from "../config/firestore";

/* Everything is a string, openingDate should be a Date().
 */
export async function addMovie(movieTitle, category, cast, director, producer, synopsis, trailerUrl, rating, posterUrl, openingDate) {
    var newMovie = {};
    try {
        newMovie = {
            movie_title: movieTitle,
            category: category,
            cast: cast,
            director: director,
            producer: producer,
            synopsis: synopsis,
            trailer: trailerUrl,
            rating: rating,
            picture: posterUrl,
            opening_date: Timestamp.fromDate(openingDate),
            movie_id: 0
        };
        const data = await getMovies();
        
        newMovie.movie_id = data.length;

        // Add the new movie to the database
        const movieRef = doc(db, "movie", newMovie.movie_id.toString());
        await setDoc(movieRef, newMovie);

        return true;
    } catch (error) {
        console.log(error);
      } // try
} // addMovie

/* Updates a particular movieID with the new parameters. All parameters are required.
 */
export async function updateMovie(movieID, movieTitle, category, cast, director, producer, synopsis, trailerUrl, rating, posterUrl, openingDate) {
    try {
        const movieRef = doc(db, "movie", movieID.toString());
        const newMovie = {
            movie_title: movieTitle,
            category: category,
            cast: cast,
            director: director,
            producer: producer,
            synopsis: synopsis,
            trailer: trailerUrl,
            rating: rating,
            picture: posterUrl,
            opening_date: openingDate,
            movie_id: movieID
        };
        await updateDoc(movieRef, newMovie);
        console.log("Update successful");
        return true;
    } catch (error) {
        console.error("Error updating document:", error);
    }
}

// by document field ID
export async function updateMovieByField(movieID, updates) {
    const moviesRef = collection(db, "movie");
    const q = query(moviesRef, where("movie_id", "==", movieID));

    try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
            console.log("No matching documents.");
            return false;
        }

        querySnapshot.forEach(async (doc) => {
            const docRef = doc.ref;
            await updateDoc(docRef, updates);
        });
        
        console.log("Document updated successfully");
        return true;
    } catch (error) {
        console.error("Error updating document:", error);
        return false;
    }
}


/* This returns an array of objects for all existing movies. No parameters required.
 */
export async function getMovies() {
    try {
        var snapshot = await getDocs(collection(db, "movie"));
        var existingMovies = [];
        snapshot.docs.forEach((element) => {
            existingMovies.push(element.data());
        });
        return existingMovies;
    } catch (error) {
        return [];
    } // try
} // getMovies


export async function getCurrentMovies() {
    try {
        var snapshot = await getDocs(collection(db, "movie"));
        var existingMovies = [];
        snapshot.docs.forEach((element) => {
            console.log("comparisons")
            console.log(element.data().opening_date)
            console.log(Timestamp.fromDate(new Date()))
            if (element.data().opening_date < Timestamp.fromDate(new Date())) {
            existingMovies.push(element.data());
            }
        });
        return existingMovies;
    } catch (error) {
        console.log(error);
        return [];
    } // try
}

export async function getUpcomingMovies() {
    try {
        var snapshot = await getDocs(collection(db, "movie"));
        var existingMovies = [];
        snapshot.docs.forEach((element) => {
            if (element.data().opening_date > Timestamp.fromDate(new Date())) {
            existingMovies.push(element.data());
            }
        });
        return existingMovies;
    } catch (error) {
        console.log(error);
        return [];
    } // try
}

/* This removes a specific movie by its movie_id.
 */
export async function removeMovie(movie_id) {
    var promise;
    var snapshot = await getDocs(collection(db, "movie"));
    if (snapshot.docs.length == 0) {
        return;
    }
        snapshot.docs.forEach((element) => {
            if (element.data().movie_id == movie_id) {
                deleteDoc(element.ref, promise);
            } // if
        });
}