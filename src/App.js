import { Route, Switch } from "react-router-dom"
import Home from './components/Home';
import Login from './views/Login/Login';
import AdminDial from "./components/AdminDial"
// import Profile from './views/Profile'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <Route exact path="/dashboard" render={(routeprops) => <Home {...routeprops} />} />
        <Route path="/profile" render={(routeprops) => <Home {...routeprops} />} />
        <Route path="/home" render={(routeprops) => <Home {...routeprops} />} />
        <Route path="/admin" render={(routeprops) => <Home {...routeprops} />} />
      </Switch>
    </div>
  );
}

export default App;
