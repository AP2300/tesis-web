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
            overflowY: "scroll"
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
            marginBottom: "15px"
        },
        "& .acordion":{
            color: "#4c4c4c",
            boxShadow:" 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)"
        },
        "& .container":{
            height: "100%",
            "& > .lists":{
                height: "calc(100% - 57px)",
                overflowY: "scroll",
                overflowX: "hidden"
            },
        },
        "&  .MuiList-root.MuiList-padding":{
            width: "100%"
        },
        "& .MuiAccordionDetails-root":{
            padding: 0,
            flexDirection: "column"
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
        overflowY: "scroll",
        [sizes.Wdown("md-sm")]: {
           minHeight: "500px"
        },
        [sizes.Wdown("lg")]: {
            overflowY: "scroll"
        },
    },
    chip:{
        display: "flex",
        backgroundColor: "#ff9800",
        color: "whitesmoke",
        fontWeight: "600",
        padding: "1%",
        margin: "1em 0em",
        "& > *":{
        color: "whitesmoke",
        }
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
        overflow: "visible"
    },
    LeftContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
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
        color: "inherit",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "0rem 1rem",
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
    noPhoto: {
        justifyContent: "flex-start",
    },
    noPhotoContent: {
        display: "inherit",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    List: {
        display: "flex",
        flexDirection: "column",
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
    noInfoText: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "calc(1em + 1vw)",
        height: "100%",
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
    red: {
        backgroundColor: "#f44336"
    },
    green: {
        backgroundColor: "#4caf50"
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
        width: "100%",
        /*width: "60%"*/
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
    formControl: {
        width: "50%",
        margin: theme.spacing(1),
        minWidth: 120,
    }
}));