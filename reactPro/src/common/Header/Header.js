import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

// import { singUp } from 'store/auth/action'

import {
    Container,
    Row,
    Col,
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    NavDropdown,
    ButtonToolbar
} from 'react-bootstrap'

import './Header.scss';

import logo from "assets/logo/agreement.png";

const Header = props => {


    const dispatch = useDispatch();

    return (
        <div className="header-wrapper">
            <Container className="header-container">
                <Row>
                    <Col className="col-container">
                        <Navbar bg="primary" variant="dark" className="navbar-container">
                            <Navbar.Brand href="#home">
                                <img
                                    alt=""
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                />{' '}
                                Handshake
                            </Navbar.Brand>
                            <Navbar.Brand href="#home">
                                <Form inline>
                                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                                </Form>
                            </Navbar.Brand>
                            <Navbar.Collapse className="inner-navbar-container justify-content-end">

                                <Navbar.Text>
                                    <Nav.Link href="#home">Home</Nav.Link>
                                </Navbar.Text>
                                <Navbar.Text>
                                    <Nav.Link href="#features">Features</Nav.Link>
                                </Navbar.Text>
                                <Navbar.Text>
                                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                                </Navbar.Text>

                                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                                <ButtonToolbar className="signup"
                                // onClick={singUp()}
                                >
                                    <Link to="/student/signUp">  <Button variant="dark">Sign Up</Button></Link>

                                </ButtonToolbar>
                                <ButtonToolbar className="login"
                                // onClick={login()}
                                >
                                    <Link to="/student/login"> <Button variant="dark">Login</Button></Link>

                                </ButtonToolbar>
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

Header.propTypes = {

}

export default Header
