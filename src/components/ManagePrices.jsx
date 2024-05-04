import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firestore";
import { Link } from "react-router-dom";
import Button from "./Button";

function ManagePrices() {
    const [prices, setPrices] = useState({});
    const [fees, setFees] = useState({});

    // Fetch ticket prices
    useEffect(() => {
        const fetchTicketPrices = async () => {
            const pricesSnapshot = await getDocs(collection(db, "ticket"));
            if (pricesSnapshot.empty) {
                console.log("No ticket prices found.");
                return;
            }
            const pricesData = {};
            pricesSnapshot.forEach(doc => {
                pricesData[doc.id] = doc.data().price;
            });
            setPrices(pricesData);
        };

        fetchTicketPrices();
    }, []);

    // Fetch fees
    useEffect(() => {
        const fetchFees = async () => {
            const feesSnapshot = await getDocs(collection(db, "fees"));
            const feesData = {};
            feesSnapshot.forEach(doc => {
                feesData[doc.id] = doc.data().price;
            });
            setFees(feesData);
        };

        fetchFees();
    }, []);

    // Handle price changes for tickets
    const handlePriceChange = (type, value) => {
        setPrices(prev => ({ ...prev, [type]: value }));
    };

    // Handle fee changes
    const handleFeeChange = (type, value) => {
        setFees(prevFees => ({
            ...prevFees,
            [type]: value
        }));
    };

    // Update ticket prices in Firestore
    const updatePrice = async (type) => {
        const priceRef = doc(db, "ticket", type);
        await updateDoc(priceRef, {
            price: parseFloat(prices[type])
        });
        alert(`${type} price updated to ${prices[type]}`);
    };

    // Update fees in Firestore
    const updateFee = async (type) => {
        const feeRef = doc(db, "fees", type);
        await updateDoc(feeRef, {
            price: parseFloat(fees[type])
        });
        alert(`${type} fee updated to ${fees[type]}`);
    };

    return (
        <div>
            <div className="header1">
                <Link to="/managemovies">
                    <Button className="manage">Manage Movies</Button>
                </Link>
                <Link to="/managepromotions">
                    <Button className="manage">Manage Promos</Button>
                </Link>
                <Link to="/manageusers">
                    <Button className="manage">Manage Users</Button>
                </Link>
            </div>
            <h1>Manage Prices</h1>
            {Object.entries(prices).map(([type, price]) => (
                <div key={type}>
                    <input
                        type="text"
                        value={price}
                        onChange={(e) => handlePriceChange(type, e.target.value)}
                    />
                    <button onClick={() => updatePrice(type)}>Update {type} Price</button>
                </div>
            ))}
            <div>
                {Object.entries(fees).map(([type, price]) => (
                    <div key={type}>
                        <input
                            type="text"
                            value={price}
                            onChange={(e) => handleFeeChange(type, e.target.value)}
                        />
                        <button onClick={() => updateFee(type)}>Update {type} Fee</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ManagePrices;
