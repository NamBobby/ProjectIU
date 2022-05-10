import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Col, Input, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import '../../css/App.css';
import '../../css/auth.css';
import '../../css/payment-form.css';
import { selectCardState } from '../../home/user/cardInfoSlice';
import { selectUserHomeState, setUserHomeLayout } from '../../home/user/userSlice';
import { selectSendMailState, sendMailFunc } from '../../sendmail/sendMailSlice';
import { InternalFormValidate } from '../form-validate';
import { internalPaymentDto } from '../payment-dto';
import { internalTransfer, selectPaymentState, setErrMsg } from '../paymentSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export const InternalPayment: React.FC = () => {
    const account = useAppSelector(selectUserHomeState).accountInfo;
    let descriptionInit = `${account.LastName} ${account.FirstName} transfer` ;
    const mailState = useAppSelector(selectSendMailState);
    const paymentState = useAppSelector(selectPaymentState);
    let cardState = useAppSelector(selectCardState);
    console.log(cardState.card);
    const internalPaymentInfo: internalPaymentDto = {
        CardSendId: `${cardState.card.CardID}` ,
        CardReceiveId: '',
        Balance: '',
        Description:descriptionInit,
        OTP: '',
    }
    console.log(internalPaymentInfo.CardSendId);
    const [submitBtnState, setSubmitBtnState] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    
    const processOtp= () => {
        dispatch(sendMailFunc(account.IdentifyCard));
        window.alert("The OTP was send to your mail");
        setSubmitBtnState(false);
    }
    const testFunc = (sel:any) => {
        console.log("Test", sel);
    }

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
                    <Col lg = "7" md="7" sm= "11" xs = "11" >
                        
                        <Alert className="alert alert-danger alert-height animate__animated animate__fadeIn" isOpen= {paymentState.errMsg? true: false} role="alert">
                            <p className = "font-weight-bold mx-3 err-msg" >{paymentState.errMsg}</p></Alert>
                        <Formik
                        initialValues={internalPaymentInfo}
                        validationSchema={InternalFormValidate}
                        onSubmit={(values, actions) => {
                            console.log(values);
                            // because type of otp is number but type of values.otp is string so do this to compare
                            if(parseInt(values.OTP) === mailState.code) {
                                dispatch(internalTransfer(values));
                            } else 
                                dispatch(setErrMsg('wrong otp'));
                        }}>
                        {({errors, touched,handleChange}) => (
                            <Form>
                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Account</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8">
                                        <div className={errors.CardSendId?" payment-input-group justify-content-end" : "payment-input-group justify-content-end align-items-center" }>
                                                <p id="CardSendId" className ="payment-input-field bg-white card-send-info" >{internalPaymentInfo.CardSendId}</p>
                                        </div>
                                    </Col>
                                    <Col xs ="6" sm ="4" lg="4" className= "mb-3 mt-3 ">
                                        <p className = "mx-3 font-payment ">Available balances </p>
                                    </Col>
                                    <Col xs ="6" sm ="8" lg="8" className= "mb-3 mt-3">
                                        <div className="width-balance">
                                            <p className = "text-right font-payment">{cardState.card.CurrentBalance} VND</p>
                                        </div>
                                    </Col>
                                </Row>

                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                    <Col xs ="12" sm ="5" lg="5"></Col>
                                    <Col xs ="12" sm ="6" lg="6" className= "mr-4">
                                    <div className=" payment-input-group  text-danger font-weight-bold mb-0">
                                            {errors.CardReceiveId && touched.CardReceiveId ? (<div>{errors.CardReceiveId}</div>): null}
                                        </div>
                                    </Col>
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment mb-3">Beneficiary Account</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8" className= "mb-4 pb-1">
                                        <div className={errors.CardReceiveId?"payment-input-group justify-content-end ":  "payment-input-group justify-content-end " }>
                                            
                                            <Field id="CardReceiveId" name="CardReceiveId" className ="payment-input-field" placeholder="CardReceiveId" />
                                        </div>
                                    </Col>
                                </Row>

                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                    <Col xs ="12" sm ="5" lg="5"></Col>
                                    <Col xs ="12" sm ="6" lg="6" className= "mr-4">
                                    <div className=" payment-input-group  text-danger font-weight-bold mb-0">
                                            {errors.Balance && touched.Balance ? (<div>{errors.Balance}</div>): null}
                                        </div>
                                    </Col>
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment mb-3">Amount</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8" className= "mb-4 pb-1">
                                        <div className={errors.Balance?"payment-input-group justify-content-end":  "payment-input-group  justify-content-end" }>
                                            <Field id="Balance" name="Balance" className ="payment-input-field" placeholder="Balance" />
                                        </div>
                                    </Col>

                                    <Col xs ="12" sm ="4" lg="4" >
                                        <p className = "mx-3 font-payment mb-3">Transaction fee </p>
                                    </Col>
                                    <Col xs ="11" sm ="8" lg="8" className= "p-0 text-center">
                                        <Input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked />
                                        <label className="form-check-label" htmlFor ="exampleRadios1">
                                            Sender pays
                                        </label>
                                        <Input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                        <label className ="form-check-label" htmlFor="exampleRadios2">
                                            Receiver pays
                                        </label>
                                    </Col>   

                                    <Col xs ="12" sm ="5" lg="5"></Col>
                                    <Col xs ="12" sm ="6" lg="6" className= "mr-4">
                                        <div className=" payment-input-group  text-danger font-weight-bold mb-0">
                                            {errors.Description && touched.Description ? (<div>{errors.Description}</div>): null}
                                        </div>
                                        </Col>
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment mb-3">Content</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8" className= "mb-4 pb-1">
                                        <div className={errors.Description?"payment-input-group justify-content-end":  "payment-input-group justify-content-end " }>
                                            <Field id="Description" name="Description" className ="payment-input-field"  placeholder="Description" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                    <Col xs ="12" sm ="5" lg="5"></Col>
                                    <Col xs ="12" sm ="6" lg="6" className= "mr-4">
                                    <div className=" payment-input-group  text-danger font-weight-bold mb-0">
                                            {errors.OTP && touched.OTP ? (<div>{errors.OTP}</div>): null}
                                        </div>
                                    </Col>
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment mb-1">OTP</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8" className= "mb-2">
                                        <div className={errors.OTP?" payment-input-group justify-content-end" : "payment-input-group justify-content-end" }>   
                                            <Field id="OTP" name="OTP" className ="payment-input-field otp-check" placeholder="OTP" />
                                        <button className= "btn btn-grad mx-2" onClick = {() => {
                                            processOtp();
                                        }}>Get Otp</button>
                                        </div>
                                    </Col>
                                </Row>
                                <div className="d-flex justify-content-center ">
                                    <button className= "btn btn-grad" disabled={submitBtnState} type="submit">Submit</button>
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
