import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

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
      debugger;
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
  return axios.get(API_URL + "users");
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getUsers
};
