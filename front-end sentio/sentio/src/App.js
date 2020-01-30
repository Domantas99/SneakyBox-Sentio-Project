import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import 'node_modules\bootstrap\dist\css\bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Creation from './pages/creation/creation';
import About from './pages/about/about';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>

        <Switch>
          <Route exact path="/"><Home></Home></Route>
          <Route exact path="/creation"><Creation></Creation></Route>
          <Route exact path="/about"><About></About></Route>
        </Switch>
      
      </Router>
    </div>
  );
}

export default App;
