import Profile from "../views/Profile/Profile";
import DashBoard from "../views/DashBoard/DashBoard";
import History from "../views/History/History"
import { useLocation } from "react-router";

 export function PageSelector(userData, SearchData){
    const location = useLocation();
    console.log(location.pathname);
    switch(location.pathname){
      case "/dashboard":
        return <DashBoard />;
      case "/home/profile":
        return <Profile Data={userData}/>;
      case "/profile/info":
        return <Profile Data={userData}/>;
      case "/profile/admin":
        return <Profile Data={userData}/>;
      case "/home/history":
        return <History/>
      default: 
        return <DashBoard/>;
    };
  }

  export function otherPage(e){
    switch(e.target.outerText) {
      case "Panel Principal": return("/home");
      case "Panel Personal": return("/home/profile");
      case "Historial": return("/home/history");
      default : return("/home");
    }
  }