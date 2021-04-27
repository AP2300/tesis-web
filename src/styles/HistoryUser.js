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
            color: "#5f5f5f"
        }
    },
    mainContainer: {
        width: "100%",
        height: "80vh"
    },
    ButtonDiv: {
        width: "100%",
        height: "13vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2%"
    },
    ExpandibleButton: {
        height: "7vh",
        width: "15vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(10px + (40 - 10) * ((60vw - 303px) / (1600 - 300)))",
        fontWeight: "800",
        color: "#5f5f5f",
        cursor: "pointer",
        transition: "200ms ease-in",
        fontFamily: "Century Gothic",
        letterSpacing: "1.3px",
        borderRadius: "2em",
        "&:hover": {
            color: "whitesmoke",
            backgroundColor: "#565656"
        },
        "& > * ": {
            fontSize: "1.2em",
        }
    },
    ExpandibleContainer: {
        width: "0",
        borderRadius: "2em",
        transition: "250ms ease-in"
    },
    ExpandedContainer: {
        width: "85%",
        borderRadius: "2em",
        transition: "250ms ease-in"
    },
    panelContainer: {
        height: "67vh",
        padding: "2%",
        display: "flex",
        overflowY: "scroll",
        justifyContent: "space-between",
        [sizes.Wdown("xs")]: {
            flexDirection: "column",
        },
    },
    maximizedContainer: {
        width: "85%",
        height: "100%",
        transition: "250ms ease-in",
        color: "inherit",
        [sizes.Wdown("xs")]: {
            height: "85%",
            width: "100%"
        },
    },
    minimizedContainer: {
        width: "8%",
        height: "100%",
        transition: "250ms ease-in",
        color: "inherit",
        [sizes.Wdown("xs")]: {
            height: "8%",
            width: "100%"
        },
    },
    minimizerButton: {
        width: "5%",
        color: "inherit",
        [sizes.Wdown("xs")]: {
            height: "5%",
            width: "100%",
            "& .icon":{
                transform: "rotate(90deg)"
            }
        },
    },
    dataContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
}));