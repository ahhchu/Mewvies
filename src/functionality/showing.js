//addShowing, removeShowing, getShowings, getShowingsMovie checkAvailableSeats, assignTicket, removeTicket

export async function addShowing(roomName, roomRows, roomColumns) {
    var newRoom = {};
    try {
        newRoom = {
            room_name: roomName,
            room_rows: roomRows,
            room_col: roomColumns,
            room_id: 0,
            room_capacity: roomRows * roomColumns,
        };
        getRooms().then(async (data) => {
            newRoom.room_id = data.length;
            var roomRef = doc(db, "show_rooms", newRoom.room_id.toString());
            await setDoc(roomRef, newRoom);
            return true;
        })
    } catch (error) {
        console.log(error);
      } // try
} // addRoom

export async function getShowings() {
    try {
        var snapshot = await getDocs(collection(db, "show_rooms"));
        var existingRooms = [];
        snapshot.docs.forEach((element) => {
            existingRooms.push(element.data());
        });
        return existingRooms;
    } catch (error) {
        return [];
    } // try
} // getRooms

export async function removeShowing(roomID) {
    var promise;
    var snapshot = await getDocs(collection(db, "show_rooms"));
    if (snapshot.docs.length == 0) {
        return;
    }
        snapshot.docs.forEach((element) => {
            if (element.data().room_id == roomID) {
                deleteDoc(element.ref, promise);
            } // if
        });
}