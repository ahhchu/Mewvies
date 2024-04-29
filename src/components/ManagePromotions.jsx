import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { addPromo, deletePromo, fetchPromotions } from "../functionality/promos";
import "./Header.css";
import {fetchAllUsers} from "../functionality/User";
import "./Button.css";
//import { sendingEmail } from "../services/sendEmail";
import emailjs from '@emailjs/browser'


function ManagePromotions() {
    const [promoData, setPromoData] = useState({
        promo_id: "",
        promo_code: "",
        promo_amt: "",
        percentage_bool: false
    });
    const [users, setUsers] = useState([]);
    const [displayUsers, setDisplayUsers] = useState([]); // Added to hold the users to display
    const [showPromoUsers, setShowPromoUsers] = useState(false);
    const [promotions, setPromotions] = useState([]);
    const [selectedPromos, setSelectedPromos] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPromoData({
            ...promoData,
            [name]: type === "checkbox" ? checked : value
        });
    };
    const [promoUsers, setPromoUsers] = useState([]); // State to store users who opted for promos

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const userList = await fetchAllUsers();
        setUsers(userList);
        filterPromoUsers(userList);
    };

    const filterPromoUsers = (userList) => {
        // Filter users who have opted into promotions
        const filteredUsers = userList.filter(user => user.promo === true);
        setPromoUsers(filteredUsers); // Store the filtered users in state
    };
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            //let result = await sendingEmail("internetspam25@gmail.com", "promos", "Here's a promo!");
            await addPromo(promoData);
            alert('Promotion added successfully!');
            setPromoData({ promo_id: "", promo_code: "", promo_amt: "", percentage_bool: false });
            fetchPromotionsData();
           
            const msg = "Here is your promotion for " + promoData.promo_amt + " as a discount with the code: " + promoData.promo_code
            await sendingEmails(promoUsers, msg);
            
            
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Error adding promotion!');
        }
    };

    const sendingEmails = async (promoUsers, msg) => {
        try {
            // Loop through each email address
            for (const email of promoUsers) {
                // Send email for each recipient
                await emailjs.send('service_ld81717', 'template_tkzlco9', { message: msg, to: email }, 'wVVyNS7NMcSjFNt5s');
                console.log("Email sent successfully to", email);
            }
        } catch (error) {
            console.error("Error sending email: ", error);
        }
    }
    const handleSelectPromo = (promoId) => {
        setSelectedPromos(prev => {
            if (prev.includes(promoId)) {
                return prev.filter(id => id !== promoId);
            } else {
                return [...prev, promoId];
            }
        });
    };

    const handleDeleteSelected = async () => {
        for (const promoId of selectedPromos) {
            await deletePromo(promoId);
        }
        fetchPromotionsData(); // Refresh the list after deletion
        setSelectedPromos([]); // Reset selection
        alert('Selected promotions have been ended.');
    };

    const fetchPromotionsData = async () => {
        try {
            const promotionsData = await fetchPromotions();
            setPromotions(promotionsData);
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        fetchPromotionsData();
    }, []);

    return (
        <div className="page-wrapper">
            <div>
                <Link to="/managemovies">
                    <Button className="manage">Manage Movies</Button>
                </Link>
                <Link to="/manageusers">
                    <Button className="manage">Manage Users</Button>
                </Link>
            </div>
            <div>
                <h1>Manage Promotions</h1>
            </div>
            <div>
                <h2>Ongoing Promotions</h2>
                <ul>
                    {promotions.map((promo) => (
                        <li key={promo.id}>
                            <input
                                type="checkbox"
                                checked={selectedPromos.includes(promo.id)}
                                onChange={() => handleSelectPromo(promo.id)}
                            />
                            {`ID: ${promo.promo_id}, Code: ${promo.promo_code}, Discount: ${promo.promo_amt} ${promo.percentage_bool ? '%' : 'USD'}`}
                        </li>
                    ))}
                </ul>
                <Button onClick={handleDeleteSelected}>End Promo</Button>
            </div>

            {/* Inline Promotion Form */}
            <div>
                <h2>Add New Promotion</h2>
                <form onSubmit={handleFormSubmit}>
                    <label>
                        Promotion ID:{' '}
                        <input type="text" name="promo_id" value={promoData.promo_id} onChange={handleChange} required />
                    </label>
                    < br/>
                    <label>
                        Promo Code:{' '}
                        <input type="text" name="promo_code" value={promoData.promo_code} onChange={handleChange} required />
                    </label>
                    < br/>
                    <label>
                        Discount Amount or Percentage:{' '}
                        <input type="number" name="promo_amt" value={promoData.promo_amt} onChange={handleChange} required />
                    </label>
                    < br/>
                    <label>
                        Is Percentage?:{' '}
                        <input type="checkbox" name="percentage_bool" checked={promoData.percentage_bool} onChange={handleChange} />
                    </label>
                    < br/>
                    < br/>
                    <Button type="submit">Add Promo</Button>
                </form>
            </div>
        </div>
    );
}

export default ManagePromotions;
