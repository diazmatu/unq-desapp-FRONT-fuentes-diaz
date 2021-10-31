import React, { useState, useEffect } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";
import {useHistory} from "react-router-dom";

export const Publication = (publi) => {
    const history = useHistory();
    const [publication, setPublication] = useState(publi.publication);
    const [decryptName, setDecryptName] = useState('');
    const [hour, setHour]= useState("")
    const currentUser = AuthService.getCurrentUser();

    useEffect(() => {
        console.log(publication)
        setDecryptName(UserService.decryptCryptoName(publication.cryptoName))
        setHour(publication.date.substr(publication.date.length - 8))
    }, [setHour])


    const ClientButtons = () => {

        return(
            <>{publication.type == "venta" ?
                (<button className="btn btn-primary" onClick={buyTransaction()}>Buy</button>) :
                (<button className="btn btn-warning" onClick={sellTransaction()}>Sell</button>)
            }</>       
        )
    }

    const deletePublication = () => {

    }

    const buyTransaction = () => {
        UserService.transactionCryptoBuy(publication, currentUser.userName).then(
            (response) => {
              history.push("/activeTransactions");
              window.location.reload();
            }
          );
    }

    const sellTransaction = () => {
        UserService.transactionCryptoSell(publication, currentUser.userName).then(
            (response) => {
              history.push("/activeTransactions");
              window.location.reload();
            }
          );
    }

    return (
        <>
        <div className="card text-center">
            <div className="card-header">{publication.type} {decryptName}</div>
            <div className="card-body">
            <h5 className="card-title">{publication.cryptoName}</h5>
            <p className="card-text">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        Amount of crypto:
                        <span class="badge bg-secondary rounded-pill">{publication.amountOfCrypto}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        Price of crypto:
                        <span class="badge bg-secondary rounded-pill">{publication.priceOfCrypto}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        Total price:
                        <span class="badge bg-secondary rounded-pill">{publication.priceTotalInPesos}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        From user:
                        <span class="badge bg-secondary rounded-pill">{publication.type}</span>
                    </li>
                    <li class="list-group-item d-flex justify-content-between align-items-start">
                        Reputation:
                        <span class="badge bg-secondary rounded-pill">{publication.reputation}</span>
                    </li>
                </ul>
            </p>
            {currentUser != publication.type ? (<ClientButtons type= {publication.type}/>) : (
                <button className="btn btn-danger" onClick={deletePublication()}>Cancel</button>
            )}
            </div>
            <div className="card-footer text-muted">Last update: {hour}</div>
        </div>

        </>
    ); 
  
};

   

export default Publication;