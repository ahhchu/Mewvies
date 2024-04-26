import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from '../config/firestore';
import { fetchAllUsers, addUser, deleteUser } from "../functionality/User";
import "./Header.css";
import "./Button.css";
import Button from "./Button";

function ManageUsers() {
    const [users, setUsers] = useState([]); 
    const [displayUsers, setDisplayUsers] = useState([]);
    const [showPromoUsers, setShowPromoUsers] = useState(false);
    const [newUser, setNewUser] = useState({ email: '', fname: '', lname: '', promo: false });
    const [editingUser, setEditingUser] = useState(null); 
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const userList = await fetchAllUsers();
        setUsers(userList);
        setDisplayUsers(userList);
    };

    useEffect(() => {
        if (showPromoUsers) {
            const filteredUsers = users.filter(user => user.promo === true);
            setDisplayUsers(filteredUsers);
        } else {
            setDisplayUsers(users);
        }
    }, [showPromoUsers, users]);

    const handlePromoChange = () => {
        setShowPromoUsers(!showPromoUsers);
    };

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setNewUser({ ...newUser, promo: e.target.checked });
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setIsEditing(true);
    };

    const handleAddUser = async () => {
        await addUser(newUser);
        fetchUsers();
    };

    const handleDeleteUser = async (userId) => {
        await deleteUser(userId);
        fetchUsers();
    };

    return (
        <div className="page-wrapper">
            <div className="header1">
                <Link to="/managemovies">
                    <Button className="manage">Manage Movies</Button>
                </Link>
                <Link to="/managepromotions">
                    <Button className="manage">Manage Promos</Button>
                </Link>
                <h1>Manage Users</h1>
                <div className="header_middle">
                    <label>
                        <input
                            type="checkbox"
                            checked={showPromoUsers}
                            onChange={handlePromoChange}
                        />
                        Show Only Promo Registered Users
                    </label>
                    <div>
                        <h2>Add New User</h2>
                        <input type="text" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} />
                        <input type="text" name="fname" placeholder="First Name" value={newUser.fname} onChange={handleInputChange} />
                        <input type="text" name="lname" placeholder="Last Name" value={newUser.lname} onChange={handleInputChange} />
                        <label>
                            <input type="checkbox" name="promo" checked={newUser.promo} onChange={handleCheckboxChange} /> Promo
                        </label>
                        <Button onClick={handleAddUser}>Add User</Button>
                    </div>
                </div>
            </div>
            <div className="user-list">
                {displayUsers.map(user => (
                    <div key={user.id} className="user-details">
                        <p>Email: {user.email}</p>
                        <p>First Name: {user.fname}</p>
                        <p>Last Name: {user.lname}</p>
                        <p>Phone: {user.phone}</p>
                        <p>Address: {user.home_address_one}, {user.home_address_two}, {user.home_city}, {user.home_state}, {user.home_zip}</p>
                        <p>Role: {user.role}</p>
                        <p>Status: {user.status}</p>
                        <p>Promo Eligible: {user.promo ? 'Yes' : 'No'}</p>
                        <Button onClick={() => handleEditClick(user)}>Edit</Button>
                        <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                    </div>
                ))}
                    <div>
                        <h2>Edit User</h2>
                        <input type="text" name="email" value={editingUser.email} onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })} />
                        <input type="text" name="fname" value={editingUser.fname} onChange={(e) => setEditingUser({ ...editingUser, fname: e.target.value })} />
                        <input type="text" name="lname" value={editingUser.lname} onChange={(e) => setEditingUser({ ...editingUser, lname: e.target.value })} />
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </div>
            </div>
        </div>
    );
}

export default ManageUsers;
