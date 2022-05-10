import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field } from 'formik';
import React, {useEffect} from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import '../../../css/header.css';
import peopleImg from '../../../css/people-circle.png';
import { getCardInfo, selectCardState, setOneCard } from '../cardInfoSlice';
import { selectUserHomeState, setUserHomeLayout } from '../userSlice';

export const Header: React.FC = () => {
    let dispatch = useAppDispatch();
    let accountInfo = useAppSelector(selectUserHomeState).accountInfo;
    let card = useAppSelector(selectCardState);

    const homeScreen = () => {
        dispatch(setUserHomeLayout("Home"));
    }

    const logout = () => {
        sessionStorage.clear();
        window.location.reload();
    }

    return (
        <Row className = "header-full-view bg-white mb-0">
            <Col md='2' sm ="3" xs ='12'  className ="mb-0 header-bg">
                <Row className =' header-full-view pb-3'>
                    <Col className= "m-0 header-flex mb-2 mt-3 p-0">
                        <Button className ="header-icon-home bg-white"
                         onClick={() => {homeScreen()}}>
                            <FontAwesomeIcon className="header-icon-color" icon={['fas', 'home']} />
                        </Button>
                        <FontAwesomeIcon className ="header-icon text-white" icon={['fas', 'credit-card']} />
                        <FontAwesomeIcon className ="header-icon text-white" icon={['fas', 'cog']} />
                        <FontAwesomeIcon className ="header-icon text-white" icon={['fas', 'gem']} />
                    </Col>
                    <Col className = "header-flex-end ">
                        <Button className ="header-icon text-white" onClick = {() => logout()}>
                            <FontAwesomeIcon  icon={['fas', 'power-off']} />
                        </Button>
                        <FontAwesomeIcon className ="header-icon text-white" icon={['fas', 'language']} />
                        <FontAwesomeIcon className ="header-icon text-white" icon={['fas', 'headset']} />
                    </Col>
                    
                </Row>
            </Col>
            <Col md= '10' sm ="9" className='header-body '>
                <Row xs="1" className ="justify-content-center">
                    <Col className ="text-center mt-3 header-body-hint"> 
                        <p className ="header-text"><span className="bold">IUB</span> Digibank</p>
                    </Col>
                    <Col className = "text-center header-body-background">
                        <img className="people-img header-body-hint" src ={peopleImg} />
                        <p>hello</p>
                        <h4 className = 'header-icon-color'>{accountInfo.LastName.toUpperCase()} {accountInfo.FirstName.toUpperCase()}</h4>
                        <p>the last login</p>
                        <p> - - - </p>
                    </Col>
                </Row>
                <Row xs="1" className ="justify-content-center">
                    <Col className = " header-body-background">
                        <Row xs = "2">
                            <Col xs ="9">
                                <p className ="text-small header-icon-color bold">List of accounts/cards</p>
                            </Col>
                            <Col xs = "2">
                                <p className ="text-small header-icon-color bold">Details</p>
                            </Col>
                            <Col xs ="6">
                                <p className ="text-small header-icon-color bold">Account Id</p>
                            </Col>
                            <Col xs = "4">
                                <p className ="text-small header-icon-color bold">{accountInfo.IdentifyCard}</p>
                            </Col>
                            <Col xs ="5">
                                <p className ="text-small header-icon-color bold">CardId</p>
                            </Col>
                            <Col xs ="6">
                                <select className="btn header-icon-color text-small bold" onChange = {e => {
                                    console.log(e.target.value);
                                    dispatch(setOneCard(e.target.value))}
                                }>
                                    {card.cardInfo.map(card => {
                                        return (
                                        <option
                                            className ="header-icon-color text-small bold"
                                            value ={card.CardID}>
                                                {card.CardID}
                                        </option>
                                    )})}
                                </select>
                            </Col>
                            <Col xs ="6">
                                <p className ="text-small header-icon-color bold">Balance Number</p>
                            </Col>
                            <Col xs = "6">
                                <p className ="text-right mx-4 text-small header-icon-color bold">{card.card.CurrentBalance} VND</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row xs="1" className ="justify-content-center">
                    <Col className = "text-center header-body-background header-body-hint">
                        <Col>
                            <p className ="text-small header-icon-color bold">Customer services 24/7</p>
                            <p className ="phone-text header-icon-color bold">1900 15 68 68</p>
                        </Col>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}