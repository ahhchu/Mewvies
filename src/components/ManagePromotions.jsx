import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Button.css";
import Button from "./Button";
import Search from "./Search";

function ManagePromotions() {
    return (
        <div className="page-wrapper">
         <div>
            <Link to ="/managemovies">
             <Button className="manage">Manage Movies</Button> 
            </Link>
            <Link to ="/manageusers">
             <Button className="manage">Manage Users</Button> 
            </Link>
            </div>
            <div>
                <h1>Manage Promotions</h1>
            </div>
            <Button>
                Ongoing Promotions
            </Button>
            <Button>
                Add Promotion
            </Button>
            <Button>
                End Promotion
            </Button>
        </div>
    );
}

export default ManagePromotions;
