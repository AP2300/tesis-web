import { makeStyles } from '@material-ui/core/styles';
import sizes from "./sizes";

export default makeStyles(() => ({
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
    mainContainer: {
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
    minimizerButton: {
        width: "5%",
        [sizes.Wdown("md-sm")]: {
            width: "auto",
            "& .icon": {
                transform: "rotate(90deg)"
            }
        },
    },
    UserList: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0.1%",
        width: "30%",
        height: "100%",
        transition: "200ms ease-in",
        "& .Title": {
            color: "#4c4c4c",
            fontSize: "2em"
        },
        "& .divider": {
            marginBottom: "15px"
        },
        "& .acordion": {
            color: "#4c4c4c",
            boxShadow: " 0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 0%), 0px 1px 3px 0px rgb(0 0 0 / 0%)",
        },
        "& .container": {
            height: "100%",
            "& > .lists": {
                height: "calc(100% - 57px)",
                overflowY: "scroll",
                overflowX: "hidden"
            },
        },
        "&  .MuiList-root.MuiList-padding": {
            width: "100%"
        },
        "& .MuiAccordionDetails-root": {
            padding: 0,
            flexDirection: "column"
        },
        [sizes.Wdown("md-sm")]: {
            width: "auto"
        },
    },
    UserListMinimized: {
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
    dataContainer: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        justifyContent: "center",
        height: "100%",
        flexGrow: 1,
        "& .displayContainer": {
            display: "flex",
            flexDirection: "column",
            height: "100%"
        },
        "& .addButton": {
            minWidth: 0,
            color: "#2196f3",
            "& > .MuiButton-label .MuiSvgIcon-root ": {
                fontSize: "3em"
            }
        },
        [sizes.Wdown("md-sm")]: {
            minHeight: "500px",
        },
    },
    UpperContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "25%",
        "& .name": {
            fontSize: "calc(12px + (38 - 12) * ((90vw - 303px) / (1600 - 300)))",
            fontWeight: "600"
        }, "& .code": {
            fontSize: "calc(12px + (38 - 12) * ((90vw - 303px) / (1600 - 300)))",
            fontWeight: "600"
        }, "& .EmailType": {
            fontSize: "calc(12px + (24 - 10) * ((70vw - 303px) / (1600 - 300)))",
        },
        "& > *": {
            color: "#4f4f4f"
        },
    },
    BottomContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-evenly",
        width: "100%",
        height: "75%",
        flexWrap: "wrap",
        marginTop: "20px"
    },
    LeftContainer: {
        display: "flex",
        flexWrap: "wrap",
        width: "95%",
        minWidth: "300px",
        minHeight: "95%",
        [sizes.Wdown("sm")]: {
            flexGrow: 1,
            marginBottom: "3%"
        },
        [sizes.Wdown("lg")]: {
            flexGrow: 1,
            marginBottom: "3%"
        },
        "& > .dividerV": {
            minHeight: "335px",
            "@media (max-width: 560px)": {
                display: "none"
            }
        },
        "& > .pictureCont": {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            flexGrow: 1,
            width: "40%",
            height: "100%",
            "& > .avatar": {
                minWidth: "120px",
                minHeight: "120px",
                margin: "5%"
            },
        },
        "& > .inputCont": {
            width: "52%",
            minWidth: "240px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            flexDirection: "column",
            flexGrow: 1,
            "& > .fields": {
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                "& .MuiButtonBase-root.MuiButton-root.MuiButton-text": {
                    marginBottom: "1em",
                    borderRadius: "2em",
                    width: "30px",
                }
            }
        },
    },
    textField: {
        width: "70%",
        "& .MuiOutlinedInput-root": {
            borderRadius: "2rem",
            backgroundColor: "#bdbdbd6e",
        },
        marginBottom: "1em",
        "& input": {
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
    closeButton: {
        display: "flex",
        alignSelf: "flex-end",
        borderRadius: "2em",
        minWidth: "0",
        color: "#f44336"
    },
    StepperCont: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "100%",
        "& > .closeCont": {
            height: "10%",
            alignSelf: "flex-end"
        },
        "& > .Stepper": {
            height: "90%",
            width: "100%",
            overflowY: "scroll"
        }
    },
    chip: {
        display: "flex",
        backgroundColor: "#ff9800",
        color: "whitesmoke",
        fontWeight: "600",
        padding: "1%",
        width: "20vw",
        height: "10vh",
        "& > *": {
            color: "whitesmoke",
        }
    },
}));