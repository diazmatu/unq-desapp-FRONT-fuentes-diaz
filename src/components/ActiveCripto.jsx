import React,{useEffect,useState} from 'react'
import {Cripto} from './Cripto'
import { Row, Col } from 'react-simple-flex-grid';
import "../App.css";
import "react-simple-flex-grid/lib/main.css";

import UserService from "../services/user.service";

const ActiveCripto = () => {    
    const [currentCriptos, setCurrentCriptos]= useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const cripto = await UserService.getActiveCriptos()
            setCurrentCriptos(cripto.data)                             
        }
        fetchData()
    }, [setCurrentCriptos])

    return (
        <Row className='container' gutter={40} >
            {currentCriptos.map( cripto =>
                <div className="App-header" key = {cripto.symbol}>         
                    <Col 
                        xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 3 }}
                        lg={{ span: 2 }} xl={{ span: 1 }}
                    >
                        <Cripto
                            name={cripto.symbol}
                            price={cripto.price}
                            date={cripto.lastUpdate}
                        />
                    </Col>
                </div>
            )}
        </Row>
    )
}

export default ActiveCripto