import Profile from "../views/Profile/Profile";
import DashBoard from "../views/DashBoard/DashBoard";
import History from "../views/History/History";
import Security from "../views/Security/Security"
import { useLocation } from "react-router";
import HistoryUser from "../views/HistoryUser/HistoryUser";
import AdminSecurity from "../views/AdminSecurity/AdminSecurity";
import { isObject } from "lodash";

export function PageSelector(userData, SearchData) {
  const location = useLocation();
  switch (location.pathname) {

    case "/dashboard":
      return <DashBoard />;

    case "/home/profile":
      return <Profile Data={userData} />;

    case "/home/history":
      return <HistoryUser />

    case "/admin/history":
      return <History />

    case "/home/security":
      return <Security Data={userData} />

    case "/admin/security":
      return <AdminSecurity />;

    default:
      return <DashBoard />;
  };
}

export function otherPage(e) {
  let route = "";
  if (isObject(e)) route = e.target.outerText;
  else route = e;
  switch (route) {
    case "Panel Principal": return ("/home");
    case "Panel Personal": return ("/home/profile");
    case "Historial": return ("/home/history");
    case "Seguridad": return ("/home/security");
    case "Administrar seguridad": return ("/admin/security");
    case "Historial global": return ("/admin/history");
    default: return ("/home");
  }
}