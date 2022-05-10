import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import '../../css/App.css';
import '../../css/auth.css';
import { selectUserHomeState } from '../../home/user/userSlice';
import { LoadingScreen } from '../../waiting/loading-screen';
import { changePassSchema } from '../form-validate/auth-validate';
import { selectLoginInfoState } from '../login/loginInfoSlice';
import { changePass, changePassState } from './forgot-pass-dto';
import { changePassword, selectChangePassState } from './forgotPassSlice';

export const ChangePassForm: React.FC = () => {
    const accountInfo =useAppSelector(selectUserHomeState).accountInfo;
    const userInfo = useAppSelector(selectLoginInfoState);
    const forgotPassInfo: changePass = {
        ID:accountInfo.IdentifyCard,
        PhoneNumber: accountInfo.PhoneNumber,
        Email: accountInfo.Email,
        RecentPass: userInfo.Password,
        OldPassword:'',
        Password: '',
        NewPassword: ''
    }
    let changePassState:changePassState = useAppSelector(selectChangePassState);
    const dispatch = useAppDispatch();

    return(
        <Container fluid className="container-center change-pass-bg p-0">
        <Row className = "display-flex  animate__animated animate__fadeIn">
            <Col lg = "6" md="8" sm= "10" xs = "11" className="margin-layout">

                <Row className = "mt-4"></Row>

                <Row md = "1" className='center-text'>
                    <h3 className ="fp-auth-font">Change Password</h3>
                </Row>
                <Row md = "1" className = 'center-text auth-form-reset-pass'>
                    
                    <Formik
                    initialValues={forgotPassInfo}
                    validationSchema={changePassSchema}
                    onSubmit={(values, actions) => {
                    
                    dispatch(changePassword(values));
                    }}>
                        {({errors, touched}) => (
                            <Form>
                                <p className ="font">Set your new password! There must be more than 8 characters for password.</p>
                                <p className ="reset-margin err-msg">{changePassState.errMsg}</p>
                                <Row xs = "2" sm ="2" className ="display-flex center-text">
                                    <Col xs ="11" sm ="10" lg="9">
                                        <div className= "regis-err-msg">
                                            {errors && touched.OldPassword ? (<div>{errors.OldPassword}</div>): null}
                                        </div>
                                        <div className={errors.OldPassword?" regis-input-group display-flex wrong-input" : "regis-input-group display-flex" }>
                                            <div className= "input-icons">
                                                <FontAwesomeIcon icon={['fas', 'lock']} />
                                            </div>
                                            <Field id="OldPassword" name="OldPassword" type="password" className="input-field" placeholder="Enter your recent password" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs = "2" sm ="2" className ="display-flex center-text">
                                    <Col xs ="11" sm ="10" lg="9">
                                        <div className= "regis-err-msg">
                                            {errors.Password && touched.Password ? (<div>{errors.Password}</div>): null}
                                        </div>
                                        <div className={errors.Password?" regis-input-group display-flex wrong-input" : "regis-input-group display-flex" }>
                                            <div className= "input-icons">
                                                <FontAwesomeIcon icon={['fas', 'lock']} />
                                            </div>
                                            <Field id="Password" name="Password" type="password" className="input-field" placeholder="Enter your new password" />
                                        </div>
                                    </Col>
                                </Row>
                                <Row xs = "2" sm ="2" className ="display-flex center-text">
                                    <Col xs ="11" sm ="10" lg="9">
                                        <div className= "regis-err-msg">
                                            {errors.NewPassword && touched.NewPassword ? (<div>{errors.NewPassword}</div>): null}
                                        </div>
                                        <div className={errors.NewPassword?" regis-input-group display-flex wrong-input" : "regis-input-group display-flex" }>
                                            <div className= "input-icons">
                                                <FontAwesomeIcon icon={['fas', 'lock']} />
                                            </div>
                                            <Field id="NewPassword" type="password" className="input-field " name="NewPassword" placeholder="Confirm your new password" />
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

export const SuccessChangePass: React.FC = () => {
    const dispatch = useAppDispatch()

    const processDone = () => {
        sessionStorage.removeItem('token');
        window.location.reload();
    }

    return (
        <Row className = "display-flex  animate__animated animate__fadeIn  mr-0 pr-0 change-pass-bg container-center">
            <Col lg = "6" md="8" sm= "10" xs = "11" className="margin-layout">
                <Row className = "mt-4"></Row>
                <Row md = "1" className = 'center-text justify-content-center align-items-center full-view'>
                    <Col className = 'align-item-center'>
                        <h2 className ="text-center fp-auth-font">done reset pass </h2>
                    </Col>
                    <div className="d-flex justify-content-center ">
                            <button className= "btn btn-grad" type="button" onClick = {() => {
                                processDone();
                            }}>Confirm</button>
                    </div>
                </Row>
            </Col>
        </Row>
    )
}

const ChangePassLayout: React.FC = () => {
    const forgotPassState:changePassState = useAppSelector(selectChangePassState);
    switch (forgotPassState.status) {
        case 'isLoading': 
            return (<LoadingScreen />);
        case 'idle':
            if (forgotPassState.state !== '') {
                return (<SuccessChangePass />)
            } else {
                return(<ChangePassForm/>)
            }
        default: {
            return (<ChangePassForm/>)
        }
    }
}

export default ChangePassLayout;