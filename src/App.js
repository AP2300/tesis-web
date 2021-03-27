import './App.css';
import {Redirect, Route, Switch} from "react-router-dom"
import Home from './Home';
import Login from './Login';

function App() {
  return (
    <div >
      <Switch>
        <Route exact path="/" render={()=> <Login/>}/>
        <Route exact path="/dashboard" render={()=> <Home/>}/>
      </Switch>
    </div>
  );
}

export default App;