import React from 'react';
import { useNavigate } from 'react-router';
import { Col, Row } from 'reactstrap';
import { useAppDispatch } from '../../../app/hooks';
import { setUserHomeLayout } from '../../home/user/userSlice';
import { externalPaymentDto } from '../payment-dto';

export const TransferSuccessFrom: React.FC<externalPaymentDto> = ({CardSendId, CardReceiveId, Balance, Bank, Description, OTP}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    return (
        <Row xs = "1" lg = "1" sm = "1" md = "1" xl ="1" xxl = "1" className = "display-flex full-view animate__animated animate__fadeIn payment-transfer-background">
            <Col className="margin-layout">
                <Row className="hint">
                    <h2 className= "background d-flex">IU BANK</h2>
                </Row>
                <Row md = "1" className = 'display-flex transform-body'>
                    <Col lg = "7" md="7" sm= "11" xs = "11" >
                        <Row xs = "12" sm ="12" className ="align-items-center justify-content-center mb-4">
                            <h1 className = "text-center transfer-text mt-4">Transfer Successfully</h1>
                        </Row>
                        <Row xs = "2" sm ="2" className ="align-items-center justify-content-center input-background ">
                            <Col xs ="12" sm ="7" lg="7" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment ">Card Send</p>
                            </Col>
                            <Col xs ="12" sm ="4" lg="4" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment">{CardSendId}</p>
                            </Col>
                        </Row>
                        <Row xs = "2" sm ="2" className ="align-items-center justify-content-center input-background ">
                            <Col xs ="12" sm ="7" lg="7" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment ">Card Receive</p>
                            </Col>
                            <Col xs ="12" sm ="4" lg="4" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment">{CardReceiveId}</p>
                            </Col>
                            <Col xs ="12" sm ="7" lg="7" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment ">Bank</p>
                            </Col>
                            <Col xs ="12" sm ="4" lg="4" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment">{Bank !== ''? Bank: "IU Bank"}</p>
                            </Col>
                        </Row>
                        <Row xs = "2" sm ="2" className ="align-items-center justify-content-center input-background ">
                            <Col xs ="12" sm ="7" lg="7" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment ">Balance</p>
                            </Col>
                            <Col xs ="12" sm ="4" lg="4" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment">{Balance}</p>
                            </Col>
                        </Row>
                        <Row xs = "2" sm ="2" className ="align-items-center justify-content-center input-background ">
                            <Col xs ="12" sm ="7" lg="7" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment ">Content</p>
                            </Col>
                            <Col xs ="12" sm ="4" lg="4" style ={{fontSize: 22}}>
                                <p className = "mx-3 font-payment">{Description}</p>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-center ">
                            <button className= "btn btn-grad"
                                onClick = {() => dispatch(setUserHomeLayout("Home")) }>
                                    Confirm
                            </button>
                        </div>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}