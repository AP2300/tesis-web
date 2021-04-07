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
    minWidth: "330px",
    '& > *': {
      margin: "2%",
      width: "25%",
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
    width: "82%",
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
  }
}));