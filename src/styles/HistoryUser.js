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
        "& > .AFC": {
            display: "flex"
        }
    },
    ExpandibleButton: {
        height: "59px",
        minWidth: "156px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(21px + (30 - 21) * ((50vw - 303px) / (1600 - 300)))",
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
            fontSize: "1.7em",
        }
    },
    ExpandibleContainer: {
        width: "0",
        opacity: 0,
        marginLeft: "-156px",
        borderRadius: "2em",
        transition: "200ms ease-in",
        display: "flex",
        alignItems: "center",
        paddingLeft: "15vw",
        paddingRight: "6%",
        [sizes.Wdown("md")]: {
            marginBottom: "-240px",
            // marginLeft: "-155px"
        },
    },
    ExpandedContainer: {
        width: "71vw",
        borderRadius: "2em",
        transition: "200ms ease-in",
        display: "flex",
        alignItems: "center",
        opacity: 1,
        zIndex: 1,
        [sizes.Wdown("md")]: {
            height: "330px",
            width: "232px",
            flexDirection: "column",
            paddingTop: "28%",
            paddingLeft: "4%"
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
        }
    },
    overflowContainer: {
        overflowX: "scroll"
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
            "& .icon": {
                transform: "rotate(90deg)"
            }
        },
    },
    dataContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    iconContainer: {
        display: "flex",
        alignItems: "center",
        [sizes.Wdown("xs")]: {
            flexDirection: "column"
        },
    },
    formControl: {
        display: "none",
        height: "3vh",
        alignItems: "center",
        justifyContent: "space-between",
        opacity: 0,
        "& > .MuiFormControl-root": {
            width: "8vw"
        },
        "& > .MuiFormControl-root.timestamp": {
            width: "15vw"
        },
        [sizes.Wdown("md")]: {
            flexDirection: "column",
            "& > .MuiFormControl-root": {
                width: "180px"
            },
            "& > .MuiFormControl-root.timestamp": {
                width: "180px"
            },
        },
    },
    show: {
        opacity: 1,
        display: "flex",
        width: "100%"
    },
    message: {
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        "&& > *": {
            fontSize: "2em"
        },
        [sizes.Wdown("xs")]: {
            margin: "12%"
        }
    },
    selectedChart: {
        "& > *": {
            background: "linear-gradient(348deg, rgba(41,86,181,0.8603816526610644) 0%, rgba(122,188,186,0.8743872549019608) 48%, rgba(134,237,105,0.8687850140056023) 100%);",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
        },
        // background: "-webkit-gradient(linear, left top, left bottom, from(#f00), to(#333))",
        // "-webkit-background-clip": "text",
        //  "-webkit-text-fill-color": "transparent",

    }
}));