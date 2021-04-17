import { makeStyles} from '@material-ui/core/styles';
import sizes from "./sizes";

let useStyles = "";

// export default useStyles = makeStyles((theme) => ({
//     root: {
//       width: "100%",
//       display: 'flex',
//       flexDirection: 'column',
//       '& > *': {
//         boxShadow: "3px 3px 4px 1px #00000052"
//       },
//           "& GraphBox" :{
//           },
//       justifyContent: "center",
//     },
//     avatar: {
//         height: "100%",
//         minWidth: "5vmax",
//         minHeight: "5vmax",
//         width: "100%",
//         overflow: "visible",
//         boxShadow: "2px 2px 3px rgba(0,0,0,0.45)",
//     },
//     username: {
//         display: 'flex',
//         position: "relative",
//         top: "-1vmax",
//         left:"-40%",
//         width: "180%",
//         height: "4vmin",
//         borderRadius: "40px",
//         alignItems: "center",
//         justifyContent: "center",
//         boxShadow: "3px 3px 4px 1px #00000052"
//     },
//     GraphBox: {
//         width: "82%",
//         height: "60vh",
//         alignSelf: "center",
//     },
//     container:{
//         display: "flex",
//         position: "relative",
//         width: "100%", 
//         height: "15vmin",
//         top: "-2vh",
//         justifyContent: "center",
//         alignItems: "center",
//         boxShadow: "none",
//         textAlign: "-webkit-center",
//         margin: "3vmin",
//     },
//     container_avatar:{
//         width: "22vmin", 
//         position: "relative",
//         margin: "0",
//         boxShadow: "none",
//     },
//     container_buttons:{
//         margin: theme.spacing(2),
//         position: "relative",
//         width: "50%",
//         top: "2.5vh",
//         left: "5vmin",
//         boxShadow: "none",
//     },
//     btn_info: {
//         background: "white",
//         width: "70%",
//         height: "5vmin",
//         position: "relative",
//         top: "-3vmin",
//         borderRadius: "40px",
//         boxShadow: "3px 3px 4px 1px #00000052"
//     },
//     btn_edit: {
//         background: "white",
//         width: "70%",
//         height: "5vmin",
//         position: "relative",
//         left: "vw",
//         borderRadius: "40px",
//         boxShadow: "3px 3px 4px 1px #00000052"
//     },
//     typography: {
//         fontWeight: 600,
//         fontSize: "calc(15px + (24 - 15) * ((20vw - 303px) / (1600 - 300)))",
//     },
//   }));

export default useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: "5%",
        marginRight: "5%",
    },
    mainContainer: {
        width: "100vw",
        height: "80vh",
        overflowY: "scroll"
    },
    upperContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
    },
    leftUpperContainer: {
        width: "38%",
        height: "35vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: "2%",
        justifyContent: "space-between",
        paddingTop: "2%",
        flexGrow: "1",
        "& .activeSince": {
            display: "flex",
            alignSelf: "baseline"
        }
    },
    rightUpperContainer: {
        width: "62%",
        minWidth: "300px",
        height: "35vh",
        padding: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
         flexGrow: "1"
    },
    space: {
        marginTop: "5%"
    },
    img: {
        width: "100%",
        height: "25vmin",
        maxWidth: "195px",
        minWidth: "50px",
        maxHeight: "190px",
        minHeight: "171px",
    },
    mainInfo: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        "& .name": {
            textAlign: "center",
            fontSize: "calc(25px + (100 - 25) * ((60vw - 303px) / (1600 - 300)))"
        },
        "& .secondary": {
            textAlign: "center",
            fontSize: "calc(12px + (30 - 12) * ((60vw - 303px) / (1600 - 300)))"
        }
    },
    modifyImg: {
        backgroundColor: "#bdbdbd54",
        marginLeft: "21%",
        marginRight: "21%",
        padding: "4%",
        borderRadius: "0.4em",
        display: "flex",
        alignItems: "center",
        border: "3px dashed #b3b3b3",
        justifyContent: "center",
        "& > *": {
            textAlign: "center",
            fontSize: "calc(18px + (24 - 18) * ((20vw - 303px) / (1600 - 300)))"
        }
    },
    bottomContainer: {
        width: "100%",
        padding: "1%",
        display: "flex",
        height: "56%",
        flexWrap: "wrap"
    },
    LeftBox: {
        minWidth: "280px",
        flexGrow: 1,
        padding: "1%"
    },
    RightBox: {
        minWidth: "280px",
        flexGrow: 1,
        padding: "1%"
    },
    textField: {
        width: "70%",
        "& .MuiOutlinedInput-root": {
            borderRadius: "2rem",
            backgroundColor: "#bdbdbd6e",
        },
        marginBottom: "1em",
        ["& input"]: {
            height: ".3em",
        },
        "& .MuiFormLabel-root": {
            marginTop: "-5px"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3f51b5"
        },

    },
    textFieldContainer1: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        width: "20%",
        "& > *": {
            fontSize: "calc(12px + (24 - 12) * ((70vw - 303px) / (1600 - 300)))",
            fontWeight: "600"
        }
    },
    textFieldContainer2: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        width: "80%"
    },
    editButton: {
        marginLeft: "6%",
        borderRadius: "100%",
        minWidth: "40px",
        backgroundColor: "#e0e0e0",
        marginTop: "-14px",
        "&:hover": {
            backgroundColor: "#0c0c0cde",
            color: "whitesmoke",
            transition: "400ms"
        }
    },
    item: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "80%"
    },
    AuthItem: {
        // #f44336 rojo
        // #4caf50 verde
        width: "70%",
        height: "6.7vh",
        "& .AuthName": {
            width: "45%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }
    }
}));
