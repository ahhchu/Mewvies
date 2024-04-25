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
} // addRoom

export async function getMovies() {
    try {
        var snapshot = await getDocs(collection(db, "movie"));
        var existingRooms = [];
        snapshot.docs.forEach((element) => {
            existingRooms.push(element.data());
        });
        return existingRooms;
    } catch (error) {
        return [];
    } // try
} // getRooms

export async function removeMovie(movie_id) {
    var promise;
    var snapshot = await getDocs(collection(db, "movie"));
    if (snapshot.docs.length == 0) {
        return;
    }
        snapshot.docs.forEach((element) => {
            if (element.data().room_id == roomID) {
                deleteDoc(element.ref, promise);
            } // if
        });
}