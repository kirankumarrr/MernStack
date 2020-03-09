import React from 'react';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from 'store';

import './App.scss';
import Dashboard from 'container/Dashboard/Dashboard';
import Header from "common/Header/Header"
import Login from 'common/Authentication/Login'
import StudentRegister from 'container/Auth/StudentRegister/StudentRegister';

const App = () =>{

  const isLoggednIn = localStorage.getItem('reactProIsLoggedIn') === null ? false : true

  console.log("isLoggednIn",isLoggednIn);
  return (
    <Provider store={configureStore()}>
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
    </Provider>
  );
}

export default App;
