import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Button.css";
import Button from "./Button";
import Search from "./Search";

function ManageUsers() {
    return (
        <div className="page-wrapper">
            <div className="header1">
            <Link to ="/managemovies">
             <button className="manage">Manage Movies</button> 
            </Link>
            <Link to ="/manageusers">
             <button className="manage">Manage Users</button> 
            </Link>
            <Link to ="/managepromotions">
             <button className="manage">Manage Promotions</button> 
            </Link>
            <h2>Manage Users</h2>


                <div className="header_middle">
                        <Button type="button" className="manage">
                            Manage Users
                        </Button>
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;
