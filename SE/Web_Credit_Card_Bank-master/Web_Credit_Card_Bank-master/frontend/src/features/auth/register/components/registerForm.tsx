import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Field, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import { Alert, Col, Container, InputGroup, InputGroupText, Row } from 'reactstrap';
import { generateArray } from '.';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import '../../../css/App.css';
import '../../../css/auth.css';
import '../../../css/register.css';
import '../../../css/payment-form.css';
import { registerSchema } from '../../form-validate/auth-validate';
import { checkAccountExist } from '../accountExistedSlice';
import { cardType, registerFormDataDto, registerFormDto, registerInfoFormDto } from '../register-dto';
import { cardTypeInfo, selectRegisterState } from '../registerInfoSlice';

export const Register: React.FC<{errMsg:string}> = ({errMsg}) => {
    let registerForm: registerFormDto = registerFormDataDto;
    let registerInfo:registerInfoFormDto = useAppSelector(selectRegisterState);
    
    // day just have from 1 to 31 
    let day = generateArray(1,31);

    // just have 12 month per year
    let month = generateArray(1,12);
    
    // see on web and see that from 1921 upto now 
    let year = generateArray(1921, 2021);
    
    let dispatch = useAppDispatch();
    
    // const [cardType, setCardType] = useState([]);
    let cardType:cardType[] = registerInfo.cardType;
   

    useEffect(() => {
        //fetch cardtype from server to client for user to choose
        dispatch(cardTypeInfo());
    }, [])

    return(
        <Row xs = "1" lg = "1" sm = "1" md = "1" xl ="1" xxl = "1" className = "display-flex full-view animate__animated animate__fadeIn admin-bg">
                <Col className="margin-layout">
                    <Row md = "1" className='center-text'>
                        <div>
                            <h3 className ="text-center manager-text mt-4">CREATE NEW ACCOUNT</h3>
                        </div>
                    </Row>
                    
                    <Row md = "1" className = 'display-flex'>
                        <Col lg = "7" md="7" sm= "11" xs = "11" >
                            <Alert className="alert alert-danger alert-height animate__animated animate__fadeIn" isOpen= {errMsg !== '' ? true: false} role="alert">
                                <p className = "font-weight-bold mx-3 err-msg" >{errMsg}</p>
                            </Alert>
                            <Formik
                                initialValues={registerForm}
                                validationSchema={registerSchema}
                                onSubmit={(values, actions) => {
                                //because phone number and indentifycard in form return string value so need change to number
                                values.PhoneNumber = Number(values.PhoneNumber);
                                values.IdentifyCard = Number(values.IdentifyCard);
                                dispatch(checkAccountExist(values));
                            }}>
                            {({errors, touched}) => (
                            <Form>
                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Username</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8">
                                        <div className={errors.UserName?" payment-input-group justify-content-start text-danger" : "payment-input-group justify-content-start" }>
                                            {errors.UserName && touched.UserName ? (<span>{errors.UserName}</span>): null}
                                        </div>
                                        <Field id="UserName" className ="payment-input-field" name="UserName" placeholder="userName" />
                                    </Col>
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Pasword</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8" className ='mb-2'>
                                        <div className={errors.Password?" payment-input-group justify-content-start text-danger" : "payment-input-group justify-content-start" }>
                                            {errors.Password && touched.Password ? (<span>{errors.Password}</span>): null}
                                        </div>
                                        <Field id="Password" className ="payment-input-field" type="password" name="Password" placeholder="password" />
                                    </Col>
                                </Row>
                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">First name</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8">
                                        <div className={errors.FirstName?" payment-input-group justify-content-start text-danger" : "payment-input-group justify-content-start" }>
                                            {errors.FirstName && touched.FirstName ? (<span>{errors.FirstName}</span>): null}
                                        </div>
                                            <Field id="FirstName" className ="payment-input-field" name="FirstName" placeholder="First Name" />
                                    </Col>
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Last name</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8" className ='mb-2'>
                                        <div className={errors.LastName?" payment-input-group justify-content-start text-danger" : "payment-input-group justify-content-start" }>
                                            {errors.LastName && touched.LastName ? (<span>{errors.LastName}</span>): null}
                                        </div>
                                        <Field id="LastName" className ="payment-input-field" name="LastName" placeholder="Last Name" />
                                    </Col>
                                </Row>
                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Email</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8">
                                        <div className={errors.Email?" payment-input-group justify-content-start text-danger" : "payment-input-group justify-content-start" }>
                                            {errors.Email&& touched.Email? (<span>{errors.Email}</span>): null}
                                        </div>
                                        <Field id="Email" className ="payment-input-field" name="Email" placeholder="Email" />
                                    </Col>
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Phone number</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8" className ='mb-2'>
                                        <div className={errors.PhoneNumber?" payment-input-group justify-content-start text-danger" : "payment-input-group justify-content-start" }>
                                            {errors.PhoneNumber&& touched.PhoneNumber? (<span>{errors.PhoneNumber}</span>): null}
                                        </div>
                                            <Field id="PhoneNumber" className ="payment-input-field" name="PhoneNumber" placeholder= "PhoneNumber"/>
                                    </Col>
                                </Row>
                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Identify Card</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8" className ='mb-2'>
                                        <div className={errors.IdentifyCard?" payment-input-group justify-content-start text-danger" : "payment-input-group justify-content-start" }>
                                            {errors.IdentifyCard && touched.IdentifyCard? (<span>{errors.IdentifyCard}</span>): null}
                                        </div>
                                            <Field id="IdentifyCard" className ="payment-input-field" name="IdentifyCard" placeholder="Identify Card" />
                                    </Col>
                                </Row>
                                
                                <Row xs = "2" sm ="2" className ="align-items-center input-background ">
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Address</p>
                                    </Col>
                                    <Col xs ="12" sm ="8" lg="8" className ='mb-2'>
                                        <div className={errors.Address?" payment-input-group justify-content-start text-danger" : "payment-input-group justify-content-start" }>
                                            {errors.Address&& touched.Address? (<span>{errors.Address}</span>): null}
                                        </div>
                                            <Field id="Address" className="payment-input-field"  name="Address" placeholder="Address" />
                                    </Col>
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Date Of Birth</p>
                                    </Col>
                                    <Col>
                                        <Field name="day" className="select-option mr-2" component="select">
                                            {day.map(i => <option key={i} value={i} >{i}</option>)}
                                        </Field>

                                        <Field name="month" component="select" className="select-option mr-2">
                                            {month.map(i => <option  key={i} value={i} >{i}</option>)}
                                        </Field>

                                        <Field name="year" component="select" className="select-option">
                                            {/* render Option choose Year */}
                                            {year.map(i => <option key={i} value={i} >{i}</option>)}
                                        </Field>
                                    </Col>
                                    <Col xs ="12" sm ="4" lg="4">
                                        <p className = "mx-3 font-payment ">Card type</p>
                                    </Col>
                                    <Col>
                                        {/* render when fetching cardtype from server */}
                                        <Field name="type" component="select" className="select-option">
                                            {cardType.map(item => <option key = {item.CardTypeId} value ={item.TypeName}> {item.TypeName}</option> )}
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


