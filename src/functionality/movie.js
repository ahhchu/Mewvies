//addMovie, editMovie, removeMovie, getMovies

import { collection, getDocs, doc, setDoc, updateDoc, getDoc, deleteDoc, Timestamp } from "firebase/firestore";
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

/* Updates a particular movieID with the new parameters. All parameters are required.
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
            trailer: trailerUrl,
            rating: rating,
            picture: posterUrl,
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