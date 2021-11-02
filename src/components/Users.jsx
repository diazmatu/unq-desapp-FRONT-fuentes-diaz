import React,{useEffect,useState,useCallback} from 'react'
import {User} from './User.jsx'
import { Row, Col } from 'react-simple-flex-grid';
import "../App.css";
//import "react-simple-flex-grid/lib/main.css";

import AuthService from "../services/auth.service";

const Users = () => {    
    const [activeUsers, setActiveUsers]= useState([])
    const currentUser = AuthService.getCurrentUser();
    
    const deleteSelf = useCallback((users) => {
        setActiveUsers(
            users.filter(function(user){
                return user.userName !== currentUser.userName
            }))
      }, [currentUser.userName]) 
 

    useEffect(() => {
        const fetchData = async () => {
            await AuthService.getUsers()
            .then((response) => {
                deleteSelf(response.data) 
            })                        
        }
        fetchData()
    }, [deleteSelf, setActiveUsers])

    return (
        <Row className='container' gutter={40} justify-content= {'flex-start'}>
            {activeUsers.map( user =>
                <div className="App-header" key = {user.id}>        
                    <Col 
                        xs={{ span: 6 }} sm={{ span: 4 }} md={{ span: 3 }}
                        lg={{ span: 2 }} xl={{ span: 1 }}
                    >
                        <User
                            name={user.name}
                            lastName={user.lastName}
                            reputation={user.wallet}
                            operations={user.cvu}
                        />
                    </Col>
                </div>
            )}    
        </Row>
    )
}

export default Users