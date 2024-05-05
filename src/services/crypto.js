import CryptoJS from "crypto-js";

const passphrase = "webufhibejnlisuediuwe";

// Define encryption function
export const encryptData = (data) => {
  // Validate input parameters
  if (!data || typeof data !== 'object') {
    console.error('Invalid input data. Data must be an object.');
    return null;
  }

  if (!passphrase || typeof passphrase !== 'string') {
    console.error('Invalid passphrase. Passphrase must be a string.');
    return null;
  }
  try {
    // Convert data to JSON string
    const jsonData = JSON.stringify(data);
    // Encrypt JSON string with passphrase
    const encryptedData = CryptoJS.AES.encrypt(jsonData, passphrase).toString();
    console.log("ENCRYPTION SUCCESSFUL");
    return encryptedData;
  } catch (error) {
    console.error('Encryption error:', error);
    return null;
  }
};


// Define decryption function
export const decryptData = (encryptedData) => {
  try { 
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, passphrase);
    const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
    
    // Parse the decrypted string into an object
    const decryptedObject = JSON.parse(decryptedString);

    return decryptedObject;
  } catch (error) {
    //console.error("Decryption error:", error);
    return null; // or handle the decryption error appropriately
  }
};
