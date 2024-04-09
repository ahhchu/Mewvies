//registerUser, loginUser, modifyUser, addPayment, editPayment, removePayment, getPayment, getForgetEmail, getUserDetails, getAdminStatus, checkActive

import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { db } from "../config/firestore";
import { encryptData } from "../services/crypto";

/* This function checks to see if the email is available in the database
 * 0 = Email available
 * 1 = Email exists
 * -1 = Error
 */
export async function checkEmailAvailability (email) {
    try {
        var snapshot = await getDocs(collection(db, "user"));
        var existingUser = snapshot.docs.find(
            (doc) => doc.data().email === email
        );
        if (existingUser) {
            return 1;
        } // if
        return 0;
    } catch (error) {
        console.error("Error checking email availability:", error);
        return -1;
    }
} // checkEmailAvailability

/* This function validates the email input
 * true = email is an email
 * false = email is not an email
 */
export function validateEmail (email) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return validRegex.test(email);
} // validateEmail

export async function registerUser(fname, lname, email, password, phone, promo, homeAddressOne, homeAddressTwo, homeCity, homeState, homeZip) {
    var auth = getAuth();
    var userCred = await createUserWithEmailAndPassword(auth, email, password);

    await sendEmailVerification(userCred.user);
    console.log("Email verification sent.");

    var newUser = {
        uid: userCred.user.uid,
        fname: fname,
        lname: lname,
        email: email,
        phone: phone,
        promo: promo,

        home_address_one: homeAddressOne,
        home_address_two: homeAddressTwo,
        home_city: homeCity,
        home_state: homeState,
        home_zip: homeZip,

        role: "user",
        status: "inactive",
    };
    var userRef = doc(db, "user", userCred.user.uid);
    await setDoc(userRef, newUser);
    return newUser.uid;
}