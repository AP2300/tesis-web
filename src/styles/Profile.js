import { makeStyles} from '@material-ui/core/styles';
import sizes from "./sizes";

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > *': {
        boxShadow: "3px 3px 4px 1px #00000052"
      },
          "& GraphBox" :{
          },
      justifyContent: "center",
    },
    avatar: {
        height: "100%",
        minWidth: "5vmax",
        minHeight: "5vmax",
        width: "100%",
        overflow: "visible",
        boxShadow: "2px 2px 3px rgba(0,0,0,0.45)",
    },
    username: {
        display: 'flex',
        position: "relative",
        top: "-1vmax",
        left:"-40%",
        width: "180%",
        height: "4vmin",
        borderRadius: "40px",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "3px 3px 4px 1px #00000052"
    },
    GraphBox: {
        width: "95vmax",
        height: "60vh",
        alignSelf: "center",
        [sizes.Wdown("sm")]:{
            width: "90vmax",
        },
    },
    container:{
        display: "flex",
        position: "relative", 
        height: "15vmin",
        top: "-2vh",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "none",
        textAlign: "-webkit-center",
        margin: theme.spacing(3),
    },
    container_avatar:{
        width: "22vmin", 
        position: "relative",
        margin: "0",
        boxShadow: "none",
    },
    container_buttons:{
        margin: theme.spacing(2),
        position: "relative",
        width: "60vmin",
        top: "2.5vh",
        left: "5vmin",
        boxShadow: "none",
    },
    btn_info: {
        background: "white",
        width: "52vmin",
        height: "5vmin",
        position: "relative",
        top: "-3vmin",
        borderRadius: "40px",
        boxShadow: "3px 3px 4px 1px #00000052"
    },
    btn_edit: {
        background: "white",
        width: "52vmin",
        height: "5vmin",
        position: "relative",
        left: "vw",
        borderRadius: "40px",
        boxShadow: "3px 3px 4px 1px #00000052"
    },
    typography: {
        fontWeight: 600,
        fontSize: "calc(15px + (24 - 15) * ((20vw - 303px) / (1600 - 300)))",
    },
  }));