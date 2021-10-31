import React,{useEffect,useState} from 'react'
import { Row, Col } from 'react-simple-flex-grid';
import "../App.css";
import "react-simple-flex-grid/lib/main.css";

import UserService from "../services/user.service";
import Publication from './Publication';

const ActivePublication = () => {    
    const [currentPublications, setCurrentPublications]= useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const publi = await UserService.getActivePublications()
            setCurrentPublications(publi.data)                             
        }
        fetchData()
    }, [setCurrentPublications])

    return (
        <Row className='container' gutter={40} >
            {currentPublications.map( publi =>
                <div className="App-header" key = {publi.priceTotalInPesos}>         
                    <Col 
                        xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 3 }}
                        lg={{ span: 2 }} xl={{ span: 1 }}
                    >
                        <Publication
                            publication= {publi}
                        />
                    </Col>
                </div>
            )}
        </Row>
    )
}

export default ActivePublication