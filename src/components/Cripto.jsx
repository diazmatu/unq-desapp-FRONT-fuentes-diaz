import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import { BuyModal, SellModal } from "./CantityModal";

export const Cripto = ({name, price, date}) => {
  
  const [buyModal, setBuyModal] = useState(false);
  const [sellModal, setSellModal] = useState(false);
  const [decryptName, setDecryptName] = useState('');
  const [hour, setHour]= useState("")

  useEffect(() => {
    setDecryptName(UserService.decryptCryptoName(name))
    setHour(date.substr(date.length - 8))
  }, [setHour])

  return (
    <>
      <div className="card text-center">
        <div className="card-header">{name}</div>
        <div className="card-body">
          <h5 className="card-title">{price}</h5>
          <p className="card-text">
            Cripto Name: {decryptName}
          </p>
          <button className="btn btn-primary" onClick={() => setBuyModal(true)}>Buy</button>{' '}
          <button className="btn btn-warning" onClick={() => setSellModal(true)}>Sell</button>
        </div>
        <div className="card-footer text-muted">Last update: {hour}</div>
      </div>

      <BuyModal
        crypto_name= {name} crypto_price={price}
        onHide={()=> setBuyModal(false)}
        show={buyModal}
        name={decryptName}
      />

      <SellModal
        crypto_name= {name} crypto_price={price}
        onHide={()=> setSellModal(false)}
        show={sellModal}
        name={decryptName}
      />
    </>
  );
};

export default Cripto;
