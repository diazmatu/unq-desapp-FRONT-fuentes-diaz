import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/auth/";

const user = JSON.parse(localStorage.getItem("user"))

const getActiveCriptos = () => {
  return axios.get(API_URL + "api/crypts");
};

const getActivePublications = () => {
  return axios.get(API_URL + "transaction/publications");
};

const decryptCryptoName = (name) => {
  return name
}

const publicateCryptoBuy = (cryptoName, buyValue, finalPrice) => {
  return axios
    .post(API_URL + "transaction/addP", {
      "userName": user.userName,
      "cryptoName" : cryptoName,
      "amountOfCrypto" : buyValue,
      "priceTotalInPesos" : finalPrice,
      "type": "compra"
    });
}

const publicateCryptoSell = (cryptoName, sellValue, finalPrice) => {
  return axios
    .post(API_URL + "transaction/addP", {
      "userName": user.userName,
      "cryptoName" : cryptoName,
      "amountOfCrypto" : sellValue,
      "priceTotalInPesos" : finalPrice,
      "type": "venta"
    });
}

const transactionCryptoBuy = (publi, buyerId) => {
  return axios
    .post(API_URL + "/transaction/addT/"+ publi.id, {
      "userNameSeller" : "jeremiasfue1",
      "userNameBuyer" : "jeremiasfue2",
      "cryptoName" : "ALICEUSDT",
      "amountOfCrypto" : 33.2,
      "priceTotalInPesos" : 500.5,
      "type" : "compra"
  
  });
};

const transactionCryptoSell = (publi, sellerId) => {
  return axios
    .post(API_URL + "/transaction/addT/"+ publi.id, {
      "userNameSeller" : "jeremiasfue1",
      "userNameBuyer" : "jeremiasfue2",
      "cryptoName" : "ALICEUSDT",
      "amountOfCrypto" : 33.2,
      "priceTotalInPesos" : 500.5,
      "type" : "compra"
  
  });
};

export default {
  getActiveCriptos,
  decryptCryptoName,
  publicateCryptoSell,
  publicateCryptoBuy,
  getActivePublications,
  transactionCryptoBuy,
  transactionCryptoSell
};
