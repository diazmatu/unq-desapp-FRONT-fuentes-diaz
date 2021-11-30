import axios from "axios";
import AuthService from "../services/auth.service";

const API_URL = "http://localhost:8080/auth/";
//const user = AuthService.getUser()
const token = AuthService.getToken()

const headers= {
  headers:{
    Authorization: 'Bearer '+ token
  }
}

const getUserName = () => {
  var name =  ""
  if (localStorage.getItem("user")){
    name = JSON.parse(localStorage.getItem("user")).userName
  }
  return name
};
const userName = getUserName()

const getDollarActual = () => {
  //debugger
  return axios.get(API_URL + "api/dollar", headers)
}

const getActiveCriptos = () => {
  return axios.get(API_URL + "api/crypts", headers);
};

const getActivePublications = () => {
  //debugger
  return axios.get(API_URL + "publication/all", headers);
};

const getActiveTransactions = () => {
  //debugger
  return axios.get(API_URL + "transaction/"+ userName +"/all", headers);
};

const decryptCryptoName = (name) => {
  return name
}

const publicateCryptoBuy = (cryptoName, buyValue, finalPrice) => {
      debugger
  return axios
    .post(API_URL + "publication/addP", {
      "userName": userName,
      "cryptoName" : cryptoName,
      "amountOfCrypto" : buyValue,
      "priceTotalInPesos" : finalPrice,
      "type": "compra"
    }, headers);
}

const publicateCryptoSell = (cryptoName, sellValue, finalPrice) => {
  return axios
    .post(API_URL + "publication/addP", {
      "userName": userName,
      "cryptoName" : cryptoName,
      "amountOfCrypto" : sellValue,
      "priceTotalInPesos" : finalPrice,
      "type": "venta"
    }, headers);
}

const deletePublication = (publi) => {
  return axios.post(API_URL + "publication/" + userName + "/cancelPublication/"+ publi.id, {}, headers);
}

const transactionCryptoBuy = (publi) => {
  const trans = {
    "userNamePublisher" : publi.userName,//Publisher
    "userNameClient" : userName,//Client
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
  const trans = {
    "user_name_publisher" : publi.userName,//Publisher
    "userNameClient" : userName,//Client
    "cryptoName" : publi.cryptoName,
    "amountOfCrypto" : publi.amountOfCrypto,
    "priceTotalInPesos" : publi.priceTotalInPesos,
    "type" : "venta"
}
  //debugger
  return axios
    .post(API_URL + "transaction/addT/"+ publi.id, trans, headers);
};

const cancelTransaction = (publi) => {
  return axios.post(API_URL + "transaction/" + userName + "/cancelTransaction/"+ publi.id, {}, headers);
}

const confirmTransaction = (publi) => {
  return axios.post(API_URL + "transaction/" + userName + "/confirmTransaction/"+ publi.id, {}, headers);
}

const confirmReception = (publi) => {
  return axios.post(API_URL + "transaction/" + userName + "/confirmReception/"+ publi.id, {}, headers);
}

const getUsers = () => {
  return axios.get(API_URL + "auth/users", headers);
};

const logout = () => {
  localStorage.removeItem("user", headers);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const userService = {
  logout,
  getCurrentUser,
  getUsers,
  getDollarActual,
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
