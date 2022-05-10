import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useAppDispatch } from '../../../../app/hooks';
import '../../../css/header.css';
import peopleImg from '../../../css/people-circle.png';
import { setAdminHomeLayout } from '../adminSlice';

export const AdminHeader: React.FC<{accountId:number}> = ({accountId}) => {
    let dispatch = useAppDispatch();
    
    const homeScreen = () => {
        dispatch(setAdminHomeLayout("Home"));
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
                        <h4 className = 'header-icon-color'>ADMIN {accountId}</h4>
                        <p>the last login</p>
                        <p> - - - </p>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}