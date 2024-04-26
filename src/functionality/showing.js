import { collection, getDocs, doc, setDoc, updateDoc, getDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firestore";
import { getRooms } from "./showrooms";

/* Adds a showing. Everything is a string, except showingTime, which needs to be a Date()
 */
export async function addShowing(movieID, roomID, showingTime) {
    var newShowing = {};
    try {
        var returnthing = false;
        console.log(await checkShowingAvailability(roomID, showingTime));
        if (await checkShowingAvailability(roomID, showingTime)) {
        newShowing = {
            movie_id: movieID,
            room_id: roomID,
            showing_time: Timestamp.fromDate(showingTime),
            showing_id: 0,
        };
        var data = await getShowings()
            newShowing.showing_id = data.length;
            var showingRef = doc(db, "showing", newShowing.showing_id.toString());
            await setDoc(showingRef, newShowing);
            returnthing = true;
            return returnthing;
    }
    } catch (error) {
        console.log(error);
        return false;
      } // try
} // addShowing

/* gets all showings, no param required.
*/
export async function getShowings() {
    try {
        var snapshot = await getDocs(collection(db, "showing"));
        var existingShowings = [];
        snapshot.docs.forEach((element) => {
            existingShowings.push(element.data());
        });
        return existingShowings;
    } catch (error) {
        return [];
    } // try
} // getShowings

/* gets all showings by movieID
*/
export async function getShowingsByMovie(movieID) {
    try {
        var sortedShowings = []
       getShowings().then((data) => {
        data.forEach(element => {
            if (element.movie_id == movieID) {
                sortedShowings.push(element)
            }
        });
        return sortedShowings;
       })
    } catch (error) {
        return [];
    } // try
} // getShowings

/* Internal function used for the sake of checking if a time & room combination is available.
 */
async function checkShowingAvailability(roomID, showingTime) {
    try {
        // checks if the room is available at the specified time
        // checks if the room exists.
        var rooms = await getRooms();
        var showings = await getShowings();
        if (roomID < rooms.length) {
            console.log("hi")
            for (var i = 0; i < showings.length; i++) {
                console.log(showings[i]);
                if (showings[i].room_id == roomID) {
                    if (showings[i].showing_time.seconds == Timestamp.fromDate(showingTime).seconds) {
                        return false;
                    }
                }
            }
        } else if (roomID > rooms.length) {

            return false;
        } else {

            return true;
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    } // try
} // checkShowingAvailability

export async function removeShowing(showingID) {
    var promise;
    var snapshot = await getDocs(collection(db, "showing"));
    if (snapshot.docs.length == 0) {
        return;
    }
        snapshot.docs.forEach((element) => {
            if (element.data().showing_id == showingID) {
                deleteDoc(element.ref, promise);
            } // if
        });
} // removeShowing