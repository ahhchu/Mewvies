import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Button.css";
import Button from "./Button";
import Search from "./Search";

function Admin() {
    return (
        <div className="page-wrapper">
            <div className="welcome_msg">
                <h2 className="text">Admin Dashboard</h2>
            </div>
            <div>
            <Link to ="/managemovies">
             <button className="manage">Manage Movies</button> 
            </Link>
            <Link to ="/manageusers">
             <button className="manage">Manage Users</button> 
            </Link>
            <Link to ="/managepromotions">
             <button className="manage">Manage Promotions</button> 
            </Link>
            </div>
        </div>
    );
}

export default Admin;
