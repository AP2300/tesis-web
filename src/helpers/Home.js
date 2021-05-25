import { Route, Switch } from "react-router-dom"
import Profile from "../views/Profile/Profile";
import DashBoard from "../views/DashBoard/DashBoard";
import History from "../views/History/History";
import Security from "../views/Security/Security"
import HistoryUser from "../views/HistoryUser/HistoryUser";
import AdminSecurity from "../views/AdminSecurity/AdminSecurity";
import AdminUser from "../views/AdminUser/AdminUser"
import LoadingComp from "../components/Loading";



export function PageSelector(userData) {
  const user = userData;
  return (
    <Switch>
      <Route exact path="/home" render={() => <DashBoard UserData={user} />} />
      <Route path="/home/profile" render={(routeprops) => <Profile {...routeprops} Data={user} />} />
      <Route path="/home/history" render={(routeprops) => <HistoryUser {...routeprops} User={user} />} />
      <Route path="/home/security" render={(routeprops) => <Security {...routeprops} Data={user} />} />

      <Route path="/admin/history" render={(routeprops) =>{return(user.IsAdmin ? <History {...routeprops} />: <LoadingComp/>)}} />
      <Route exact path="/admin/security" render={(routeprops) => {return(user.IsAdmin ? <AdminSecurity {...routeprops} />: <LoadingComp/>)}} />
      <Route path="/admin/security/:id" render={(routeprops) =>{ return(user.IsAdmin ? <AdminSecurity {...routeprops} />: <LoadingComp/>)}} />
      <Route path="/admin/users" render={(routeprops) => {return(user.IsAdmin ? <AdminUser {...routeprops} />: <LoadingComp/>)}} />
      <Route path="/" render={() => <DashBoard UserData={user} />} />
    </Switch>
  )
}

export function SelectPage(location) {
  switch (location.pathname) {
    case "/home":
      return "Panel Principal";

    case "/home/profile":
      return "Panel Personal";

    case "/home/history":
      return "Historial";

    case "/admin/history":
      return "Historial global";

    case "/home/security":
      return "Seguridad";

    case "/admin/security":
      return "Administrar seguridad";

    case "/admin/users":
      return "Administrar usuarios";

    default:
      return "Panel Principal";
  };
}


export function otherPage(route) {
  switch (route) {
    case "Panel Principal": return ("/home");
    case "Panel Personal": return ("/home/profile");
    case "Historial": return ("/home/history");
    case "Seguridad": return ("/home/security");
    case "Administrar seguridad": return ("/admin/security");
    case "Historial global": return ("/admin/history");
    case "Administrar usuarios": return ("/admin/users")
    default: return ("/home");
  }
}
