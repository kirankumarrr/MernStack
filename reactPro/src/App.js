import React from 'react';

import { useSelector } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.scss';
import Dashboard from 'container/Dashboard/Dashboard';
import Header from "common/Header/Header"
import Login from 'common/Authentication/Login'
import SingUp from 'common/Authentication/SignUp/SignUp';
import NavBar from 'common/NavBar/NavBar';
const App = () =>{

  let isLoggednIn;
  const {accessToken} =useSelector(state=>state.auth) 

  //jwtToken
  var ab = document.cookie.split(';').filter(ele=>ele.startsWith('jwtToken'));
  if(ab.length>0){
    isLoggednIn =  true  
  }else{
    isLoggednIn = false
  }
  console.log("accessToken",accessToken);
  return (
    
      <div className='app-container'>
        <NavBar />
        <main>
        <div className="main-container">
          <Route exact path="/" 
            render={() =>(
              isLoggednIn ? ( <Route  component={Dashboard} />)
            : (<Route component={Login} />)
          )} />
        </div>
        <Route exact path="/signup" component={SingUp} />
        </main>
        {/* <Footer /> */}
      </div>
   
  );
}

export default App;
