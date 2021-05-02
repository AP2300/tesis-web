import { makeStyles } from '@material-ui/core/styles';
import sizes from "./sizes";

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
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
        height: "100%",
        display: "flex",
        [sizes.Wdown("xs")]: {
            flexDirection: "column",
        },
    },
    // panelContainer: {
    //     height: "80vh",
    //     padding: "2%",
    //     width: "92vw",
    //     display: "flex",
    //     justifyContent: "space-between",
    //     [sizes.Wdown("xs")]: {
    //         flexDirection: "column",
    //     },
    // },
    minimizerButton: {
        width: "5%",
        color: "inherit",
        [sizes.Wdown("xs")]: {
            height: "5%",
            width: "100%",
            "& .icon": {
                transform: "rotate(90deg)"
            }
        },
    },
    maximizedContainerUsers: {
        width: "30%",
        height: "100%",
        transition: "250ms ease-in",
        color: "inherit",
        [sizes.Wdown("xs")]: {
            height: "85%",
            width: "100%"
        },

    },
    maximizedContainerSecurity: {
        width: "86%",
        height: "100%",
        transition: "250ms ease-in",
        color: "inherit",
        [sizes.Wdown("xs")]: {
            height: "85%",
            width: "100%"
        },

    },
    minimizedContainerUsers: {
        width: "8%",
        height: "100%",
        transition: "250ms ease-in",
        color: "inherit",
        [sizes.Wdown("xs")]: {
            height: "8%",
            width: "100%"
        },
    },
    minimizedContainerSecurity: {
        width: "64%",
        height: "100%",
        transition: "250ms ease-in",
        color: "inherit",
        [sizes.Wdown("xs")]: {
            height: "8%",
            width: "100%"
        },
    },
    logo: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    dataContainer: {
        display: "flex",
        padding: "2% 0 2% 2%",
    },
    dataContainerSec: {
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        height: "100%"
    },
    List: {
        display: "flex",
        flexDirection: "column",
        height: "55vh",
        overflowY: "scroll",
        alignItems: "flex-start",
        paddingRight: "1em"
    },
    ListItem: {
        width: "15em",
        padding: "0.5rem 1rem",
        marginTop: "0.5rem",
        color: "#000000a6",
        display: "flex",
        flexDirection: "row",
        borderRadius: "1rem",
        fontSize: "2.2vmin"
    },
    listItemText: {
        fontWeight: "600",
        fontSize: `calc(18px + (30 - 18) * ((40vw - 320px) / (1600 - 300)))`
    },
    active: {
        backgroundColor: "#0000001a"
    },
    userSecHeader: {
        display: "flex",
        justifyContent: "center", 
        flexDirection: "column", 
        alignItems: "center", 
        padding: "1em 0em 0em 0em",
    },
    userTitle: {
        fontSize: "calc(1em + 1vw)" 
    },
    userCode: {
        fontSize: "calc(0.7em + 0.7vw)" 
    },
    motherContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "stretch",
        height: "83%"
    },
    facialContainer: {
        color: "inherit",
        width: "50%",
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0rem 1rem",
        flexBasis: "60em"
    },
    photoTitle: {
        fontSize: "calc(0.8em + 0.8vw)", 
        margin: "0.3em 0",
        textAlign: "center"
    },
    faceAvatar: {
        width: "9rem",
        height: "9rem"
    },
    photoButtonGroup: {
        display: "flex", 
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-evenly", 
        width: "100%"
    },
    fingerContainer: {
        color: "inherit",
        width: "50%",
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0rem 1rem",
        flexBasis: "100em"
    },
    fingerTitle: {
        fontSize: "calc(0.8em + 0.8vw)",
        margin: "0.3em 0"
    },
    fingerInfoContainer: {
        overflowY: "scroll", 
        width: "100%"
    },
    fingerDataContainer: {
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        flexDirection: "column"
    },
    fingerContainer2: {
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-evenly", 
        flexDirection: "row", 
        margin: "0.5em 0", 
        width: "100%"
    },
    fingerAvatar: {
        width: "7.5rem",
        height: "7.5rem",
        margin: "0.4em 0"
    },
    fingerItem: {
        display: "flex", 
        flexDirection: "column", 
        width: "100%", 
        justifyContent: "space-evenly"
    },
    fingerItemTitleContainer: {
        display: "flex", 
        alignItems: "center", 
        flexDirection: "row", 
        justifyContent: "space-evenly", 
        width: "50%"
    },
    fingerItemTitle: {
        fontSize: "calc(0.6em + 0.6vw)", 
        marginTop: "0.3em"
    },
    fingerItemButtonGroup: {
        display: "flex", 
        alignItems: "center", 
        flexDirection: "row", 
        justifyContent: "space-evenly"
    },
    AuthItem: {
        margin: "1.3%",
        display: "flex",
        alignItems: "center",
        width: "15em",
        cursor: "default",
        height: "6.7vh",
        "& > .AuthName": {
            width: "45%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "center",
            zIndex: "12",
            transition: "350ms",
            "& > * ": {
                fontWeight: 600,
                color: "#5f5f5f"
            }
        },
        "& > .AuthNameDis": {
            width: "45%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            zIndex: "12",
            backgroundColor: "#c4c4c4",
            transition: "350ms",
            "& > * ": {
                fontWeight: 600,
                color: "#8a8a8a"
            }
        },
        "& > .IsActive": {
            width: "55%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "whitesmoke",
            transition: "350ms",
        },
        "& > .IsDis": {
            width: "55%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#636363",
            transition: "350ms",
            fontSize: "1em",
        },
        "& > * ": {
            fontWeight: 600,
            color: "#5f5f5f"
        }
    },
    disabled: {
        "& > .AuthName": {
            transform: "translateX(122.5%)",
            transition: "350ms"
        },
        "& > .IsActive": {
            transform: "translateX(-80%)",
            transition: "350ms"
        }
    },
    red: {
        backgroundColor: "#f44336"
    },
    green: {
        backgroundColor: "#4caf50"
    },
    button: {
        textTransform: "none",
        color: "inherit"
    },
    editButton: {
        backgroundColor: "#2196f312",
        color: "#2196f3"
    },
    deleteButton: {
        backgroundColor: "#f4433612",
        color: "#f44336"
    },
    noInfoText: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(1em + 1vw)",
        height: "100%"
    }
}));