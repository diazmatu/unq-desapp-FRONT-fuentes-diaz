import axios from "axios";

const API_URL = "http://localhost:8080/auth/";

const register = (userData) => {
  console.log(userData)
  return axios
    .post(API_URL + "register", {
      "direction": "656565656556",
      "wallet": "88888888",
      "cvu": "1212121212121212121212",
      "email": "matu_diaz_95@hotmail.com",
      "name": "Matias Diaz",
      "password": "Matias Diaz",
      "lastName": "Matias Diaz",
      "userName": "Matias Diaz",
      "rols" : ["user"]
    });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "login", {
      "userName" : username,
      "password" : password
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
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
};
