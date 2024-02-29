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
             <Button className="manage">Manage Movies</Button> 
            </Link>
            <Link to ="/manageusers">
             <Button className="manage">Manage Users</Button> 
            </Link>
            <Link to ="/managepromotions">
             <Button className="manage">Manage Promotions</Button> 
            </Link>
            </div>
        </div>
    );
}

export default Admin;
