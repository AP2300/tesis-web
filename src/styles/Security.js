import { makeStyles } from '@material-ui/core/styles';
import sizes from "./sizes";

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: "2%",
        marginRight: "2%",
        "& > *":{
            color: "#5f5f5f"
        }
    },
    mainContainer:{
        marginTop: "-10px",
        width: "100vw",
        height: "82.5vh",
        display: "flex",
        flexWrap: "wrap",
        overflowY: "scroll",
        justifyContent: "flex-end",
        overflowX: "hidden"
    },
    leftContainer:{
        display: "flex",
        flexDirection: "column",
        width: "37%",
        minHeight: "40vh",
        minWidth: "295px",
        flexGrow: 1
    },
    rightContainer:{
        width: "63%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexGrow: 1,
        flexDirection: "column",
        minWidth: "277px",
        height: "100%",
        padding: "0 2% 0 2%",
        "& > .MuiTypography-root.MuiTypography-h4.MuiTypography-alignCenter .MuiDivider-flexItem":{
            height: "1px"
        }
    },
    Code:{
        padding: "6% 3% 2% 3%",
        display: "flex",
        flexDirection: "column",
        minWidth: "33.2vw",
        height: "28vh",
        minHeight: "190px",
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        "& > *":{
            color: "#5f5f5f"
        },
        "& > .Text":{
            fontSize: "calc(25px + (50 - 25) * ((25vw - 303px) / (1600 - 300)))",
        }
    },
    faceModel:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "column",
        minWidth: "33.2vw",
        minHeight: "45vh",
        flexGrow: 1,
        "& > .Text":{
            color: "#5f5f5f",
            fontSize: "calc(25px + (50 - 25) * ((20vw - 303px) / (1600 - 300)))",
        }
    },
    CodeNumber:{
        fontSize: "calc(25px + (90 - 25) * ((90vw - 1px) / (1600 - 300)))",
        fontWeight: "600"
    },
    img: {
        width: "100%",
        height: "25vmin",
        maxWidth: "220px",
        minWidth: "50px",
        maxHeight: "190px",
        minHeight: "200px",
    },
    fingerContainer:{
        width: "100%",
        height: "60%",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    chip:{
        display: "flex",
        backgroundColor: "#ff9800",
        color: "whitesmoke",
        fontWeight: "600",
        padding: "1%",
         "& > *":{
            color: "whitesmoke",
         }
    },
    Buttons:{
        display: "flex",
        width: "18vw" ,
        height: "26vh",
        marginLeft: "3%",
        justifyContent: "center",
        flexGrow: 1
    },
    fingerBox:{
        display: "flex",
        width: "60%",
        height: "100%",
        minWidth: "300px",
        flexGrow: 1
    }
}));