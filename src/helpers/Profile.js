import { useLocation } from "react-router";
import Admin from '../views/Profile/Admin';
import Info from '../views/Profile/Info';

export function ChangeOption(userData) {
    const location = useLocation();
    switch(location.pathname){
        case "/home/profile/admin": return <Admin Data={userData}/>;
        case "/home/profile/info": return <Info Data={userData}/>;
    };
}

export function otherPage(e){
    switch(e.target.outerText) {
      case "EDITAR": return("/home/profile/admin");
      case "VISUALIZAR": return("/home/profile/info");
      default : return("/home/profile/info");
    }
}