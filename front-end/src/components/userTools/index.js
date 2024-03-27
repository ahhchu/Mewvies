/* import React, { useState, useEffect } from 'react';

import Signup from './Signup';
import Login from './Login';
import EditProfile from './EditProfile';

import {collection, getDocs} from "firebase/firestore";
import { db } from "../../config/firestore";

const userTools = async({setIsAuthenticated}) => {
    const [user, setUser] = useState();
    const [currentUser, setCurrentUser] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [isEdit, setIsEdit] = useState(false);


    const getUser = async () => {
        const querySnapshot = await getDocs(collection(db, "user"));
        const user = querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        setUser(user)
    }

      useEffect(() => {
        getUser()
      }, []);

      const handleEdit = id => {
        const [user] = user.filter(user => user.id === id);

        setCurrentUser(user);
        setIsEdit(true);
      };

      return {
        <div >
        <EditProfile
          user={user}
          currentUser={currentUser}
          setUser={setUser}
          setIsEdit={setIsEdit}
          getUser={getUser}
        />
        </div>
    };
};


export default userTools; */