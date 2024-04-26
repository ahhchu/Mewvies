import { db } from '../config/firestore';
import { collection, getDocs, addDoc, doc, deleteDoc } from "firebase/firestore";

export const addPromo = async (promoData) => {
    try {
        const docRef = await addDoc(collection(db, "promo"), promoData);
        console.log("Document written with ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("Error adding document: ", e);
        throw new Error('Error adding promotion!');
    }
};

export const deletePromo = async (promoId) => {
    try {
        await deleteDoc(doc(db, "promo", promoId));
        console.log("Promotion deleted successfully");
    } catch (e) {
        console.error("Error deleting promotion: ", e);
        throw new Error('Error deleting promotion!');
    }
};

export const fetchPromotions = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "promo"));
        return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) {
        console.error("Error fetching promotions: ", e);
        throw new Error('Error fetching promotions!');
    }
};
