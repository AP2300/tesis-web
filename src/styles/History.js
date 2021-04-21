import { makeStyles } from '@material-ui/core/styles';
import { MaximizeTwoTone } from '@material-ui/icons';

let useStyles = "";
export default useStyles = makeStyles((theme) => ({
    "@keyframes loading ": {
        " 0%": { backgroundPosition: "0% 50%" },
        "50%": { backgroundPosition: "100% 50%" },
        "100%": { backgroundPosition: "0% 50%" }
    },
    FormSize: {
        width: '100%',
    },
    Acordion: {
        backgroundColor: "rgb(232 232 232)",
        "& > * ": {
            padding: "0 10px"
        },
        width: "100%"
    },
    TextInput: {
        width: "100%",
        "& .MuiFormLabel-root.Mui-focused": {
            color: "black"
        },
        "& .MuiFormLabel-root": {
            color: "#000000bd"
        },
        "& .MuiOutlinedInput-root": {
            backgroundColor: "transparent",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
            backgroundColor: "#bdbdbd6e",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline ": {
            borderColor: "black",
            backgroundColor: "#bdbdbd6e",
        },
    },
    margins: {
        "& > *": {
            margin: 0
        },
    },
    resultBox: {
        width: "100%",
        height: "70vh",
        marginTop: "1%",
        boxShadow: "3px 2px 5px #00000038",
        overflowY: "scroll"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: "1rem",
        color: "#000000bd"
    },
    icon: {
        verticalAlign: 'bottom',
        height: 20,
        width: 20,
    },
    details: {
        alignItems: 'center',
        height: "29vh"
    },
    column1: {
        width: "63vw",
        height: "100%",

    },
    column: {
        width: '27vw',
        height: "100%",
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    message: {
        display: "flex",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        "&& > *": {
          fontSize: "3em"
        }
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    loading: {
        animationName: '$loading',
        background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
        backgroundSize: "400% 400%",
        animationDuration: '1s',
        animationIterationCount: 'infinite',
        color: "transparent",
    },
    FilterContainer: {
        width: "100vw",
        height: "35vh",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "2%"
    },
    innerContainer: {
        margin: theme.spacing(1),
        display: "flex",
        flexDirection: "row",
        width: "50%",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    OuterContainer: {
        display: "flex",
        flexDirection: "row",
        height: "100%"
    },
    formControl: {
        width: "100%",
    }
}));