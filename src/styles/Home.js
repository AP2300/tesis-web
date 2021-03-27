import { makeStyles, useTheme } from '@material-ui/core/styles';
let useStyles="";
const drawerWidth = 320;

export default useStyles = makeStyles((theme) => ({
    listItemText:{
      fontWeight: "600"
    },
    root: {
      display: 'flex',
      width: "100vw",
      height: "100vh",
      overflow: "hidden"
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: "100vw",
      backgroundColor: "white",
      boxShadow: "1px 2px 5px 0px #0000002e",
      height: "11vh",
      display: "inline-grid",
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
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
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundColor: "whitesmoke",
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'center',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
      height: "100vh",
  
      
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    userWelcome: {
        fontSize: "6vmin",
        color: "#000000a6"
    },
    userBadge: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: "center",
      color: "#000000a6",
      margin: theme.spacing(1),
      width: theme.spacing(26),
      height: theme.spacing(8),
      backgroundColor: "whitesmoke",
          "&&:hover":{
              backgroundColor: "#e2e2e2",
          },
      paddingLeft: "1rem",
      paddingRight: "1rem",
      cursor: "pointer",
      transition: "100ms "
      },
      typography: {
        fontWeight: 600,
        marginLeft: "1rem"
      },
      List:{
          display:"flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#000000a6",
      },
      ListItem:{
          width: "80%",
          padding: "1rem 1rem",
          margin: "1rem 1rem",
          display: "flex",
          flexDirection: "row",
          justifyItems: "center",
          borderRadius: "1rem",
      }
  }));