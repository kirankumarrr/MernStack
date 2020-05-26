import React from 'react'
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";
import './Button.scss'

const Button = props => {
    return (
        <Link to={props.path} className={`btn ${props.className}`}>
           
            {props.text}
          
                <span></span>
                <span></span>
                <span></span>
                <span></span>
        </Link>
    )
}

Button.propTypes = {

}

export default Button
