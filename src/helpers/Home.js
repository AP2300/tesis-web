import { Route, Switch } from "react-router-dom"
import Profile from "../views/Profile/Profile";
import DashBoard from "../views/DashBoard/DashBoard";
import History from "../views/History/History";
import Security from "../views/Security/Security"
import { useHistory, useLocation } from "react-router";
import HistoryUser from "../views/HistoryUser/HistoryUser";
import AdminSecurity from "../views/AdminSecurity/AdminSecurity";
import AdminUser from "../views/AdminUser/AdminUser"

export function PageSelector(userData) {
  const user = userData;
  return (
    <Switch>
      <Route exact path="/home" render={() => <DashBoard UserData={user} />} />
      <Route path="/home/profile" render={(routeprops) => <Profile {...routeprops} Data={user} />} />
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
      return "Administar usuarios";

    default:
      return "Panel Principal";
  };
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
