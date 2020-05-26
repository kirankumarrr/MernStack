import React from 'react'
import PropTypes from 'prop-types';

import './HomePage.scss'
import Button from 'common/Button/Button'
const HomePage = props => {

    return (
        <div className='homepage' id='homepage'>
           <div className="jumbotron jumbotron-fluid">
            <div className="container">
                <h1 className="display-4">Flyhigh Developer</h1>
                <p className="lead">This is a modified jumbotron that occupies the entire horizontal space of its parent.</p>
            </div>
            <div className="button-container">
                <Button  text='Singup' path='/signUp' className='signUp common-btn' />
                <Button  text='Login' path='/signIn' className='login common-btn' />
            </div>
        </div>
        </div>
    )
}

HomePage.propTypes = {

}

export default HomePage
