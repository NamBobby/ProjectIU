import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import { useAppSelector } from '../../../../app/hooks';
import { selectLoginHistory } from '../loginHistorySlice';

export const ViewAllLoginHistory :React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const listLogin = useAppSelector(selectLoginHistory);
    return (
        <Row xs = "1" lg = "1" sm = "1" md = "1" xl ="1" xxl = "1" className = "display-flex full-view animate__animated animate__fadeIn admin-bg">
            <Col className="margin-layout">
                <Row md = "1" className='center-text'>
                    <div>
                        <h3 className ="text-center manager-text mt-4">LOGIN HISTORY</h3>
                    </div>
                </Row>
                <Row className="justify-content-center admin-view">
                    <Col xs="11" className= "admin-data-view">
                        <div className="d-flex justify-content-center align-items-center input-group-form mb-2">
                            <input 
                                className = 'search-input' 
                                type="text"
                                onChange ={event => {setSearchTerm(event.target.value)
                                }} 
                            />
                            <FontAwesomeIcon className="icon" icon ={["fas", "search"]}/>
                        </div>
                        <Row className ="justify-content-center header-column-show p-0">
                            <Col xs="1" className="text-center p-0 border-right pt-2 pb-2">
                                <p>Ordinal</p>
                            </Col>
                            <Col xs="2" className="text-center p-0 border-right pt-2 pb-2">
                                <p>Identify Card</p>
                            </Col>
                            <Col xs="4" className="text-center p-0 border-right pt-2 pb-2">
                                <p>Full Name</p>
                            </Col>
                            <Col xs="3" className="text-center p-0 border-right pt-2 pb-2">
                                <p>Date/Time</p>
                            </Col>
                            <Col xs="2" className="text-center p-0 border-right pt-2 pb-2">
                                <p>Status</p>
                            </Col>
                        </Row>
                        <Row className = " data-view-sheet">
                            <Col xs="1" className="text-center p-0 border-right pt-2 pb-2 ">
                                {listLogin.listLoginHis
                                .filter(val => {
                                    if(searchTerm === "") {
                                        return val
                                    } else {
                                        let value = `${val.Account.IdentifyCard}`;
                                        if(value.includes(searchTerm)) {
                                            return val
                                        }
                                    }
                                })
                                .map((item,key) => {
                                    return(
                                        <p className= "item-show" key ={key}>{item.LoginId}</p>
                                    )
                                })}
                            </Col>
                            <Col xs="2" className="text-center p-0 border-right pt-2 pb-2 ">
                                {listLogin.listLoginHis
                                    .filter(val => {
                                        if(searchTerm === "") {
                                            return val
                                        } else {
                                            let value = `${val.Account.IdentifyCard}`;
                                            if(value.includes(searchTerm)) {
                                                return val
                                            }
                                        }
                                    })
                                    .map((item,key) => {
                                    return(
                                        <p className= "item-show" key ={key}>{item.Account.IdentifyCard}</p>
                                    )
                                })}
                            </Col>
                            <Col xs="4" className="text-center p-0 border-right pt-2 pb-2 ">
                                {listLogin.listLoginHis
                                .filter(val => {
                                    if(searchTerm === "") {
                                        return val
                                    } else {
                                        let value = `${val.Account.IdentifyCard}`;
                                        if(value.includes(searchTerm)) {
                                            return val
                                        }
                                    }
                                })
                                .map((item,key) => {
                                    return(
                                        <p className= "item-show" key ={key}>{item.Account.LastName} {item.Account.FirstName}</p>
                                    )
                                })}
                            </Col>
                            <Col xs="3" className="text-center p-0 border-right pt-2 pb-2 ">
                                {listLogin.listLoginHis
                                .filter(val => {
                                    if(searchTerm === "") {
                                        return val
                                    } else {
                                        let value = `${val.Account.IdentifyCard}`;
                                        if(value.includes(searchTerm)) {
                                            return val
                                        }
                                    }
                                })
                                .map((item,key) => {
                                    return(
                                        <p className= "item-show" key ={key}>{item.Date} {item.Time}</p>
                                    )
                                })}
                            </Col>
                            <Col xs="2" className="text-center p-0 pt-2 pb-2 ">
                                {listLogin.listLoginHis
                                .filter(val => {
                                    if(searchTerm === "") {
                                        return val
                                    } else {
                                        let value = `${val.Account.IdentifyCard}`;
                                        if(value.includes(searchTerm)) {
                                            return val
                                        }
                                    }
                                })
                                .map((item,key) => {
                                    return(
                                        <p className= "item-show" key ={key}>{item.LoginHisStatus.StatusName}</p>
                                    )
                                })}
                            </Col>
                        </Row>
                    </Col>
                    
                </Row>
            </Col>
       </Row>
    )
}