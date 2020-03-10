import React from 'react';

import { useSelector } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import Dashboard from 'container/Dashboard/Dashboard';
import Header from "common/Header/Header"
import Login from 'common/Authentication/Login'

const App = () =>{

  const isLoggednIn = localStorage.getItem('reactProIsLoggedIn') === null ? false : true  
  const {accessToken} =useSelector(state=>state.auth) 
  console.log("accessToken",accessToken);
  return (
    
      <div className='app-container'>
        <Header />
        <div className="main-container">
          <Route exact path="/" 
            render={() =>(
              isLoggednIn ? ( <Route  component={Dashboard} />)
            : (<Route component={Login} />)
          )} />
        </div>
        {/* <Footer /> */}
      </div>
   
  );
}

export default App;
