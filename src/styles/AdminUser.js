import { makeStyles } from '@material-ui/core/styles';
import sizes from "./sizes";

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
    "@keyframes loading ": {
        " 0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" }
    },

    loading: {
        animationName: '$loading',
        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
        backgroundSize: "400% 400%",
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        color: "transparent",
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: "2%",
        marginRight: "2%",
        "& > *": {
            color: "#4f4f4f"
        }
    },
    mainContainer:{
        width: "100%",
        height: "80vh"
    },
    panelContainer: {
        height: "80vh",
        width: "100%",
        padding: "2%",
        display: "flex",
        [sizes.Wdown("md-sm")]: {
            flexDirection: "column",
        },
    },
    minimizerButton:{
        width: "5%",
        [sizes.Wdown("md-sm")]: {
            width: "auto",
            "& .icon": {
                transform: "rotate(90deg)"
            }
        },
    },
    UserList:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0.1%",
        width: "30%",
        height: "100%",
        transition: "200ms ease-in",
        "& .Title":{
            color: "#4c4c4c",
            fontSize: "2em"
        },
        "& .divider":{
            marginBottom: "4%"
        },
        "& .acordion":{
            color: "#4c4c4c",
            boxShadow:" 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)"
        },
        [sizes.Wdown("md-sm")]: {
            width: "auto"
        },
    },
    UserListMinimized:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "7%",
        transition: "250ms ease-out",
        [sizes.Wdown("md-sm")]: {
            height: "12%",
            width: "100%"
        },
    },
    dataContainer:{
        display: "flex",
        flexDirection:"column",
        alignContent: "center",
        justifyContent: "center",
        height: "100%",
        flexGrow: 1,
        [sizes.Wdown("md-sm")]: {
           height: "2000px"
        },
    },
    UpperContainer:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "25%",
        "& .name":{
            fontSize: "calc(12px + (38 - 12) * ((90vw - 303px) / (1600 - 300)))",
            fontWeight: "600"
        },"& .code":{
            fontSize: "calc(12px + (38 - 12) * ((90vw - 303px) / (1600 - 300)))",
            fontWeight: "600"
        },"& .EmailType":{
            fontSize: "calc(12px + (24 - 10) * ((70vw - 303px) / (1600 - 300)))",
        },
        "& > *":{
            color: "#4f4f4f"
        }
    },
    BottomContainer:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        height: "75%",
        flexWrap: "wrap",
        [sizes.Wdown("md-sm")]: {
            padding: "2%",
            overflowY: "scroll",
        },
        [sizes.Wdown("lg")]: {
            padding: "2%",
            overflowY: "scroll",
        },

    },
    LeftContainer:{
        display: "flex",
        width: "45%",
        minWidth: "300px",
        height: "95%",
        [sizes.Wdown("sm")]: {
            flexGrow: 1,
            marginBottom: "3%"
         },
         [sizes.Wdown("lg")]: {
            flexGrow: 1,
            marginBottom: "3%"
         },
    },
    RightContainer:{
        display: "flex",
        width: "45%",
        minWidth: "300px",
        height: "95%",
        [sizes.Wdown("sm")]: {
            flexGrow: 1,
            marginBottom: "3%"
         },
         [sizes.Wdown("lg")]: {
            flexGrow: 1,
            marginBottom: "3%"
         },
    }
}));