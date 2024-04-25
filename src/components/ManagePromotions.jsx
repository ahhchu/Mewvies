import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { db } from '../config/firestore';
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";
import "./Header.css";
import "./Button.css";

function ManagePromotions() {
    const [promoData, setPromoData] = useState({
        promo_id: "",
        promo_code: "",
        promo_amt: "",
        percentage_bool: false
    });
    const [promotions, setPromotions] = useState([]);
    const [selectedPromos, setSelectedPromos] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setPromoData({
            ...promoData,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const docRef = await addDoc(collection(db, "promo"), promoData);
            console.log("Document written with ID: ", docRef.id);
            alert('Promotion added successfully!');
            setPromoData({ promo_id: "", promo_code: "", promo_amt: "", percentage_bool: false });
            fetchPromotions();
        } catch (e) {
            console.error("Error adding document: ", e);
            alert('Error adding promotion!');
        }
    };

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
            await deleteDoc(doc(db, "promo", promoId));
        }
        fetchPromotions(); // Refresh the list after deletion
        setSelectedPromos([]); // Reset selection
        alert('Selected promotions have been ended.');
    };

    const fetchPromotions = async () => {
        const querySnapshot = await getDocs(collection(db, "promo"));
        const promotionsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPromotions(promotionsList);
    };

    useEffect(() => {
        fetchPromotions();
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
                        Promotion ID:
                        <input type="text" name="promo_id" value={promoData.promo_id} onChange={handleChange} required />
                    </label>
                    < br/>
                    <label>
                        Promo Code:
                        <input type="text" name="promo_code" value={promoData.promo_code} onChange={handleChange} required />
                    </label>
                    < br/>
                    <label>
                        Discount Amount or Percentage:
                        <input type="number" name="promo_amt" value={promoData.promo_amt} onChange={handleChange} required />
                    </label>
                    < br/>
                    <label>
                        Is Percentage?:
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
