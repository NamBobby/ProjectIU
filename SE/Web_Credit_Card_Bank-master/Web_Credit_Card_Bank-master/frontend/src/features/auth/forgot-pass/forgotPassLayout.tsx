import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { LoadingScreen } from '../../waiting/loading-screen';
import { forgotSchema } from '../form-validate/auth-validate';
import { changePassState, forgotPassDto } from './forgot-pass-dto';
import { forgotPass, selectChangePassState } from './forgotPassSlice';
import '../../css/App.css';
import '../../css/auth.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ForgotPassForm: React.FC = () => {
    const forgotPassInfo: forgotPassDto = {
        PhoneNumber: '',
        ID: '',
        Email: '',
    }
    let forgotPassState:changePassState = useAppSelector(selectChangePassState);
    const dispatch = useAppDispatch();

    return(
        <Container fluid className="container-center forgot-background">
        <Row className = "display-flex  animate__animated animate__fadeIn">
            <Col lg = "5" md="6" sm= "8" xs = "11" className="margin-layout">

                <Row className = "other-login"></Row>

                <Row md = "1" className='center-text'>
                    <h1 className ="fp-auth-font">Forgot Password ?</h1>
                </Row>
                <Row md = "1" className = 'center-text auth-form-reset-pass'>
                    <p className ="reset-margin err-msg">{forgotPassState.errMsg}</p>
                    <Formik
                    initialValues={forgotPassInfo}
                    validationSchema={forgotSchema}
                    onSubmit={(values, actions) => {
                    // loginFunction(values);
                    dispatch(forgotPass(values));
                    }}>
                        {({errors, touched}) => (
                            <Form>
                                <Row xs = "2" sm ="2" className ="display-flex center-text">
                                    <Col xs ="11" sm ="10" lg="9">
                                        <div className= "regis-err-msg">
                                            {errors.ID && touched.ID ? (<div>{errors.ID}</div>): null}
                                        </div>
                                        <div className={errors.ID?" regis-input-group display-flex wrong-input" : "regis-input-group display-flex" }>
                                            <div className= "input-icons">
                                                <FontAwesomeIcon icon={['fas', 'user']} />
                                            </div>
                                            <Field id="ID" name="ID" className="input-field" placeholder="Enter your ID card" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs = "2" sm ="2" className ="display-flex center-text">
                                    <Col xs ="11" sm ="10" lg="9">
                                        <div className= "regis-err-msg">
                                            {errors.PhoneNumber && touched.PhoneNumber ? (<div>{errors.PhoneNumber}</div>): null}
                                        </div>
                                        <div className={errors.PhoneNumber?" regis-input-group display-flex wrong-input" : "regis-input-group display-flex" }>
                                            <div className= "input-icons">
                                                <FontAwesomeIcon icon={['fas', 'phone']} />
                                            </div>
                                            <Field id="PhoneNumber" className="input-field " name="PhoneNumber" placeholder="Enter your phone number" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs = "2" sm ="2" className ="display-flex center-text">
                                    <Col xs ="11" sm ="10" lg="9">
                                        <div className= "regis-err-msg">
                                            {errors.Email && touched.Email ? (<div>{errors.Email}</div>): null}
                                        </div>
                                        <div className={errors.Email?" regis-input-group display-flex wrong-input" : "regis-input-group display-flex" }>
                                            <div className= "input-icons">
                                                <FontAwesomeIcon icon={['fas', 'envelope']} />
                                            </div>
                                            <Field id="Email" type= 'Email' className="input-field " name="Email" placeholder="Enter your email" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row md = "1" xs= "1" sm="1" className = 'center-text auth-col-submit'>
                                    <Col>
                                        <button type="submit" className='auth-button auth-button-forgot'>ENTER</button>
                                    </Col>
                                </Row>
                            </Form>
                        )}
                    </Formik>
                </Row>
                <Row xs= "1" className ='register-link'>
                    <Col className= "center-text">
                        <a href ='/'> Back to previous page</a>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
    )
}

export const SuccessResetPass: React.FC = () => {
    let navigate = useNavigate();
    return (
        <Container fluid className="container-center forgot-background">
        <Row className = "display-flex animate__animated animate__fadeIn align-items-center full-view">
            <Row>
                    <Row md = "1" className='center-text'>
                        <h1 className ="fp-auth-font">Reset Password Successfully</h1>
                    </Row>
                    <Row md = "1" className='center-text'>
                        <h1 className ="font">your new password was send to your mail</h1>
                    </Row>
                    <Row md = "1" className='center-text  auth-col-submit'>
                        <button 
                            className ="auth-button auth-button-forgot"
                            onClick ={() => {
                                window.location.reload();
                            }}>Confirm</button>
                    </Row>
            </Row>
        </Row>
        </Container>

    )
}

const ForgotPassLayout: React.FC = () => {
    const forgotPassState:changePassState = useAppSelector(selectChangePassState);
    switch (forgotPassState.status) {
        case 'isLoading': 
            return (<LoadingScreen />);
        case 'idle':
            if (forgotPassState.state !== '') {
                return (<SuccessResetPass />)
            } else {
                return(<ForgotPassForm/>)
            }
        default: {
            return (<ForgotPassForm/>)
        }
    }
}

export default ForgotPassLayout;