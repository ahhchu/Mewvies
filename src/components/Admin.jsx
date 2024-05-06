import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Search from "./Search";

function Admin() {
    return (
        <div className="page-wrapper">
            <div className="welcome_msg">
                <h2 className="text">Admin Dashboard</h2>
            </div>
            <div>
            <Link to ="/managemovies">
             <button className="btn">Manage Movies</button> 
            </Link>
            <Link to ="/manageusers">
             <button className="btn">Manage Users</button> 
            </Link>
            <Link to ="/managepromotions">
             <button className="btn">Manage Promos</button> 
            </Link>
            <Link to ="/manageprices">
             <button className="btn">Manage Prices</button> 
            </Link>
            </div>
        </div>
    );
}

export default Admin;
