import { Route, Switch } from "react-router-dom"
import Profile from "../views/Profile/Profile";
import DashBoard from "../views/DashBoard/DashBoard";
import History from "../views/History/History";
import Security from "../views/Security/Security"
import { useHistory, useLocation } from "react-router";
import HistoryUser from "../views/HistoryUser/HistoryUser";
import AdminSecurity from "../views/AdminSecurity/AdminSecurity";
import AdminUser from "../views/AdminUser/AdminUser"

export function PageSelector(userData, SearchData) {
  const location = useLocation();
  const history = useHistory()
  const user = userData;
  return (
    <Switch>
      <Route exact path="/home" render={() => <DashBoard />} />
      <Route path="/home/profile" render={(routeprops) => <Profile {...routeprops} Data={user}/>} />
      <Route path="/home/history" render={(routeprops) => <HistoryUser {...routeprops} User={user} />} />
      {user.IsAdmin ? (
        <Route path="/admin/history" render={(routeprops) => <History {...routeprops} />} />
      ) : null}
      <Route path="/home/security" render={(routeprops) => <Security {...routeprops} Data={user} />} />
      {user.IsAdmin ? (
        <Route exact path="/admin/security" render={(routeprops) => <AdminSecurity {...routeprops} />} />
      ) : null}
      {user.IsAdmin ? (
      <Route path="/admin/security/:id" render={(routeprops) => <AdminSecurity {...routeprops} />} />
      ) : null}
      {user.IsAdmin ? (
        <Route path="/admin/users" render={(routeprops) => <AdminUser {...routeprops} />} />
      ) : null}
      <Route path="/" render={() => <DashBoard />} />
    </Switch>
  )
  
  /*
  switch (location.pathname) {

    case "/dashboard":
      return <DashBoard />;

    case "/home/profile":
      return <Profile Data={userData} />;

    case "/home/history":
      return <HistoryUser User={userData} />

    case "/admin/history":
      if (userData.IsAdmin) return <History />
      else return history.push("/home")

    case "/home/security":
      return <Security Data={userData} />

    case "/admin/security":
      if (userData.IsAdmin) return <AdminSecurity />;
      else return history.push("/home")

    case "/admin/users":
      if (userData.IsAdmin) return <AdminUser />;
      else return history.push("/home")

    default:
      return <DashBoard />;
  };*/
}

// export function otherPage(e) {
//   let route = "";
//   if (isObject(e)) route = e.target.outerText;
//   else route = e;
//   switch (route) {
//     case "Panel Principal": return ("/home");
//     case "Panel Personal": return ("/home/profile");
//     case "Historial": return ("/home/history");
//     case "Seguridad": return ("/home/security");
//     case "Administrar seguridad": return ("/admin/security");
//     case "Historial global": return ("/admin/history");
//     default: return ("/home");
//   }

export function otherPage(route) {
  switch (route) {
    case "Panel Principal": return ("/home");
    case "Panel Personal": return ("/home/profile");
    case "Historial": return ("/home/history");
    case "Seguridad": return ("/home/security");
    case "Administrar seguridad": return ("/admin/security");
    case "Historial global": return ("/admin/history");
    case "Administar usuarios": return ("/admin/users")
    default: return ("/home");
  }
}
