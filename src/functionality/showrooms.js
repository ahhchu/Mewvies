//addRoom, deleteRoom, getRooms

import { collection, getDocs, doc, setDoc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firestore";

export async function addRoom(roomName, roomRows, roomColumns) {
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

export async function getRooms() {
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

export async function removeRoom(roomID) {
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

export async function removeAllRoom() {
    var promise;
    var snapshot = await getDocs(collection(db, "show_rooms"));
    if (snapshot.docs.length == 0) {
        return;
    }
        snapshot.docs.forEach((element) => {
            deleteDoc(element.ref, promise);
        });
}