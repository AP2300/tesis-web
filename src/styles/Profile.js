import { makeStyles } from '@material-ui/core/styles';
import sizes from "./sizes";

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: "10px",
      '& > *': {
        margin: "2%",
        width: "25%",
        height: theme.spacing(16),
        boxShadow: "3px 3px 4px 1px #00000052"
      },
          "& GraphBox" :{
          },
      justifyContent: "center",
    },
    avatar: {
        position: "absolute",
        height: "15vmax",
        width: "15vmax",
        overflow: "visible",
        boxShadow: "2px 2px 3px rgba(0,0,0,0.45)",
    },
    username: {
        display: 'flex',
        position: "absolute",
        top: "13vmax",
        width: "15vmax",
        height: "3vmax",
        borderRadius: "40px",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "3px 3px 4px 1px #00000052"
    },
    GraphBox: {
        position: "absolute",
        width: "75vmax",
        height: "75vh",
        top: "5vmax",
        left: "22vmax",
        [sizes.Wdown("sm")]:{
            width: "62vmin",
        }
    },
    container_avatar:{
        margin: theme.spacing(2),
        width: "15vmax",
        height: "15vmax",
        position: "absolute", 
        top: "14vh",
        left: "2vw",
        zIndex: "0",
        boxShadow: "none",
    },
    container_buttons:{
        margin: theme.spacing(2),
        width: "15vmax",
        height: "15vmax",
        position: "absolute", 
        top: "55vmin",
        left: "1vw",
        zIndex: "0",
        boxShadow: "none"
    },
    button_Edit: {
        background: "white",
        position: "absolute",
        left: "1vw",
        width: "15vmax",
        height: "3vmax",
        borderRadius: "40px",
        zIndex: "10",
        boxShadow: "3px 3px 4px 1px #00000052"
    },
    button_idk: {
        background: "white",
        position: "absolute",
        top: "15vmin",
        left: "1vw",
        width: "15vmax",
        height: "3vmax",
        borderRadius: "40px",
        boxShadow: "3px 3px 4px 1px #00000052"
    },
    typography: {
        fontWeight: 600,
        fontSize: "1.1vmax",
        marginLeft: "1rem",
    },
  }));