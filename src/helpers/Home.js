import Profile from "../views/Profile/Profile";
import DashBoard from "../views/DashBoard/DashBoard";
import { useLocation } from "react-router";

 export function PageSelector(userData){
    const location = useLocation();
    switch(location.pathname){
      case "/dashboard":
        return <DashBoard />;
      case "/profile":
        return <Profile Data={userData}/>;
      default: 
        return <DashBoard/>;
    };
  }

  export function otherPage(e){
    switch(e.target.outerText) {
      case "Panel Principal": return("/dashboard");
      case "Panel Personal": return("/profile");
      default : return("/dashboard");
    }
  }