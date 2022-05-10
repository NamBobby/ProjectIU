import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { decodeToken } from '../../../auth/jwtProcess/decode-jwt';
import { selectLoginState } from '../../../auth/login/loginSlice';
import { setDefaultCreateCardErrMsg } from '../../../auth/register/cardCreateSlice';
import '../../../css/App.css';
import '../../../css/auth.css';
import bank from '../../../css/bank.png';
import saveMoney from '../../../css/coin-bag-line.png';
import Cash from '../../../css/Group 10.png';
import transtatus from '../../../css/Group 11.png';
import quick from '../../../css/Group 8.png';
import '../../../css/home.css';
import qr from '../../../css/qr-scanner.png';
import '../../../css/register.css';
import TranferImg from '../../../css/transfer.png';
import { Layout } from '../../../payment/payment-dto';
import { setPaymentLayout } from '../../../payment/paymentLayoutSlice';
import { setDefaultStatus } from '../../../payment/paymentSlice';
import { getCardInfo } from '../cardInfoSlice';
import { setUserHomeLayout } from '../userSlice';
import { HomeCarousel } from './Carousel';

export const UserHomeLayout: React.FC = () => {
    const dispatch = useAppDispatch();
    const token = useAppSelector(selectLoginState).token;
    const accountId:number = parseInt(decodeToken.getIdFromJwt(token));

    const moveToPayment = (params: Layout, layout:string) => {
        dispatch(setPaymentLayout(params));
        dispatch(setUserHomeLayout(layout));
    }
    const movingLayout = (params: string) => {
        dispatch(setUserHomeLayout(params))
    }

    useEffect(() => {
        dispatch(setDefaultStatus());
        dispatch(setDefaultCreateCardErrMsg());
        dispatch(getCardInfo(accountId));
    }, [])

    return (
        <Row xs = "1" lg = "1" sm = "1" md = "1" xl ="1" xxl = "1" className = "display-flex full-view animate__animated animate__fadeIn">
            <Col>
            <Row>
                <h2 className= "hint header-bank-font mx-3 mb-2 mt-2">IU BANK</h2>
            </Row>
            <Row md = "1" lg = "1" xs="1" className = 'display-flex transform-body overflow-auto'>
                <Col lg = "8" md="8" sm= "12" xs = "11" >
                    <Row className ="hint">
                            <HomeCarousel/>
                    </Row>
                    <Row className="justify-content-center">
                        <Button className ="function-btn btn-home btn-grad-home m-4 border-0" 
                         onClick= {() => moveToPayment('internal', 'payment')}>
                            <img src={TranferImg} />
                            <p>Internal Transfer</p>
                        </Button>
                        <Button className ="function-btn btn-home btn-grad-home m-4 border-0" 
                        onClick = {() => movingLayout("addCard")}>
                            <FontAwesomeIcon icon = {['fas', 'credit-card']} />
                            <p>Create New Card</p>
                        </Button>
                        <Button className ="function-btn btn-home btn-grad-home m-4 border-0" 
                        onClick= {() => moveToPayment('external', 'payment')}>
                            <img src={quick} />
                            <p>Quick Transfer 24/7</p>
                        </Button>
                        <Button className ="function-btn btn-home btn-grad-home m-4 border-0"
                        onClick= {() => movingLayout("lockCard")} >
                            <FontAwesomeIcon icon={['fas', 'lock']} />
                            <p>Lock Card</p>
                        </Button>
                        <Button className ="function-btn btn-home btn-grad-home m-4 border-0" 
                        onClick = {() => movingLayout("changePass")}>
                            <img src={saveMoney} />
                            <p>Change Password</p>
                        </Button>
                    </Row>
                </Col>
                <Col lg = "12" md="12" sm= "12" xs = "12" className = "px-3" >
                    <div className = "hastag">
                        <p>Transfer</p>
                    </div>
                </Col>
                <Col lg = "8" md="8" sm= "12" xs = "11" >
                    <Row className="justify-content-center ">
                        <Button className ="btn-home m-4 btn-other" 
                        onClick= {() => moveToPayment('internal', 'payment')}>
                            <img src={TranferImg} />
                            <p>Internal Transfer</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" 
                        onClick= {() => moveToPayment('external', 'payment')}>
                            <img src={quick} />
                            <p>Quick Transfer 24/7</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" 
                        onClick= {() => moveToPayment('external', 'payment')}>
                            <img src={bank} />
                            <p>External Transfer</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" >
                            <img src = {Cash} />
                            <p>Cash transfer</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" >
                            <img src ={transtatus} />
                            <p>Transaction Status</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" >
                            <img src ={qr} />
                            <p>Transfer by QR code</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" >
                            <FontAwesomeIcon icon ={['fas', 'gift']} />
                            <p>Lucky gift</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" >
                            <FontAwesomeIcon icon ={['fas', 'virus-slash']} />
                            <p>Covid Vaccine Fund</p>
                        </Button>
                    </Row>
                </Col>
            </Row>
            </Col>
        </Row>
    )
}