


import React from 'react'
import PropTypes from 'prop-types'
import {
    Container,
    Row,
    Col
} from 'react-bootstrap'

import './Header.scss';

import logo from "assets/logo/agreement.png";

const Header = props => {
    return (
        <div className="header-wrapper">
            <Container className="header-container">
                <Row>
                    <Col className="logo-container">
                        <div className="app-logo">
                            <img className="app-img" src={logo} />
                            <h1 className="app-title">Handshake</h1>
                        </div>
                        <div className="global-search"></div>
                    </Col>
                    <Col className="details-container"
                        xs={6}>2 of 2</Col>
                </Row>
            </Container>
        </div>
    )
}

Header.propTypes = {

}

export default Header

