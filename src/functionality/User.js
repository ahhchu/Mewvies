//registerUser, loginUser, modifyUser, addPayment, editPayment, removePayment, getPayment, getForgetEmail, getUserDetails, getAdminStatus, checkActive

import { collection, getDocs, doc, setDoc, updateDoc, getDoc, deleteDoc } from "firebase/firestore";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    updatePassword,
    EmailAuthProvider,
    reauthenticateWithCredential,
} from "firebase/auth";
import { db } from "../config/firestore";
import { decryptData, encryptData } from "../services/crypto";



/* BEGINNING OF REGISTRATION */

/* This function checks to see if the email is available in the database
 * 0 = Email available
 * 1 = Email exists
 * -1 = Error fetching
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

/* Returns an object with user data
 */
export async function fetchUserData(currentUser) {
    if (currentUser) {
        var userRef = doc(db, "user", currentUser.uid);
        var userSnap = await getDoc(userRef);
        //console.log(userSnap.data());
        return userSnap.data();
    }
}

/* Fetch ALL users
*/
export async function fetchAllUsers() {
    const usersCollection = collection(db, "user"); 
    const userData = await getDocs(usersCollection); 
    const userList = userData.docs.map(doc => ({ id: doc.id, ...doc.data() })); 
    return userList; 
}

export async function addUser(userData) {
    const userRef = doc(collection(db, "user"));
    await setDoc(userRef, userData);
    return userRef.id;  // Returns the new user's ID after adding them to the database
}

export async function deleteUser(userId) {
    await deleteDoc(doc(db, "user", userId));
}

/* Resets the password of a given email
 */
export async function resetPassword(email) {
    var auth = getAuth();
    sendPasswordResetEmail(auth, email);
} // resetPassword

/* returns 0 if worked, returns 1 if failed
*/
export async function changePassword(currentUser, currPass, newPass) {
    try {
        var credential = EmailAuthProvider.credential(
            currentUser.email,
            currPass
          );
        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPass);
        console.log("Password updated successfully");
        return 0;
    } catch (e) {
        console.log(e);
    }
    return 1;
}

export async function updateUser(currentUser, user, cards) {
    try {
      removePaymentMethods(currentUser.uid).then(() => {
        console.log("updating cards");
        var increment = 0;
        cards.forEach(card => {
            increment++;
            addMultiplePayments(card.card_name, card.card_number, card.card_type, card.expiration, card.billing_address_one, card.billing_address_two, card.billing_city, card.billing_state, card.billing_zip, currentUser.uid, increment);
            console.log("printing updating cards");
            console.log(card);
            console.log("done");
        });
      });

      var userRef = doc(db, "user", currentUser.uid);
      await updateDoc(userRef, user);
      console.log("Profile updated successfully");
    } catch (e) {
        console.log(e);
    }
}

export async function updateUserNoCard(uid, user) {
    try {
      var userRef = doc(db, "user", uid);
      await updateDoc(userRef, user);
      console.log("Profile updated successfully");
    } catch (e) {
        console.log(e);
    }
}

async function removePaymentMethods(uid) {
    const snapshot = await getDocs(collection(db, "payment_info"));

    if (snapshot.empty) {
        return;
    }

    const deletionPromises = [];
    
    snapshot.forEach((doc) => {
        if (doc.data().uid === uid) {
            const deletionPromise = deleteDoc(doc.ref);
            deletionPromises.push(deletionPromise);
            console.log("deleted");
        }
    });

    await Promise.all(deletionPromises);
}

/* END OF MODIFY USER */

/* BEGINNING OF PAYMENT FUNCTIONS */

// For encryption


/* returns an array of payment cards
 */
export async function getPaymentCards(uid) {
    try {
        var snapshot = await getDocs(collection(db, "payment_info"));
        var existingPayments = [];

        snapshot.docs.forEach((doc) => {
            if (doc.data().uid == uid) {
                const decryptedData = decryptDocument(doc.data());
                existingPayments.push(decryptedData);
            }
        });
        return existingPayments;
    } catch (error) {
        console.error("Error fetching payment cards:", error);
        return [];
    }
}

// Function to decrypt a document's fields
const decryptDocument = (encryptedDoc) => {
    const decryptedDoc = {};

    for (const field in encryptedDoc) {
        // Decrypt each field and add it to the decrypted document object
        decryptedDoc[field] = decryptData(encryptedDoc[field]);
    }

    return decryptedDoc;
};


export async function addMultiplePayments(cardName, cardNumber, cardType, expiration, billingAddressOne, billingAddressTwo, billingCity, billingState, billingZip, uid, num) {
    var newCard = {};
    try {
        // Create a single object containing all properties
        const cardDataToEncrypt = {
            card_name: cardName,
            card_number: cardNumber,
            card_type: cardType,
            expiration: expiration,
            billing_address_one: billingAddressOne,
            billing_address_two: billingAddressTwo,
            billing_city: billingCity,
            billing_state: billingState,
            billing_zip: billingZip
        };

        const encryptedCardData = encryptData(cardDataToEncrypt);

        // Encrypt the entire card data object
        newCard = {
            encrypted_card_data: encryptedCardData,
            uid: uid
        };
    } catch (error) {
        console.error("Error encrypting data:", error);
    }

    console.log("newCard: ", newCard);
    // Pass the entire object to the decryptData function
    console.log("newCard Decry: ", decryptData(newCard));
    const cardRef = doc(db, "payment_info", num + uid + Date.now());
    await setDoc(cardRef, newCard);
    return true;
} //addMultiplePayments


/* END OF PAYMENT FUNCTIONS */


/* BEGINNING OF LOGIN */

/* Tries to login, return a user object
 * user.error = int, if 0, no error
 * user.verified = if the user is verified
 * user.role = admin or user
 * user.uid = uid
 */
export async function login(email, password, userContext) {
    
    var user = {error: 0, verified: true};
    try {
        var auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
        if (auth.currentUser.emailVerified) {

            // If email is verified, set to active and keep logging in
            user.error = 0;
            user.verified = true;
            var userRef = doc(db, "user", auth.currentUser.uid);
            await updateDoc(userRef, {
                status: "Active",
            });

            var userRef = doc(db, "user", auth.currentUser.uid);
            var userDoc = await getDoc(userRef);
            user.role = userDoc.data().role;
            await updateDoc(userRef, {
                lastLogin: new Date(), 
            });

            user.uid = auth.currentUser.uid;
        } else {

            // Send verification if not verified
            user.error = 1;
            user.verified = false;
            await sendEmailVerification(auth.currentUser); // resend email option
        } // if
    } catch (error) {
        user.error = 1;
        console.log(error);
    } // try

    return user;

} // login

export function isLoggedIn () {
    var auth = getAuth();
    if (auth.currentUser) {
        return true;
    } else {
        return false;
    } // if
} // isLoggedIn

export async function logout() {
    var auth = getAuth();
    auth.signOut()
    .then(() => {
      // Logout successful
      console.log("Logout successful");
      // Perform any additional actions after logout, such as clearing local storage
      localStorage.clear();
    })
    .catch((error) => {
      // An error occurred during logout
      console.error("Error during logout:", error.message);
    });
}// logout

/* END OF LOGIN */