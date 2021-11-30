import axios from "axios";

const API_URL = "http://localhost:8080/";

const getToken = () =>{
  if (localStorage.getItem("user")){
    return JSON.parse(localStorage.getItem("user")).token
  }
}

const headers= {
  headers:{
    Authorization: 'Bearer '+ getToken()
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
  var user = {userName:""}
  if (localStorage.getItem("user")){
    var userName = JSON.parse(localStorage.getItem("user")).userName
    user = axios.get(API_URL + "auth/users/" + userName, headers);
    //debugger
  }
  return user
};

const getUser = (userName) =>{
  //debugger
  return axios.get(API_URL + "auth/users/" + userName, headers);
}

const authService = {
  register,
  login,
  logout,
  getCurrentUser,
  getUsers,
  getUser,
  getToken
};

export default authService