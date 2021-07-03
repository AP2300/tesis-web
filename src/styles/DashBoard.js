import { makeStyles } from '@material-ui/core/styles';


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

    },
    "& GraphBox": {
    },
    justifyContent: "center"
  },
  borderBoxL: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5% 1.5%",
    backgroundColor: "#99c0c838",
    "& > *": {
      fontWeight: "600",
      color: "#191818db",
      fontSize: `calc(14px + (30 - 14) * ((40vw - 320px) / (1600 - 300)))`,

    }
  },
  BoxText: {
    textAlign: "center",
    fontSize: "calc(14px + (30 - 14) * ((40vw - 320px) / (1600 - 300)))",
  },
  number: {
    fontSize: `calc(40px + (75 - 40) * ((40vw - 320px) / (1600 - 300)))`
  },
  date: {
    fontSize: `calc(17px + (30 - 17) * ((90vw - 320px) / (1600 - 300)))`,
  },
  borderBoxR: {
    backgroundColor: "#99c0c838",

  },
  centerBox:{
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2%",
    backgroundColor: "#99c0c838",
    "& > *":{
      color: "#191818db",
      fontWeight: "600"
    }
  },
  GraphBox: {
    margin: theme.spacing(2),
    width: "100%",
    height: "50vh",
    padding: "2em",
    backgroundColor: "#99c0c838",
    textAlign: "center",
  },
  message: {
    display: "flex",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    "&& > *": {
      fontSize: "3em",
      color: "#191818db"
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
    flexDirection: "column",
    justifyContent: "space-evenly",
    padding: ".5%",
    "& div":{
      display: "flex",
      width: "100%",
      justifyContent: "space-evenly",
      padding: "1%",
      height: "9vh"
    },
    "& > div .MuiButtonBase-root.MuiButton-root.MuiButton-text":{
      fontSize: "calc(18px + (50 - 18) * ((90vw - 320px) / (1600 - 300)))",
      width: "50%",
      height: "100%",
      borderRadius: "5px",
      color: "#565656",
      minWidth: 0,
    },
    "& .title":{
      fontSize: "calc(15px + (40 - 15) * ((50vw - 320px) / (1600 - 300)))",
      color: "#191818db",
      fontWeight: "600",
      paddingBottom: "2%"
    }
  },
  selectedChart:{
    "& > * ":{
      background: "linear-gradient(344deg, rgba(88,126,140,0.9752275910364145) 54%, rgba(153,192,198,1) 100%);",
      "-webkit-background-clip": "text",
       "-webkit-text-fill-color": "transparent",
    }
  },
  unselectedChart: {
    "& > * ":{
      color: "#191818db"
    }
  }
}));
