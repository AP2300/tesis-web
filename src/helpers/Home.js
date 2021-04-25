import Profile from "../views/Profile/Profile";
import DashBoard from "../views/DashBoard/DashBoard";
import History from "../views/History/History"
import Security from "../views/Security/Security"
import { useLocation } from "react-router";

 export function PageSelector(userData, SearchData){
    const location = useLocation();
    switch(location.pathname){
      case "/dashboard":
        return <DashBoard />;
      case "/home/profile":
        return <Profile Data={userData}/>;
      case "/home/profile/admin":
        return <Profile Data={userData}/>;
      case "/home/history":
        return <History/>
        case "/home/security":
        return <Security/>
      default: 
        return <DashBoard/>;
    };
  }

  export function otherPage(e){
    switch(e.target.outerText) {
      case "Panel Principal": return("/home");
      case "Panel Personal": return("/home/profile");
      case "Historial": return("/home/history");
      case "Seguridad": return("/home/security");
      default : return("/home");
    }
  }