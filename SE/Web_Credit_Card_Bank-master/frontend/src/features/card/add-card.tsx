import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router';
import { Alert, Col, Container, Input, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { createCard, selectCardCreatedState } from '../auth/register/cardCreateSlice';
import { cardType, createCardInfoDto } from '../auth/register/register-dto';
import { cardTypeInfo, selectRegisterState } from '../auth/register/registerInfoSlice';
import { selectUserHomeState, setUserHomeLayout } from '../home/user/userSlice';
import { LoadingScreen } from '../waiting/loading-screen';

export const AddCardForm: React.FC<{errMsg:string}> = ({errMsg}) => {
    let dispatch = useAppDispatch();
    let accountInfo = useAppSelector(selectUserHomeState).accountInfo;
    let cardType:cardType[] = useAppSelector(selectRegisterState).cardType;
    let initCardCreateInfo: createCardInfoDto = {
        IdentifyCard: accountInfo.IdentifyCard,
        type: 'Normal',
    }
    // because can set by using useEffect so set default type of card is normal

    useEffect(() => {
        //fetch cardtype from server to client for user to choose
        dispatch(cardTypeInfo());
    }, [])

    return(
        <Row xs = "1" lg = "1" sm = "1" md = "1" xl ="1" xxl = "1" className = "display-flex full-view animate__animated animate__fadeIn payment-transfer-background">
            <Col className="margin-layout">
                <Row className="hint background">
                    <h2 className= " d-flex mt-2">
                        <span>
                            <button className ="btn"
                            onClick = {() => dispatch(setUserHomeLayout('Home'))}>
                                <FontAwesomeIcon icon ={['fas', 'long-arrow-alt-left']} style={{fontSize: 32, color:'white', paddingBottom:3}}/>
                            </button>
                        </span>
                        IU BANK
                    </h2>
                </Row>
                <Row md = "1" className = 'display-flex transform-body'>
                    <Col lg = "7" md="7" sm= "11" xs = "11" >
                        <Alert   Alert className="alert alert-danger alert-height animate__animated animate__fadeIn" isOpen= {errMsg !== '' ? true: false} role="alert">
                            <p className = "font-weight-bold mx-3 err-msg" >{errMsg}</p>
                        </Alert>
                        <Row xs = "1" sm ="1" className ="align-items-center text-center input-background ">
                            <p className ="font">Please check your information and choose card type before submit.</p>
                        </Row>
                        <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                            <Col xs ="6" sm ="4" lg="4" className= "mb-3 mt-3 ">
                                <p className = "mx-3 font-payment ">Full Name </p>
                            </Col>
                            <Col xs ="6" sm ="8" lg="8" className= "mb-3 mt-3">
                                <div className="width-balance">
                                    <p className = "text-right font-payment">{`${accountInfo.LastName} ${accountInfo.FirstName}`}</p>
                                </div>
                            </Col>
                            <Col xs ="6" sm ="4" lg="4" className= "mb-3 mt-3 ">
                                <p className = "mx-3 font-payment ">Identify Number </p>
                            </Col>
                            <Col xs ="6" sm ="8" lg="8" className= "mb-3 mt-3">
                                <div className="width-balance">
                                    <p className = "text-right font-payment">{accountInfo.IdentifyCard}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                            <Col xs ="6" sm ="4" lg="4" className= "mb-3 mt-3 ">
                                <p className = "mx-3 font-payment ">Email </p>
                            </Col>
                            <Col xs ="6" sm ="8" lg="8" className= "mb-3 mt-3">
                                <div className="width-balance">
                                    <p className = "text-right font-payment">{accountInfo.Email}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                            <Col xs ="6" sm ="4" lg="4" className= "mb-3 mt-3 ">
                                <p className = "mx-3 font-payment ">Phone Number </p>
                            </Col>
                            <Col xs ="6" sm ="8" lg="8" className= "mb-3 mt-3">
                                <div className="width-balance">
                                    <p className = "text-right font-payment">{`0${accountInfo.PhoneNumber}`}</p>
                                </div>
                            </Col>
                            <Col xs ="6" sm ="4" lg="4" className= "mb-3 mt-3 ">
                                <p className = "mx-3 font-payment ">Date Of Birth </p>
                            </Col>
                            <Col xs ="6" sm ="8" lg="8" className= "mb-3 mt-3">
                                <div className="width-balance">
                                    <p className = "text-right font-payment">{accountInfo.DateOfBirth}</p>
                                </div>
                            </Col>
                        </Row>
                        
                        <Formik
                            initialValues={initCardCreateInfo}
                            onSubmit={(values, actions) => {
                                console.log(values);
                                dispatch(createCard(values));
                            }}>
                            {({errors, touched}) => (
                                <Form>
                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                <Col xs ="6" sm ="4" lg="4" className= "mb-3 mt-3 ">
                                    <p className = "mx-3 font-payment "> Card Type </p>
                                </Col>
                                <Col xs ="6" sm ="8" lg="8" className= "mb-3 mt-3">
                                    <Field name="type" className ="payment-input-field" component="select">
                                    {cardType.map((item)=> 
                                        <option key = {item.CardTypeId} className ="payment-input-field" value = {item.TypeName}
                                        > {item.TypeName} </ option>
                                    )}
                                    </Field>
                                </Col>
                                </Row>
                                <div className="d-flex justify-content-center ">
                                    <button className= "btn btn-grad" type="submit">Submit</button>
                                </div>                                    
                            </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}


export const AddCardLayout: React.FC = () => {
    let createCardState = useAppSelector(selectCardCreatedState);
    let dispatch = useAppDispatch();
    if(createCardState.status ==='idle') {
        if(createCardState.isCreated === 'done') {
            dispatch(setUserHomeLayout("Home"));
            
            return(<Navigate to="/" replace = {true}/>)
        } else {
            return (<AddCardForm errMsg = {createCardState.errMsg}/>)
        }
    }
    else if (createCardState.status === 'isLoading'){
        return(<LoadingScreen />)
    }
    else {
        return (<AddCardForm errMsg = {createCardState.errMsg}/>)
    }
}