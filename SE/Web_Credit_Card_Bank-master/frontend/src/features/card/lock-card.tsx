import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { cardInfoDto } from '../home/home-dto';
import { selectCardState } from '../home/user/cardInfoSlice';
import { setUserHomeLayout } from '../home/user/userSlice';
import { lockCard, selectLockCardState, setCardToLock } from './lockCardSlice';

export const LockCard: React.FC = () => {
    let cardRecent:cardInfoDto = useAppSelector(selectCardState).card;
    let cardInfo: cardInfoDto= useAppSelector(selectLockCardState).card;
    let dispatch = useAppDispatch();
    

    const onProcess = () => {
        let cardId = cardRecent.CardID;
        dispatch(lockCard(cardId));
        window.alert("your card was locked");
        window.location.reload();
    }

    useEffect(() => {
        dispatch(setCardToLock(cardRecent));
        
    }, [])

    return (
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
                    <Col lg = "7" md="7" sm= "12" xs = "11" > 
                        <Row>
                            <h1 className ="fp-auth-font text-white text-center">Lock Card</h1>
                        </Row>
                        <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                            <Col xs ="12" sm ="4" lg="4">
                                <p className = "mx-3 font-payment ">Card Number</p>
                            </Col>
                            <Col xs ="12" sm ="8" lg="8">
                                <p className= "mx-3 font-payment text-right">{cardInfo.CardID}</p>
                            </Col>
                            <Col xs ="12" sm ="4" lg="4" className ="">
                                <p className = "mx-3 font-payment ">Card Type</p>
                            </Col>
                            <Col xs ="12" sm ="8" lg="8">
                                <p className= "mx-3 font-payment text-right">{cardInfo.CardType.TypeName}</p>
                            </Col>
                            <Col xs ="12" sm ="4" lg="4">
                                <p className = "mx-3 font-payment ">Brand</p>
                            </Col>
                            <Col xs ="12" sm ="8" lg="8">
                                <p className= "mx-3 font-payment text-right">IU Bank</p>
                            </Col>
                            <Col xs ="12" sm ="4" lg="4">
                                <p className = "mx-3 font-payment ">Request</p>
                            </Col>
                            <Col xs ="12" sm ="8" lg="8">
                                <p className= "mx-3 font-payment text-right">Lock Card</p>
                            </Col>
                        </Row>
                        <Row md = "1" xs = "1" sm ="1" lg="1"className="center-item">
                            <Col className ="justify-content-center d-flex">
                                <button className= "btn btn-grad" type="button" onClick = {() => {
                                    onProcess();
                                }}>Confirm</button>
                            </Col>
                            <Col className ="justify-content-center d-flex register-link">
                                <a href ='/' className= "text-white"> Back to previous page</a>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}