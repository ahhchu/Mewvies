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
import { collection, getDocs, doc, setDoc, updateDoc, addDoc, deleteDoc, Timestamp, where, query } from "firebase/firestore";
import { db } from "../config/firestore";

function OrderHistory() {
//  var movieID = "123456"
  const [orders, setOrders] = useState([]);
  const [movies, setMovies] = useState([]);
  const [showings, setShowings] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  
//  const [userDetails, setUser] = useState({})

useEffect(() => {
  const fetchInitialData = async () => {
      const moviesData = await getMovies(); 
      console.log("Movies fetched and set in state:", moviesData);
      const showingsData = await getShowings(); 
      setMovies(moviesData);
      setShowings(showingsData);

      const orderQuery = query(collection(db, "order"), where("customer_id", "==", currentUser.uid));
      
      const orderSnapshot = await getDocs(orderQuery);
      const tempOrders = orderSnapshot.docs.map(doc => {
          let order = doc.data();
         
          let movie = moviesData.find(movie => movie.movie_id === order.movie_id);
//let movie = moviesData.find(movie => movie.movie_id === "123456");
          console.log("Order movie_id: ", order.movie_id); // Check if movie_id is as expected
          console.log("Movie found: ", movie ? "Yes" : "No"); // Check if movie was found
          
          let showing = showingsData.find(showing => showing.showing_id === order.showing_id);
          console.log("Order showing_id: ", order.showing_id); // Check if showing_id is as expected
          console.log("Showing found: ", showing ? "Yes" : "No"); // Check if showing was found
          
          return {
              ...order,
              movie_name: movie ? movie.movie_title : "Unknown",
              showing_time: showing ? showing.showing_time : "Unknown",
              showing_room: showing ? showing.room_id : "Unknown"
          };
          
      });
      
      setOrders(tempOrders);
//      console.log(new Date("2024-05-05T20:13:55.619Z").toString()); // Should log a valid date
     
  };

  if (currentUser) {
      fetchInitialData();
  }
}, [currentUser]);



return (
  <div className="popup">
      <div className="popup-inner">
          <h2>Order History</h2>
{/*          <div className="signup-divider" />*/}
          <div className="personal-details">
              <table>
                  <tr>
                      {/*<th>Order ID</th>*/}
                      <th>Promotion</th>
                      <th>Movie</th>
                      <th>Showing Time</th>
                      <th>Showing Room</th>
                      <th>Seat Number</th>
                      <th>Ticket Price</th>
                      <th>Ticket Type</th>
                      <th>Purchase time</th>
                      
                  </tr>
                  {orders.map(order => (
                      <tr key={order.order_id}>
                          {/*<td>{order.order_id}</td>*/}
                          <td>{order.promo_id}</td>
                          <td>{order.movie_name}</td>
                          <td>{new Date(order.showing_time.seconds).toString()}</td>
                          <td>{order.showing_room}</td>
                          <td>{order.seat_number}</td>
                          <td>{"$" + order.ticket_price}</td>
                          <td>{order.ticket_type}</td>
                          <td>{new Date(order.purchase_time).toString()}</td>
                      </tr>
                  ))}
              </table>
          </div>
      </div>
  </div>
);
}

export default OrderHistory;
