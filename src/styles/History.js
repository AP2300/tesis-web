import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
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
        "& > .MuiButtonBase-root.MuiAccordionSummary-root.Mui-expanded": {
            height: "9vh",
        },
        width: "100%",
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
        overflowY: "scroll",
        "& > .MuiAccordion-root.Mui-expanded": {
            margin: 0
        },
    },
    GeneralGraph: {
        width: "100%",
        height: "50vh",
        padding: "1.3%",
        transition: "200ms ease-in"
    },
    HideGraph: {
        width: "100%",
        height: "0",
        transition: "200ms ease-out"

    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        display: "flex",
        alignItems: "flex-end",
    },
    secondaryHeading: {
        fontSize: "1rem",
    },
    details: {
        alignItems: 'center',
        height: "38vh",
        width: "100%"
    },
    column1: {
        width: "80%",
        height: "100%",
        transition: "250ms ease-in"
    },
    column: {
        overflowX: "scroll",
        width: '80%',
        height: "100%",
        transition: "250ms ease-in"
    },
    columnDisabled: {
        width: "10%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "250ms ease-in"
    },
    dividerButton: {
        height: "100%",
        width: "10%",
        minWidth: 0
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
            fontSize: "2em"
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
        height: "27vh",
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: ".5%"
    },
    innerContainer: {
        margin: theme.spacing(1),
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        flexGrow: "1",
        minWidth: "210px",
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    OuterContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        height: "100%",
        width: "100%",
        overflowY: "scroll",
        justifyContent: "center"
    },
    formControl: {
        width: "100%",
    },
    BtnActive: {
        "& > *": {
            background: "linear-gradient(344deg, rgba(88,126,140,0.9752275910364145) 54%, rgba(153,192,198,1) 100%);",
            "-webkit-background-clip": "text",
            "-webkit-text-fill-color": "transparent",
        }
    },
    AcordionResult: {
        "& > .MuiButtonBase-root.MuiAccordionSummary-root .MuiAccordionSummary-content": {
            flexWrap: "wrap",
            justifyContent: "space-between",
            color: "#000000bd",
            "&  .UserInfo": {
                display: "flex",
                width: "30%",
                minWidth: "220px"
            },
            "&  .UserIcon": {
                display: "flex",
                width: "5%",
                minWidth: "36.5px"
            }
        },
    }
}));