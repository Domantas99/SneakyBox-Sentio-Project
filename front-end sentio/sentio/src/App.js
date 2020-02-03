import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
// import 'node_modules\bootstrap\dist\css\bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import { connect } from 'react-redux';

import Navbar from './components/navbar/navbar';
import Home from './pages/home/home';
import Creation from './pages/creation/creation';
import About from './pages/about/about';

import { updateConnectionStr } from './services/redux/actions/connectionStr-actions';

class App extends Component {
  constructor(props) {
    super(props)
    this.onUpdateConnStr = this.onUpdateConnStr.bind(this);
  }
 
  onUpdateConnStr(event) {
    //this.props.onUpdateConnStr(event.target.value);
   // console.log(event.target.value);
   // console.log(this.props.onConnStrUpdate);
    this.props.onConnStrUpdate(event.target.value)
  }


  render(){
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
      <div onClick={this.updateConnectionStr}>Update connStr</div>

      <input onChange={this.onUpdateConnStr}></input>
      {this.props.connectionStr}
    </div>

  );
}
}
const mapStateToProps = state => ({
  tables: state.tables,
  connectionStr: state.connectionStr

});

const mapActionsToProps = {
  onConnStrUpdate: updateConnectionStr
}

export default connect(mapStateToProps, mapActionsToProps) (App);
