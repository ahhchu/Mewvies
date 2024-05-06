import { collection, getDocs, doc, setDoc, updateDoc, getDoc, deleteDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/firestore";
import { getRooms } from "./showrooms";

/* Adds a showing. Everything is a string, except showingTime, which needs to be a Date()
 */
export async function addShowing(movieID, roomID, showingTime) {
    try {
        console.log("Checking availability for room:", roomID, " at time:", showingTime);
        if (await checkShowingAvailability(roomID, showingTime)) {
            // Convert roomID to string in case it is not
            const roomIDString = roomID.toString();
            
            // Fetch current showings to generate a new showing_id
            const showingsData = await getShowings();
            const showingIDString = (showingsData.length).toString(); // Convert the index to a string

            // New showing object
            const newShowing = {
                movie_id: movieID,
                room_id: roomIDString,
                showing_time: Timestamp.fromDate(showingTime),
                showing_id: showingIDString,
            };

            // Using showingIDString as the document ID in Firestore
            const showingRef = doc(db, "showing", showingIDString);
            await setDoc(showingRef, newShowing);
            console.log("New showing added successfully:", newShowing);
            return true;
        } else {
            console.log("Showing not available for the provided time and room.");
            return false;
        }
    } catch (error) {
        console.error("Failed to add showing due to error:", error);
        return false;
    }
}
 // addShowing

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
        const data = await getShowings(); // Make sure this method returns an array
        const sortedShowings = data.filter(element => element.movie_id === movieID);
        return sortedShowings;
    } catch (error) {
        console.error("Error getting showings by movie:", error);
        return []; // Always return an array, even on failure
    }
}


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