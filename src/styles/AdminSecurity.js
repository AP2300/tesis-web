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
        height: "80vh"
    },
    panelContainer: {
        height: "80vh",
        padding: "2%",
        display: "flex",
        justifyContent: "space-between",
        [sizes.Wdown("xs")]: {
            flexDirection: "column",
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
        width: "85%",
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
        width: "63%",
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
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: "2em 0em 2em 2em",
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
    faceAvatar: {
        width: "9rem",
        height: "9rem"
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
    fingerAvatar: {
        width: "7.5rem",
        height: "7.5rem"
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
    disabled:{  
        "& > .AuthName":{
            transform: "translateX(122.5%)",
            transition: "350ms"
        },
        "& > .IsActive":{
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
    }
}));