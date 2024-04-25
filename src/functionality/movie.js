//addMovie, editMovie, removeMovie, getMovies

import { collection, getDocs, doc, setDoc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firestore";

/* Everything is a string, openingDate should be a Date() object.
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
            trailer_url: trailerUrl,
            rating: rating,
            poster_url: posterUrl,
            opening_date: openingDate,
            movie_id: 0
        };
        getMovies().then(async (data) => {
            newMovie.movie_id = data.length;
            var movieRef = doc(db, "movie", newMovie.movie_id.toString());
            await setDoc(movieRef, newMovie);
            return true;
        })
    } catch (error) {
        console.log(error);
      } // try
} // addMovie

/* Updates a particular movieID with the new parameters
 */
export async function updateMovie(movieID, movieTitle, category, cast, director, producer, synopsis, trailerUrl, rating, posterUrl, openingDate) {
    var newMovie = {};
    try {
        newMovie = {
            movie_title: movieTitle,
            category: category,
            cast: cast,
            director: director,
            producer: producer,
            synopsis: synopsis,
            trailer_url: trailerUrl,
            rating: rating,
            poster_url: posterUrl,
            opening_date: openingDate,
            movie_id: movieID
        };
            var movieRef = doc(db, "movie", newMovie.movie_id.toString());
            await updateDoc(movieRef, newMovie);
            return true;
    } catch (error) {
        console.log(error);
      } // try
} // addRoom

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