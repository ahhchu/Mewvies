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
            <Button type="button" className="manage">
             Manage Movies
            </Button>
            <Button type="button" className="manage">
            Manage Users
            </Button>
            <Button type="button" className="manage">
            Manage Promotions
            </Button>
            </div>
        </div>
    );
}

export default Admin;
