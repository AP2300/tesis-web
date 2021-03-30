import './App.css';
import {Redirect, Route, Switch} from "react-router-dom"
import Home from './Home';
import Login from './Login';
import Profile from './Profile'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={()=> <Login />}/>
        <Route exact path="/dashboard" render={(routeprops)=> <Home {...routeprops}/>}/>
        <Route exact path="/profile" render={(routeprops)=> <Home {...routeprops}/>}/>
      </Switch>
    </div>
  );
}

export default App;
