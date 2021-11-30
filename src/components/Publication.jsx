import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import localeService from "../services/locale.service";

export const Publication = (publi) => {
    const history = useHistory();
    const publication = publi.publication;
    const [decryptName, setDecryptName] = useState('');
    const [hour, setHour]= useState("")
    const [priceDollar, setPriceDollar] = useState(1);
    const currentUser = AuthService.getCurrentUser();
    const {t} = useTranslation();

    useEffect(() => {
        setDecryptName(UserService.decryptCryptoName(publication.cryptoName))
        if (localStorage.getItem("locale") === "en-US"){
            setPriceDollar(106.41)
        } else {setPriceDollar(1)}
        setHour(publication.date.substr(publication.date.length - 8))
    }, [publication])

    const ClientButtons = () => {
        return(
            <>
                {publication.type === "venta" ?(
                    <button className="btn btn-primary" onClick={buyTransaction}>{t('buy')}</button>
                ) : (
                    <button className="btn btn-warning" onClick={sellTransaction}>{t('sell')}</button>
                )}
            </>       
        )
    }

    const deletePublication = () => {
        UserService.deletePublication(publication).then(
            (response) => {
              history.push("/publications");
              window.location.reload();
            }
          );
    }

    const buyTransaction = () => {
        UserService.transactionCryptoBuy(publication).then(
            (response) => {
              history.push("/transactions");
              window.location.reload();
            }
          );
    }

    const sellTransaction = () => {
        UserService.transactionCryptoSell(publication).then(
            (response) => {
              history.push("/transactions");
              window.location.reload();
            }
          );
    }

    const transform = (price) =>{
        return localeService.currencyLocale(price / priceDollar)
    }

    return (
        <>
        <div className="card text-center">
            <div className="card-header">{publication.type} {decryptName}</div>
            <div className="card-body">
                <h5 className="card-title">{publication.cryptoName}</h5>
                <div className="card-text">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('amountCripto')}
                            <span className="badge bg-secondary rounded-pill">{localeService.numLocale(publication.amountOfCrypto)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('priceCripto')}
                            <span className="badge bg-secondary rounded-pill">{transform(publication.priceOfCrypto)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('totalPrice')}
                            <span className="badge bg-secondary rounded-pill">{transform(publication.priceTotalInPesos)}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('fromU')}
                            <span className="badge bg-secondary rounded-pill">{publication.userName}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('reputation')}
                            <span className="badge bg-secondary rounded-pill">{publication.reputation}</span>
                        </li>
                    </ul>
                </div>
                {currentUser.userName !== publication.userName ? (<ClientButtons/>) : (
                    <button className="btn btn-danger" onClick={deletePublication}>{t('cancel')}</button>
                )}
            </div>
            <div className="card-footer text-muted">{t('lastUpdate')}{hour}</div>
        </div>
        </>
    ); 
};

   

export default Publication;