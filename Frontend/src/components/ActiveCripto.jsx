import React,{useEffect,useState} from 'react'
import {Cripto} from './Cripto'

import UserService from "../services/user.service";

const ActiveCripto = () => {    
    const [currentCriptos, setCurrentCriptos]= useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const cripto = await UserService.getActiveCriptos()
            console.log(cripto)
            setCurrentCriptos(cripto.data)                             
        }
        fetchData()
    }, [setCurrentCriptos])

    return (
        <div className='criptos-container'>
            {currentCriptos.map( cripto =>
                <div className="App-header" key = {cripto.symbol}>
                    <Cripto
                        name={cripto.symbol}
                        price={cripto.price}
                        date={cripto.lastUpdate}
                    />
                </div>
            )}    
        </div>
    )
}

export default ActiveCripto