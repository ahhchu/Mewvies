import React, { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import "./OrderHistory.css";
import "./Button.css";
import Button from "./Button";
import { checkEmailAvailability, validateEmail, registerUser, addPayment } from "../functionality/User";
import { getMovies } from "../functionality/movie";
import { addShowing, getShowings, getShowingsByMovie, removeShowing } from "../functionality/showing";
import { useNavigate } from "react-router-dom";
import { decryptData, encryptData } from "../services/crypto";
import {
  getAuth,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { fetchUserData, getPaymentCards, passphrase, changePassword, updateUser } from "../functionality/User";
import { getOrders } from "../functionality/order";

function OrderHistory() {

  var movieID = "123456"
  const [orders, setOrders] = useState([]);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const [showings, setShowings] = useState([]);
  const [userDetails, setUser] = useState({})

  try {
    fetchUserData(currentUser).then((userData) => {
      setUser(userData);
});
  } catch (e) {
    console.log(e);
  }

  getShowings().then((showingsList) => {getMovies().then((movieList) => {getOrders().then((data) => {
    var tempOrders = []
    data.forEach(element => {
      if (element.uid == userDetails.uid) {
        movieList.forEach(elle => {
          if (elle.movie_id == element.movie_id) {
            element.movie_name = elle.movie_title;
          }
        });
        showingsList.forEach(ils => {
          if (ils.showing_id == element.showing_id) {
            element.showing_time = ils.showing_time;
            element.showing_room = ils.room_id;
          }
        });
        tempOrders.push(element);
      }
      setOrders(tempOrders);
      console.log(orders);
    });
  })})})
  
    getShowings().then((data) => {
      var tempArray = [];
      data.forEach(element => {
        if (element.movie_id == movieID) {
          tempArray.push(element);
        }
      });
      setShowings(tempArray)
    })

  return (
    <div className="popup">
    
      <div className="popup-inner">
        <h2>Order History</h2>
        <div className="signup-divider" />

          <div className="personal-details">
            <table>
              <tr>
                <th>Order ID</th>
                <th>Promotion</th>
                <th>Movie</th>
                <th>Showing Time</th>
                <th>Showing Room</th>
                <th>Seat</th>
                <th>Ticket Price</th>
                <th>Ticket Type</th>
                <th>Purchase time</th>
              </tr>
              
              {orders.map((order) => {
                return( <tr>
                <th>{order.order_id}</th>
                <th>{order.promo_id}</th>
                <th>{order.movie_name}</th>
                <th>{new Date(order.showing_time.seconds).toString()}</th>
                <th>{order.showing_room}</th>
                <th>{order.seat_number}</th>
                <th>{"$" + order.ticket_price}</th>
                <th>{order.ticket_type}</th>
                <th>{new Date(order.purchase_time.seconds).toString()}</th>
                </tr>
                )
              })}
              </table>
            </div>
          </div>
      </div>
  );
}

export default OrderHistory;
