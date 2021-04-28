import { makeStyles } from '@material-ui/core/styles';
let useStyles = "";

export default makeStyles((theme) => ({
  "@keyframes loading ": {
    " 0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: "-8px",
    minWidth: "330px",
    '& > *': {
      margin: "2%",
      width: "29%",
      height: theme.spacing(16),
      boxShadow: "3px 3px 4px 1px #00000052",

    },
    "& GraphBox": {
    },
    justifyContent: "center"
  },
  borderBoxL: {
    borderTopLeftRadius: "1rem",
    borderBottomLeftRadius: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5% 1.5%",
    "& > *": {
      fontWeight: "600",
      color: "#000000a6",
      fontSize: `calc(14px + (30 - 14) * ((40vw - 320px) / (1600 - 300)))`,

    }
  },
  number: {
    fontSize: `calc(30px + (55 - 30) * ((40vw - 320px) / (1600 - 300)))`
  },
  borderBoxR: {
    borderTopRightRadius: "1rem",
    borderBottomRightRadius: "1rem",
  },
  GraphBox: {
    margin: theme.spacing(2),
    width: "100%",
    height: "50vh",
    padding: "2em",
    textAlign: "center",
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
  loading: {
    animationName: '$loading',
    background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
    backgroundSize: "400% 400%",
    animationDuration: '1s',
    animationIterationCount: 'infinite'
  },
  buttonBox:{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    "& > .MuiButtonBase-root.MuiButton-root.MuiButton-text":{
      fontSize: "calc(18px + (50 - 18) * ((90vw - 320px) / (1600 - 300)))",
      width: "13vw",
      height: "19.2vh",
      borderRadius: "5px",
      color: "#565656",
      minWidth: 0
    }
  },
  selectedChart:{
    "& > * ":{
      background: "linear-gradient(348deg, rgba(41,86,181,0.8603816526610644) 0%, rgba(122,188,186,0.8743872549019608) 48%, rgba(134,237,105,0.8687850140056023) 100%);",
      "-webkit-background-clip": "text",
       "-webkit-text-fill-color": "transparent",
    }
  }
}));