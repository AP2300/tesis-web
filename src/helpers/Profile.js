import { useLocation } from "react-router";
import Admin from '../views/Profile/Admin';

export function ChangeOption(userData) {
    const location = useLocation();
    switch(location.pathname){
        case "/profile/admin": return <Admin/>;
    };
}

export function otherPage(e){
    console.log(e)
    console.log(e.target.outerText)
    switch(e.target.outerText) {
      case "EDITAR PERFIL": return("/profile/admin");
      case "VISUALIZAR DATOS": return("/profile/info");
      default : return("/profile/info");
    }
}