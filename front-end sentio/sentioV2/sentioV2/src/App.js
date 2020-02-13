import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
// import { renderRoutes } from 'react-router-config';
import './App.scss';
import Databases from './views/MyPages/Databases/Databases';
import Navbar from './views/MyComponents/navbar/navbar';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

// Containers
const DefaultLayout = React.lazy(() => import('./containers/DefaultLayout'));

// Pages
const Login = React.lazy(() => import('./views/Pages/Login'));
const Register = React.lazy(() => import('./views/Pages/Register'));
const Page404 = React.lazy(() => import('./views/Pages/Page404'));
const Page500 = React.lazy(() => import('./views/Pages/Page500'));

class App extends Component {
  // su props paduoda ir app.js kintamuosius
  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading()}>
            {/* <Navbar></Navbar> */}
            <Switch>
             
              <Route exact path="/" name="Login Page"><Login></Login></Route>
              <Route exact path="/register" name="Register Page"><Register/></Route>
             


              <Route exact path="/databases" name="Databases" ><Databases></Databases></Route>
              <Route exact path="/databases/:dbId" name="Databases" ><Databases></Databases></Route>
        


              {/* <Route path ="" render={props => <Navbar {...props}/>}/> */}
              {/* <Route exact path="/" name="Login Page" render={props => <Login {...props}/>} /> */}
              {/* <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} /> */}
              {/* <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} /> */}
              {/* <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
              {/* <Route exact path="/databases" name="Databases" render={props => <Databases {...props}/>}/> */}
              {/* <Route path="/" name="Home" render={props => <DefaultLayout {...props}/>} /> */}
            </Switch>
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
