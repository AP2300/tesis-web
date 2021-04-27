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
        height: "16vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2%",
        "& > .AFC":{
            display: "flex"
        }
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
        zIndex: 10,
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
        opacity: 0,
        marginLeft: "-15vw",
        borderRadius: "2em",
        transition: "200ms ease-in",
        display: "flex",
        alignItems: "center",
        paddingLeft: "16vw",
        paddingRight: "5%",
        paddingTop: "-3%"
    },
    ExpandedContainer: {
        width: "71vw",
        borderRadius: "2em",
        transition: "200ms ease-in",
        display: "flex",
        alignItems: "center",
        opacity: 1,
        zIndex: 1,
        [sizes.Wdown("xs")]: {
            width: "66vw",
        },
    },
    panelContainer: {
        height: "64vh",
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
        padding: "0",
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
    },
    iconContainer:{
        display: "flex",
        alignItems: "center",
        [sizes.Wdown("xs")]: {
            flexDirection: "column"
        },
    },
    formControl:{
        width: "100%",
        height: "3vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "15px",
        opacity: 0,
        transition: "300ms ease-in",
        "& > .MuiFormControl-root":{
            width: "8vw"
        },
        "& > .MuiFormControl-root.timestamp":{
            width: "15vw"
        }
    },
    show:{
        opacity: 1
    }
}));