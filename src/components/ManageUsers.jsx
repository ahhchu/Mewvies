import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllUsers, addUser, deleteUser, updateUser } from "../functionality/User";
import Button from "./Button";
import "./Header.css";
import "./Button.css";

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [displayUsers, setDisplayUsers] = useState([]);
    const [showPromoUsers, setShowPromoUsers] = useState(false);
    const [newUser, setNewUser] = useState({ email: '', fname: '', lname: '', promo: false, phone: '', homeAddressOne:'', homeAddressTwo:'', homeCity:'',homeState:'',homeZipCode:'' });
    const [editingUser, setEditingUser] = useState(null);
    const [message, setMessage] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        if (showPromoUsers) {
            const promoUsers = users.filter(user => user.promo === true);
            setDisplayUsers(promoUsers);
        } else {
            setDisplayUsers(users);
        }
    }, [showPromoUsers, users]);  
    
    const fetchUsers = async () => {
        const userList = await fetchAllUsers();
        setUsers(userList);
        setDisplayUsers(userList);
    };

    const displaySuccessMessage = (msg) => {
        setMessage(msg);
        setShowMessage(true);
        setTimeout(() => {
            setShowMessage(false);
            setMessage('');
        }, 3000);
    };

    const handleInputChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleCheckboxChange = (e) => {
        setNewUser({ ...newUser, promo: e.target.checked });
    };

    const handleAddUser = async () => {
        await addUser(newUser);
        setNewUser({  email: '', fname: '', lname: '', promo: false, phone: '', homeAddressOne:'', homeAddressTwo:'', homeCity:'',homeState:'',homeZipCode:'' }); // reset form fields
        displaySuccessMessage('User added successfully!');
        fetchUsers();
    };

    const handleDeleteUser = async (userId) => {
        await deleteUser(userId);
        displaySuccessMessage('User deleted successfully!');
        fetchUsers();
    };

    const handleSaveChanges = async () => {
        await updateUser(editingUser.id, editingUser);
        setEditingUser(null);
        displaySuccessMessage('User updated successfully!');
        fetchUsers();
    };

    const handleEditClick = (user) => {
        setEditingUser({...user});
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
                {showMessage && <div className="alert">{message}</div>}
                <div className="header_middle">
                    <label>
                        <input
                            type="checkbox"
                            checked={showPromoUsers}
                            onChange={() => setShowPromoUsers(!showPromoUsers)}
                        />
                        Show Only Promo Registered Users
                    </label>
                    <div>
                        <h2>Add New User</h2>
                        <input type="text" name="email" placeholder="Email" value={newUser.email} onChange={handleInputChange} /> <br/>
                        <input type="text" name="fname" placeholder="First Name" value={newUser.fname} onChange={handleInputChange} /><br/>
                        <input type="text" name="lname" placeholder="Last Name" value={newUser.lname} onChange={handleInputChange} /><br/>
                        <input type="text" name="phone" placeholder="Phone" value={newUser.phone} onChange={handleInputChange} /><br/>
                        <input type="text" name="homeAddressOne" placeholder="Home Address One" value={newUser.homeAddressOne} onChange={handleInputChange} /><br/>
                        <input type="text" name="homeAddressTwo" placeholder="Home Address Two" value={newUser.homeAddressTwo} onChange={handleInputChange} /><br/>
                        <input type="text" name="homeCity" placeholder="Home City" value={newUser.homeCity} onChange={handleInputChange} /><br/>
                        <input type="text" name="homeState" placeholder="Home State" value={newUser.homeState} onChange={handleInputChange} /><br/>
                        <input type="text" name="homeZipCode" placeholder="Home Zip Code" value={newUser.homeZipCode} onChange={handleInputChange} /><br/>
                        <label>
                            <input type="checkbox" name="promo" checked={newUser.promo} onChange={handleCheckboxChange} />
                            Promo
                        </label><br/>
                        <Button onClick={handleAddUser}>Add User</Button><br/><br/>
                    </div>
                </div>
            </div>
            <div className="user-list">
                <h2>User List</h2>
                {displayUsers.map(user => (
                    <div key={user.id} className="user-details">
                        <p>Email: {user.email}</p>
                        <p>First Name: {user.fname}</p>
                        <p>Last Name: {user.lname}</p>
                        <p>Home Address One: {user.homeAddressOne}</p>
                        <p>Line Two: {user.homeAddressTwo}</p>
                        <p>Home City: {user.homeCity}</p>
                        <p>Home State: {user.homeState}</p>
                        <p>Home Zip Code: {user.homeZipCode}</p>
                        <p>Promo: {user.promo ? "Yes" : "No"}</p>
                        <Button onClick={() => handleEditClick(user)}>Edit</Button>
                        <Button onClick={() => handleDeleteUser(user.id)}>Delete</Button>
                    </div>
                ))}
                {editingUser && <div>
                    <h2>Edit User</h2>
                    <p>Email: {editingUser.email}</p><br/>
                    <input type="text" name="fname" value={editingUser.fname} onChange={(e) => setEditingUser({ ...editingUser, fname: e.target.value })} /><br/>
                    <input type="text" name="lname" value={editingUser.lname} onChange={(e) => setEditingUser({ ...editingUser, lname: e.target.value })} /><br/>
                    <input type="text" name="lname" value={editingUser.phone} onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })} /><br/>
                    <input type="text" name="lname" value={editingUser.homeAddressOne} onChange={(e) => setEditingUser({ ...editingUser, homeAddressOne: e.target.value })} /><br/>
                    <input type="text" name="lname" value={editingUser.homeAddressTwo} onChange={(e) => setEditingUser({ ...editingUser, homeAddressTwo: e.target.value })} /><br/>
                    <input type="text" name="lname" value={editingUser.homeCity} onChange={(e) => setEditingUser({ ...editingUser, homeCity: e.target.value })} /><br/>
                    <input type="text" name="lname" value={editingUser.homeState} onChange={(e) => setEditingUser({ ...editingUser, homeState: e.target.value })} /><br/>
                    <input type="text" name="lname" value={editingUser.homeZipCode} onChange={(e) => setEditingUser({ ...editingUser, homeZipCode: e.target.value })} /><br/>
                    <Button onClick={handleSaveChanges}>Save Changes</Button>
                </div>}
            </div>
        </div>
    );
}

export default ManageUsers;
