import CryptoJS from "crypto-js";



// Define encryption function
export const encryptData = (data, passphrase) => {
  return CryptoJS.AES.encrypt(data, passphrase).toString();
};

// Define decryption function
export const decryptData = (encryptedData, passphrase) => {
 try { 
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, passphrase);
  return decryptedBytes.toString(CryptoJS.enc.Utf8); 
} catch (e) {
  console.log(e);
 }
  return;
};
/*export const decryptData = (encryptedDataArray, passphrase) => {
  try {
    // Decrypt each object in the array
    const decryptedDataArray = encryptedDataArray.map(encryptedData => {
      const decryptedData = {};
      for (const key in encryptedData) {
        // Decrypt each property value
        decryptedData[key] = CryptoJS.AES.decrypt(encryptedData[key], passphrase).toString(CryptoJS.enc.Utf8);
      }
      return decryptedData;
    });
    return decryptedDataArray;
  } catch (e) {
    console.log(e);
    return [];
  }
};*/