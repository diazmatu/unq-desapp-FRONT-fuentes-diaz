import axios from "axios";

const API_URL = "http://localhost:8080/";

const token = JSON.parse(localStorage.getItem("user")).token

const headers= {
  headers:{
    Authorization: 'Bearer '+ token
  }
}

const register = (userData) => {
  return axios
    .post(API_URL + "register", {
      "direction": userData.address,
      "wallet": userData.criptoWallet,
      "cvu": userData.cvuMP,
      "email": userData.email,
      "name": userData.name,
      "password": userData.password,
      "lastName": userData.surname,
      "userName": userData.userName,
      "rols" : ["user"]
    })
    .then((response) => {
      //debugger;
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      "userName" : username,
      "password" : password
    })
    .then((response) => {
      //debugger;
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const getUsers = () => {
  return axios.get(API_URL + "auth/users", headers);
};

const logout = () => {
  localStorage.removeItem("user", headers);
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const getUser = (userName) =>{
  return userName//axios.get(API_URL + "auth/users/" + userName, headers);
}

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUsers,
  getUser
};

export default authService