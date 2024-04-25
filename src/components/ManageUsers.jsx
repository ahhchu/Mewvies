import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFirestore, collection, getDocs } from "firebase/firestore"; // Import Firestore methods
import "./Header.css";
import "./Button.css";
import { db } from '../config/firestore';
import Button from "./Button";

function ManageUsers() {
    const [users, setUsers] = useState([]); 

    useEffect(() => {
        const fetchUsers = async () => {
            const db = getFirestore(); 
            const usersCollection = collection(db, "user"); // 'users' collection
            const userData = await getDocs(usersCollection); 
            const userList = userData.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
            setUsers(userList); 
        };

        fetchUsers(); 
    }, []);

    return (
        <div className="page-wrapper">
            <div className="header1">
                <Link to="/managemovies">
                    <Button className="manage">Manage Movies</Button>
                </Link>
                <Link to="/managepromotions">
                    <Button className="manage">Manage Promos</Button>
                </Link>
                <h1>Manage Users</h1>
                <div className="header_middle">
                    <Button type="button" className="manage">
                        Find User
                    </Button>
                </div>
            </div>
            <div className="user-list">
                {users.map(user => (
                    <div key={user.id} className="user-details">
                        <p>Email: {user.email}</p>
                        <p>First Name: {user.fname}</p>
                        <p>Last Name: {user.lname}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Address: {user.home_address_one}, {user.home_address_two}, {user.home_city}, {user.home_state}, {user.home_zip}</p>
                        <p>Role: {user.role}</p>
                        <p>Status: {user.status}</p>
                        <p>Promo Eligible: {user.promo ? 'Yes' : 'No'}</p>
                        < br/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManageUsers;
