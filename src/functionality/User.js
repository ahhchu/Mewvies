//registerUser, loginUser, modifyUser, addPayment, editPayment, removePayment, getPayment, getForgetEmail, getUserDetails, getAdminStatus, checkActive

import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";
import { db } from "../config/firestore";
import { encryptData } from "../services/crypto";

/* BEGINNING OF REGISTRATION */

/* This function checks to see if the email is available in the database
 * 0 = Email available
 * 1 = Email exists
 * -1 = Error fetching
 */
export async function checkEmailAvailability (email) {
    getPaymentCards("H9dYbuH4jpNBaLFBqYYwVvM9y9L2");
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
        return -1;
    } // try
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

    // send verification email
    await sendEmailVerification(userCred.user);

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
} // registerUser

/* END OF REGISTRATION */


/* BEGINNING OF MODIFY USER */

/* Resets the password of a given email
 */
export async function resetPassword(email) {
    var auth = getAuth();
    sendPasswordResetEmail(auth, email);
} // resetPassword

/* END OF MODIFY USER */

/* BEGINNING OF PAYMENT FUNCTIONS */

// For encryption
const passphrase = "webufhibejnlisuediuwe";

/*returns an array of payment cards
 */
export async function getPaymentCards (uid) {
    try {
        var snapshot = await getDocs(collection(db, "payment_info"));
        var existingPayments = [];
        snapshot.docs.forEach((element) => {
            if (element.data().uid == uid) {
                existingPayments.push(element.data());
            } // if
        });
        return existingPayments;
    } catch (error) {
        return -1;
    } // try
} // getPaymentCards

/* Adds payment methods
 */
export async function addPayment(cardName, cardNumber, expirationDate, billingAddressOne, billingAddressTwo, city, state, zipCode, uid) {
    var newCard = {};
    try {
        newCard = {
            card_name: encryptData(cardName, passphrase),
            card_number: encryptData(cardNumber,passphrase),
            expiration: encryptData(expirationDate, passphrase),
            billing_address_one: encryptData(billingAddressOne, passphrase),
            billing_address_two: encryptData(billingAddressTwo, passphrase),
            billing_city: encryptData(city, passphrase),
            billing_state: encryptData(state, passphrase),
            billing_zip: encryptData(zipCode, passphrase),
            uid: uid
        };
    } catch (error) {
        console.error("Error encrypting data:", error);
      }

      const cardRef = doc(db, "payment_info", uid + Date.now());
      await setDoc(cardRef, newCard);
      return true;
} // addPayment

/* END OF PAYMENT FUNCTIONS */


/* BEGINNING OF LOGIN */

/* END OF LOGIN */