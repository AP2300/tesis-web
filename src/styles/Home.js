import { makeStyles } from '@material-ui/core/styles';
import sizes from "./sizes";
const drawerWidth = '340px';

export default makeStyles((theme) => ({
  "@keyframes loading ": {
    " 0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  },
  // "&::-webkit-scrollbar-track": {
  //   backgroundColor: "red",
  //   borderRadius: "10px"
  // },
  // "&::-webkit-scrollbar":{
  //   width: "10px",
  //   backgroundColor: "red",
  // },
  // "&::-webkit-scrollbar-thumb":{
  //   borderRadius: "10px",
  //   backgroundImage: "-webkit-gradient(linear, left bottom, left top, color-stop(0.44, rgb(122,153,217)), color-stop(0.72, rgb(73,125,189)), color-stop(0.86, rgb(28,58,148)))"
  // },
  root: {
    display: 'flex',
    width: "100vw",
    height: "100vh",
    "& .MuiToolbar-root.MuiToolbar-regular.MuiToolbar-gutters": {
      backgroundColor: "#99C0C6"
    },

  },
  toolbar: {
    width: "100%",
    display: "flex",
    alignItems: "center"
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "white",
    boxShadow: "1px 2px 5px 0px #0000002e",
    height: "11vh",
    minHeight: "50px",
    display: "inline-grid",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth})`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    //marginRight: theme.spacing(2),
    "& > .MuiIconButton-label .MuiSvgIcon-root": {
      fontSize: "2em !important",
      [sizes.Wdown("md-sm")]: {
        fontSize: "2rem !important",
      },
    },
    "& > .MuiIconButton-root": {
      paddingRight: "5px"
    }
  },
  hide: {
    marginLeft: "-72px",
    opacity: '0'
  },
  drawer: {
    minWidth: drawerWidth,
    flexShrink: 0,
    height: "100vh"
  },
  drawerPaper: {
    minWidth: drawerWidth,
    backgroundColor: "whitesmoke",
    height: "100vh",
    overflow: "hidden"
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'center',
    height: "12.6vh"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: '-' + drawerWidth,
    overflowY: "auto",
    backgroundColor: "#f7f7f7"
  },
  LogoIcon: {
    width: "5vw",
    height: "10vh",
    [sizes.Wdown("md-sm")]: {
      display: "none"
    },
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  userWelcome: {
    fontSize: "4vmin",
    color: "#191818",
    [sizes.Wdown("xxs")]: {
      fontSize: "16.5px",
    },
  },
  userBadge: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: "center",
    color: "#191818",
    width: " 100%",
    minHeight: "10vh",
    backgroundColor: "whitesmoke",
    paddingLeft: "1.8rem",
    paddingRight: "1rem",
    cursor: "pointer",
    transition: "100ms ",
  },
  typography: {
    fontWeight: 600,
    marginLeft: "1rem",
    fontSize: "calc(18px + (24 - 18) * ((40vw - 303px) / (1600 - 300)))",

  },
  List: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "82.3vh",
    paddingTop: "2rem",
  },
  List1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "17.7vh",
    justifyContent: "center",
    paddingRight: "1em",
  },
  ListItem: {
    width: "100%",
    padding: "5%",
    color: "#191818",
    display: "flex",
    flexDirection: "row",
    fontSize: "2.2vmin",
    "&:hover": {
      color: "#1a7769"
    }
  },
  LogOut: {
    width: "80%",
    padding: "1rem 1rem",
    color: "#ff4d4d",
    display: "flex",
    flexDirection: "row",
    borderRadius: "1rem",
    fontSize: "2.2vmin"
  },
  icon: {
    fontSize: "5vh",
    color: "#191818"
  },
  ListIcons: {
    fontSize: `calc(19px + (30 - 19) * ((120vw - 320px) / (1600 - 300)))`,
    color: "#1a7769"
  },
  LogOuIcon: {
    fontSize: `calc(18px + (30 - 18) * ((40vw - 320px) / (1600 - 300)))`,
    color: "#ff4d4d"
  },
  Avatar: {
    width: "60",
    height: "60"
  },
  listItemText: {
    fontWeight: "600",
    fontSize: `calc(18px + (30 - 18) * ((40vw - 320px) / (1600 - 300)))`
  },
  loading: {
    animationName: '$loading',
    background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
    backgroundSize: "400% 400%",
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    color: "transparent",
    width: "9em"
  },
  active: {
    paddingLeft: "15%",
    color: "#1a7769",
    transform: "scale(1.1)",
    transition: "200ms ease-in"
  },
  divider: {
    color: "#1a7769ba"
  }
}));