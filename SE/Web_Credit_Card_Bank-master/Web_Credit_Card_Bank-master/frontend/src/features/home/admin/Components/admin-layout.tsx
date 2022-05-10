import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col, Row } from 'reactstrap';
import { useAppDispatch } from '../../../../app/hooks';
import '../../../css/admin.css';
import '../../../css/App.css';
import '../../../css/auth.css';
import bank from '../../../css/bank.png';
import transtatus from '../../../css/Group 11.png';
import quick from '../../../css/Group 8.png';
import '../../../css/home.css';
import '../../../css/register.css';
import TranferImg from '../../../css/transfer.png';
import { setAdminHomeLayout } from '../adminSlice';

export const AdminLayout: React.FC = () => {
    const dispatch = useAppDispatch();

    const movingLayout = (params: string) => {
        dispatch(setAdminHomeLayout(params));
    }

    return (
        <Row xs = "1" lg = "1" sm = "1" md = "1" xl ="1" xxl = "1" className = "admin-bg animate__animated animate__fadeIn">
            <Col>
            <Row>
                <h2 className= "header-bank-font mx-3 mb-2 mt-2">IU BANK</h2>
            </Row>
            <Row md = "1" lg = "1" xs="1" className = 'justify-content-center transform-body overflow-auto'>
                <Row className= "justify-content-center align-items-center">
                <Col lg = "8" md="8" sm= "12" xs = "11" className="">
                    <Row className = "justify-content-center">
                        <h1 className ="text-center manager-text">MANAGEMENT</h1>
                    </Row>
                    <Row className="justify-content-center">
                        <Button className ="function-btn btn-home btn-grad-home m-4 border-0" 
                         onClick= {() => movingLayout('payment')}>
                            <img src={TranferImg} />
                            <p>Transaction history</p>
                        </Button>
                        <Button className ="function-btn btn-home btn-grad-home m-4 border-0" 
                         onClick= {() => movingLayout('createNewAccount')}>
                            <FontAwesomeIcon icon = {['fas', 'user']} />
                            <p>Create New User</p>
                        </Button>
                        <Button className ="function-btn btn-home btn-grad-home m-4 border-0" 
                        onClick = {() => movingLayout("account")}>
                            <FontAwesomeIcon icon = {['fas', 'credit-card']} />
                            <p>User Infomation</p>
                        </Button>
                        <Button className ="function-btn btn-home btn-grad-home m-4 border-0" 
                        onClick= {() => movingLayout('loginHis')}>
                            <img src ={transtatus} />
                            <p>Login History</p>
                        </Button>
                    </Row>
                </Col>
                </Row>
                <Col lg = "12" md="12" sm= "12" xs = "12" className = "" >
                    <div className = "hastag">
                        <p>Manage</p>
                    </div>
                </Col>
                <Col lg = "8" md="8" sm= "12" xs = "11" className = "mb-4" >
                    <Row className="justify-content-center ">
                        <Button className ="btn-home m-4 btn-other" 
                        onClick= {() => movingLayout('payment')}>
                            <img src={TranferImg} />
                            <p>Transaction history</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" 
                        onClick= {() => movingLayout('card')}>
                            <img src={quick} />
                            <p>card Information</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" 
                        onClick= {() => movingLayout('external')}>
                            <img src={bank} />
                            <p>Banking system</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other"
                        onClick={()=> movingLayout("account")} >
                            <FontAwesomeIcon icon = {['fas', 'credit-card']} />
                            <p>User Infomation</p>
                        </Button>
                        <Button className ="btn-home m-4 btn-other" >
                            <img src ={transtatus} />
                            <p>Login History</p>
                        </Button>
                        <div style = {{height:60}}>

                        </div>
                        
                    </Row>
                </Col>
            </Row>
            </Col>
        </Row>
    )
}