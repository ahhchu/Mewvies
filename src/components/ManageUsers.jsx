import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import "./Button.css";
import Button from "./Button";
import Search from "./Search";

function ManageUsers() {
    return (
        <div className="page-wrapper">
            <div className="header">
                <div className="header__left">
                    <Link className="button" to="/">
                        Home
                    </Link>
                <Search /> {/*search bar */}
                </div>

                <div className="header__center">
                    <h2>Mewvies</h2>
                </div>

                <div className="header__right">
                        <Button type="button" className="manage" onClick>
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
            <div>
                <h2>Manage Users</h2>
            </div>
        </div>
    );
}

export default ManageUsers;
