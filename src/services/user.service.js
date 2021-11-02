import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const user = JSON.parse(localStorage.getItem("user"))
const Token = () => {
  const getToken = () =>{
    if (localStorage.getItem("user")){
    return JSON.parse(localStorage.getItem("user")).token
  }}

  return true
}

const token = user.token

const headers= {
  headers:{
    Authorization: 'Bearer '+ token
  }
}

const getActiveCriptos = () => {
  return axios.get(API_URL + "api/crypts", headers);
};

const getActivePublications = () => {
  //debugger
  return axios.get(API_URL + "publication/all", headers);
};

const getActiveTransactions = () => {
  return axios.get(API_URL + "transaction/"+ user.userName +"/all", headers);
};

const decryptCryptoName = (name) => {
  return name
}

const publicateCryptoBuy = (cryptoName, buyValue, finalPrice) => {
  return axios
    .post(API_URL + "publication/addP", {
      "userName": user.userName,
      "cryptoName" : cryptoName,
      "amountOfCrypto" : buyValue,
      "priceTotalInPesos" : finalPrice,
      "type": "compra"
    }, headers);
}

const publicateCryptoSell = (cryptoName, sellValue, finalPrice) => {
  return axios
    .post(API_URL + "publication/addP", {
      "userName": user.userName,
      "cryptoName" : cryptoName,
      "amountOfCrypto" : sellValue,
      "priceTotalInPesos" : finalPrice,
      "type": "venta"
    }, headers);
}

const deletePublication = (publi) => {
  return axios.post(API_URL + "publication/" + user.userName + "/cancelPublication/"+ publi.id, {}, headers);
}

const transactionCryptoBuy = (publi) => {
  const trans = {
    "userNamePublisher" : publi.userName,//Publisher
    "userNameClient" : user.userName,//Client
    "cryptoName" : publi.cryptoName,
    "amountOfCrypto" : publi.amountOfCrypto,
    "priceTotalInPesos" : publi.priceTotalInPesos,
    "type" : "compra"
}
debugger
  return axios
    .post(API_URL + "transaction/addT/"+ publi.id, trans, headers);
};

const transactionCryptoSell = (publi) => {
  debugger
  return axios
    .post(API_URL + "transaction/addT/"+ publi.id, {
      "userNamePublisher" : publi.userName,//Publisher
      "userNameClient" : user.userName,//Client
      "cryptoName" : publi.cryptoName,
      "amountOfCrypto" : publi.amountOfCrypto,
      "priceTotalInPesos" : publi.priceTotalInPesos,
      "type" : "venta"
  }, headers);
};

const cancelTransaction = (publi) => {
  return axios.post(API_URL + "transaction/" + user.userName + "/cancelTransaction/"+ publi.id, {}, headers);
}

const confirmTransaction = (publi) => {
  return axios.post(API_URL + "transaction/" + user.userName + "/confirmTransaction/"+ publi.id, {}, headers);
}

const confirmReception = (publi) => {
  return axios.post(API_URL + "transaction/" + user.userName + "/confirmReception/"+ publi.id, {}, headers);
}

const userService = {
  getActiveCriptos,
  decryptCryptoName,
  publicateCryptoSell,
  publicateCryptoBuy,
  deletePublication,
  getActivePublications,
  getActiveTransactions,
  cancelTransaction,
  confirmTransaction,
  confirmReception,
  transactionCryptoBuy,
  transactionCryptoSell
};

export default userService
