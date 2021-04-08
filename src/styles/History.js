import { makeStyles } from '@material-ui/core/styles';

let useStyles = "";
export default useStyles = makeStyles((theme) => ({
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
        height: "100%"
    },
    column: {
        width: '10vw',
        height: "100%"
    },
    helper: {
        borderLeft: `2px solid ${theme.palette.divider}`,
        padding: theme.spacing(1, 2),
    },
    link: {
        color: theme.palette.primary.main,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
        },
    },
}));