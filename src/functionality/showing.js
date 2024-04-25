import { getRooms } from "./showrooms";

/* Adds a showing. Everything is a string, except showingTime, which needs to be a Date()
 */
export async function addShowing(movieID, roomID, showingTime) {
    var newShowing = {};
    try {
        if (checkShowingAvailability(roomID, showingTime)) {
        newShowing = {
            movie_id: movieID,
            room_id: roomID,
            showing_time: showingTime,
            showing_id: 0,
        };
        getRooms().then(async (data) => {
            newShowing.showing_id = data.length;
            var showingRef = doc(db, "showing", newShowing.showing_id.toString());
            await setDoc(showingRef, newShowing);
            return true;
        })
    }
    } catch (error) {
        console.log(error);
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
        var snapshot = await getDocs(collection(db, "showing"));
        var existingShowings = [];
        snapshot.docs.forEach((element) => {
            if (element.movie_id == movieID) {
                existingShowings.push(element.data());
            }
        });
        return existingShowings;
    } catch (error) {
        return [];
    } // try
} // getShowings

/* Internal function used for the sake of checking if a time & room combination is available.
 */
async function checkShowingAvailability(roomID, showingTime) {
    try {
        // checks if the room is available at the specified time
        var snapshot = await getDocs(collection(db, "showing"));
        snapshot.docs.forEach((element) => {
            if (element.room_id == roomID && element.showing_time.getTime() == showingTime) {
                return false;
            }
        });

        // checks if the room exists.
        var rooms = await getRooms();
        rooms.forEach(element => {
            if (element.room_id == roomID) {
                return true;
            }
        });
        return false;
    } catch (error) {
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