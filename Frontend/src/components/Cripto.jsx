import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EventBus from "../common/EventBus";

export const Cripto = ({name, price, date}) => {

  const [hour, setHour]= useState("")

  useEffect(() => {
      setHour(date.substr(date.length - 8))
  }, [setHour])

  return (
    <div class="card text-center">
      <div class="card-header">{name}</div>
      <div class="card-body">
        <h5 class="card-title">{price}</h5>
        <p class="card-text">
          Cripto Name: {name}
        </p>
        <button href="#" className="btn btn-primary" disabled="true">Buy</button>
      </div>
      <div class="card-footer text-muted">Last update: {hour}</div>
    </div>
  );
};

export default Cripto;
