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
             <Button className="manage">Manage Movies</Button> 
            </Link>
            <Link to ="/managepromotions">
             <Button className="manage">Manage Promotions</Button> 
            </Link>
            <h1>Manage Users</h1>


                <div className="header_middle">
                        <Button type="button" className="manage">
                            Find User
                        </Button>
                </div>
            </div>
        </div>
    );
}

export default ManageUsers;
