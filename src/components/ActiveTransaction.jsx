import React,{useEffect, useState} from 'react'
import { Row, Col } from 'react-simple-flex-grid';
import Transaction from './Transaction';
import "../App.css";
import "react-simple-flex-grid/lib/main.css";

import UserService from "../services/user.service";

const ActiveTransaction = () => {    
    const [currentTransaction, setCurrentTransaction]= useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            //debugger 
            const trans = await UserService.getActiveTransactions()
            setCurrentTransaction(trans.data)                            
        }
        fetchData()
    }, [setCurrentTransaction])

    return (
        <Row className='container' gutter={40} >
            {currentTransaction.map( trans =>
                <div className="App-header" key = {trans.priceTotalInPesos}>         
                    <Col 
                        xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 3 }}
                        lg={{ span: 2 }} xl={{ span: 1 }}
                    >
                        <Transaction
                            transaction= {trans}
                        />
                    </Col>
                </div>
            )}
        </Row>
    )
}

export default ActiveTransaction