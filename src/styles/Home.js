import { makeStyles } from '@material-ui/core/styles';
let useStyles = "";
const drawerWidth = '340px';

export default useStyles = makeStyles((theme) => ({
  "@keyframes loading ": {
    " 0%": { backgroundPosition: "0% 50%" },
    "50%": { backgroundPosition: "100% 50%" },
    "100%": { backgroundPosition: "0% 50%" }
  },
  root: {
    display: 'flex',
    width: "100vw",
    height: "100vh",
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
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none',
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
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: '-' + drawerWidth,
    overflow: "hidden"
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  userWelcome: {
    fontSize: "5vmin",
    color: "#000000a6"
  },
  userBadge: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: "center",
    color: "#000000a6",
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
    fontSize: "calc(18px + (24 - 18) * ((20vw - 303px) / (1600 - 300)))",

  },
  List: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "82.3vh",
    justifyContent: "space-evenly",
    paddingRight: "1em"
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
    width: "80%",
    padding: "1rem 1rem",
    color: "#000000a6",
    display: "flex",
    flexDirection: "row",
    borderRadius: "1rem",
    fontSize: "2.2vmin"
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
    fontSize: "5vh"
  },
  ListIcons: {
    fontSize: `calc(18px + (30 - 18) * ((40vw - 320px) / (1600 - 300)))`,
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
    backgroundColor: "#0000001a"
  }
}));