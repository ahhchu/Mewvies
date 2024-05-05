//addPurchaseInventory, removePurchaseInventory, startCart, removeCart createCartItem, removeCartItem, setPayment, checkPromoDiscount, createOrder, cancelOrder
//getOrders
import { collection, getDocs, doc, setDoc, updateDoc, addDoc, deleteDoc, Timestamp, where, query } from "firebase/firestore";
import { db } from "../config/firestore";

export async function getOrders() {
    try {
        var snapshot = await getDocs(collection(db, "order"));
        var existingMovies = [];
        snapshot.docs.forEach((element) => {
            existingMovies.push(element.data());
        });
        return existingMovies;
    } catch (error) {
        return [];
    } // try
} // getOrders

export async function createOrder(uid, showingID, seatID, ticketPrice, ticketType, movieID, paymentID, promoID, roomID, purchaseTime) {
    var newShowing = {};
    try {
        var returnthing = false;
        newShowing = {
            movie_id: movieID,
            room_id: roomID,
            purchase_time: Timestamp.fromDate(purchaseTime),
            order_id: 0,
            showing_id: showingID,
            payment_id: paymentID,
            promo_id: promoID,
            seat_number: seatID,
            uid: uid,
            ticket_price: ticketPrice,
            ticket_type: ticketType
        };
        var data = await getShowings()
            newShowing.order_id = data.length;
            var showingRef = doc(db, "order", newShowing.order_id.toString());
            await setDoc(showingRef, newShowing);
            returnthing = true;
            return returnthing;
    } catch (error) {
        console.log(error);
        return false;
      } // try
} // addShowing
