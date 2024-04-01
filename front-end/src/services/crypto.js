import CryptoJS from "crypto-js";



// Define encryption function
export const encryptData = (data, passphrase) => {
  return CryptoJS.AES.encrypt(data, passphrase).toString();
};

// Define decryption function
export const decryptData = (encryptedData, passphrase) => {
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedData, passphrase);
  return decryptedBytes.toString(CryptoJS.enc.Utf8);
};