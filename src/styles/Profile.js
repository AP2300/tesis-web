import { makeStyles } from '@material-ui/core/styles';
import sizes from "./sizes";

let useStyles = "";

export default useStyles = makeStyles((theme) => ({
    "@keyframes loading ": {
        " 0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" }
      },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        marginLeft: "2%",
        marginRight: "2%",
        "& > *":{
            color: "#5f5f5f"
        }
    },
    mainContainer: {
        marginTop: "-10px",
        width: "100vw",
        height: "82.5vh",
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
            alignSelf: "baseline",
            "& > *":{
                fontWeight: "600",
            }
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
            fontSize: "calc(25px + (100 - 25) * ((50vw - 303px) / (1600 - 300)))"
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
        flexWrap: "wrap",
    },
    LeftBox: {
        minWidth: "280px",
        width: "0%",
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
            marginTop: "-5px",
            overflowWrap: "break-word"
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
            fontWeight: "600",
            color: "#5f5f5f"
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
        color: "#5f5f5f",
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
        width: "100%",
        minWidth: "220px"
    },
    AuthItem: {
        margin: "1.3%",
        display: "flex",
        alignItems: "center",
        width: "70%",
        cursor: "default",
        height: "6.7vh",
        "& > .AuthName": {
            width: "45%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            justifyContent: "space-evenly",
            zIndex: "12",
            transition: "350ms",
            "& > * ": {
                fontWeight: 600,
                color: "#5f5f5f"
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
    AuthContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "26vh"
    },
    loading: {
        animationName: '$loading',
        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
        backgroundSize: "400% 400%",
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        color: "transparent",
      },
      Noti:{
          width: "70vw",
          maxWidth: "500px",
          height: "9vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight:"600",
          padding: "2%",
          backgroundColor: "#ff9800",
          cursor: "default",
          color: "#fff",
          "& > .icon":{
              marginRight: "2.5%",
              "& > *":{
                fontSize: "3em"
              } 
          },
          "& > .closeIcon":{
              marginLeft: "4%",
          }
      },
      Modal:{
          marginTop: "9%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
      },

}));
