import axios from "axios";

const API_URL = 'http://localhost:8080/auth/';

const register = (userData) => {
  return axios.post(API_URL + 'register', {
    name: userData.name,
    lastName: userData.surName,
    userName: userData.userName,
    email: userData.email,
    password: userData.password,
    direction: userData.address,
    cvu: userData.cvuMP,
    wallet: userData.criptoWallet,
    rols: ["user"]
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
