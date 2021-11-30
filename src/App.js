import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import ActiveCripto from "./components/ActiveCripto";
import ActivePublication from "./components/ActivePublication";
import ActiveTransaction from "./components/ActiveTransaction";
import Users from "./components/Users";
import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import LanguageSelector from "./components/LanguageSelector";
import LocaleSelector from "./components/LocaleSelector";

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const { t } = useTranslation()

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    const savedLocale = localStorage.getItem("locale") || "en-US"
    localStorage.setItem("locale",savedLocale );

    if (user) {
      setCurrentUser(user);
    }

    EventBus.on("logout", () => {
      logOut();
    });
    
    return () => {
      EventBus.remove("logout");
    };

  }, [])

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          Krypto
        </Link>
        {currentUser && (
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                {t('home')}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/users"} className="nav-link">
                {t('users')}
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/activeCripto"} className="nav-link">
                {t('activeCripto')}
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/publications"} className="nav-link">
                {t('publications')}
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/transactions"} className="nav-link">
                {t('transactions')}
              </Link>
            </li>
          </div>
        )}
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.userName}
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/login"} className="nav-link" onClick={logOut}>
                {t('logOut')}
              </Link>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/login"} className="nav-link">
                {t('logIn')}
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/register"} className="nav-link">
                {t('signUp')}
              </Link>
            </li>
          </div>
        )}
        <LanguageSelector/>
        <LocaleSelector/>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/activeCripto" component={ActiveCripto} />
          <Route path="/publications" component={ActivePublication} />
          <Route path="/transactions" component={ActiveTransaction} />
          <Route path="/users" component={Users} />
        </Switch>
      </div>

      <AuthVerify logOut={logOut}/>
    </div>
  );
};

export default App;
