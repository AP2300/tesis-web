import { Route, Switch } from "react-router-dom"
import Home from './components/Home';
import Login from './views/Login/Login';
// import Profile from './views/Profile'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <Route exact path="/dashboard" render={(routeprops) => <Home {...routeprops} />} />
        <Route exact path="/profile" render={(routeprops) => <Home {...routeprops} />} />
        {/* <Route exact path="/profile" render={() => <Profile/>}/> */}
      </Switch>
    </div>
  );
}

export default App;
