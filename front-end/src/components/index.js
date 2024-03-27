/* import React, { useState, useEffect } from 'react';

import Signup from './Signup';
import Login from './Login';
import EditProfile from './EditProfile';
import {collection, getDocs} from "firebase/firestore";

const Dashboard = async({setIsAuthenticated}) => {
    const [user, setUsers] = useState(userData);
    const [loginSeen, setLoginSeen] = useState(false);



    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ", doc.data());
});
} */