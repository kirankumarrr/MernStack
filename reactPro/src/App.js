import React from 'react';

import { Provider } from 'react-redux';
import { Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from 'store';

import './App.scss';
import Dashboard from 'container/Dashboard/Dashboard';
import Header from "common/Header/Header"
import StudentRegister from 'container/Auth/StudentRegister/StudentRegister';

function App() {
  return (
    <Provider store={configureStore()}>
      <div className='app-container'>
        <Header />
        <div className="main-container">
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/student/signUp" component={StudentRegister} />
          </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    </Provider>
  );
}

export default App;
