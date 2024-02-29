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
                <h2>Manage Promotions</h2>
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
