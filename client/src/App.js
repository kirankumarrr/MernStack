import React from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import NavBar from 'common/NavBar/NavBar';
import { Footer } from 'common/Footer/Footer';
import Cards from 'container/Cards/Cards';
const App = () => {

  return (
    <div className="app-container">
      <NavBar />
      <main>
        <Route exact path="/" component={Cards} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
