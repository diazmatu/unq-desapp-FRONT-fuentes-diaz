import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {useHistory} from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const Transaction = (trans) => {
    const history = useHistory();
    const transaction = trans.transaction;
    const [decryptName, setDecryptName] = useState('');
    const [hour, setHour] = useState("")
    const [publisher, setPublisher] = useState('')
    const currentUser = AuthService.getCurrentUser();
    const {t} = useTranslation();

    useEffect(() => {
        console.log(transaction)
        setDecryptName(UserService.decryptCryptoName(transaction.cryptoName))
        setHour(transaction.date.substr(transaction.date.length - 8))
        setPublisher(AuthService.getUser(transaction.userNamePublisher))
        //debugger
    }, [transaction, publisher])

    const ClientButtons = () => {
        return(
            <>
                {transaction.userName === currentUser.userName ?(
                    <button className="btn btn-primary" onClick={confirmReception} hidden={transaction.confirm}>{t('reception')}</button>
                ) : (
                    <button className="btn btn-warning" onClick={confirmTransaction} hidden={transaction.transfer}>{t('transaction')}</button>
                )}
                <button className="btn btn-danger" onClick={cancelTransaction} hidden={transaction.close}>{t('cancel')}</button>
            </>       
        )
    }

    const cancelTransaction = () => {
        UserService.cancelTransaction(transaction).then(
            (response) => {
              history.push("/transactions");
              window.location.reload();
            }
          );
    }

    const confirmReception = () => {
        UserService.confirmReception(transaction).then(
            (response) => {
              history.push("/transactions");
              window.location.reload();
            }
          );
    }

    const confirmTransaction = () => {
        UserService.confirmTransaction(transaction).then(
            (response) => {
              history.push("/transactions");
              window.location.reload();
            }
          );
    }

    return (
        <>
        <div className="card text-center">
            <div className="card-header">{transaction.type} {decryptName}</div>
            <div className="card-body">
                <h5 className="card-title">{transaction.cryptoName}</h5>
                <div className="card-text">
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('amountCripto')}
                            <span className="badge bg-secondary rounded-pill">{transaction.amountOfCryptoToBuy}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('priceCripto')}
                            <span className="badge bg-secondary rounded-pill">{transaction.amountOfCrypto}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('totalPrice')}
                            <span className="badge bg-secondary rounded-pill">{transaction.priceTotalInPesos}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('fromU')}
                            <span className="badge bg-secondary rounded-pill">{transaction.userNamePublisher}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {t('reputation')}
                            <span className="badge bg-secondary rounded-pill">{transaction.publication.reputation}</span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between align-items-start">
                            {transaction.type === "venta" ?(
                                <>{t('cvuMP')}{': CVU-'}{publisher}</>
                            ) : (
                                <>{t('criptoWallet')}{': CriptoWallet-'}{transaction.criptoWallet}</>
                            )}
                        </li>
                    </ul>
                </div>
                <ClientButtons/>
            </div>
            <div className="card-footer text-muted">{t('lastUpdate')}{hour}</div>
        </div>
        </>
    ); 
};

export default Transaction;