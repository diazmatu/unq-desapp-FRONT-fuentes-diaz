import React, { useState, useEffect, useRef } from "react";
import UserService from "../services/user.service";
import Modal from 'react-bootstrap/Modal';
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const BuyModal = (props) => {
  const form = useRef();
  const {t} = useTranslation();
  const history = useHistory();
  const [buyValue, setBuyValue] = useState(0);
  const [hidden, setHidden] = useState(true)

  useEffect(() => {
    setBuyValue(0);
  }, []);

  const publicateBuy = () =>{    
    if(buyValue>0){
      props.onHide()
      const finalPrice = buyValue * props.crypto_price
      UserService.publicateCryptoBuy(props.crypto_name, buyValue, finalPrice).then(
        (response) => {
          history.push("/publications");
          window.location.reload();
        }
      );
      setBuyValue(0)
    }else{setHidden(false)}
  }

  const onChangeValue = (e) => {
    const cant = e.target.value;
    setBuyValue(cant);
  };

  return (
    <>
      <Modal
          {...props}
          size="sm"
          centered
          aria-labelledby="example-modal-sizes-title-sm"
      >
          <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
              {t('buySpace')} {props.name}
              </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <label htmlFor="basic-url" className="form-label">{t('howMuchBuy')}</label>
              <div className="input-group mb-3" >
              <span className="input-group-text">$</span>
              <input ref={form}
                  type="text"
                  className="form-control"
                  aria-label="Amount (to the nearest dollar)"
                  name="sellValue"
                  value={buyValue}
                  onChange={onChangeValue}/>
              </div>
              <div className="alert alert-danger" role="alert" hidden={hidden}>
                {t('positive')}
              </div>
          </Modal.Body>
          <Modal.Footer>
              <button href="#" className="btn btn-success" onClick={publicateBuy}>{t('confirm')}</button>
          </Modal.Footer>
      </Modal>
    </>
  );
};

export const SellModal = (props) => {
  const {t} = useTranslation();
  const history = useHistory();
  const [sellValue, setSellValue] = useState(0);
  const [hidden, setHidden] = useState(true)

  const publicateSell = () =>{
    if(sellValue>0){
      props.onHide()
      const finalPrice = sellValue * props.crypto_price
      UserService.publicateCryptoSell(props.crypto_name, sellValue, finalPrice).then(
        (response) => {
          history.push("/publications");
          window.location.reload();
        }
      );
      setSellValue(0)
    }else{setHidden(false)}
  }

  const onChangeValue = (e) => {
    const value = e.target.value;
    setSellValue(value);
  };

  return (
    <Modal
      {...props}
      size="sm"
      centered
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {t('sellSpace')}{props.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <label htmlFor="basic-url" className="form-label">{t('howMuchSell')}</label>
        <div className="input-group mb-3">
          <span className="input-group-text">$</span>
          <input
            type="text"
            className="form-control"
            aria-label="Amount (to the nearest dollar)"
            name="sellValue"
            value={sellValue}
            onChange={onChangeValue} />
        </div>
        <div className="alert alert-danger" role="alert" hidden={hidden}>
          {t('positive')}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-success" onClick={publicateSell}>{t('confirm')}</button>
      </Modal.Footer>
    </Modal>
  );
};

const modals = {BuyModal, SellModal}

export default modals