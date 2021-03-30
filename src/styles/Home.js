import { makeStyles, useTheme } from '@material-ui/core/styles';
let useStyles="";
const drawerWidth = '320px';

export default useStyles = makeStyles((theme) => ({

    root: {
      display: 'flex',
      width: "100vw",
      height: "100vh",
      overflow: "scroll"
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
      // necessary for content to be below app bar
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
      marginLeft: '-'+drawerWidth,
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
        fontSize: "5vmin",
        color: "#000000a6"
    },
    userBadge: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: "center",
      color: "#000000a6",
      width:" 100%",
      minHeight: "10vh",
      backgroundColor: "whitesmoke",
          "&&:hover":{
              backgroundColor: "#e2e2e2",
          },
      paddingLeft: "1.8rem",
      paddingRight: "1rem",
      cursor: "pointer",
      transition: "100ms "
      },
      typography: {
        fontWeight: 600,
        marginLeft: "1rem",
        fontSize:'3vh',
      },
      List:{
          display:"flex",
          flexDirection: "column",
          alignItems: "center",
          color: "#000000a6",
          height: "82.3vh",
          justifyContent: "space-evenly",
          paddingRight: "1em"
      },
      List1:{
        display:"flex",
        flexDirection: "column",
        alignItems: "center",
        height: "17.7vh",
        color: "#000000a6",
        justifyContent: "center",
        paddingRight: "1em"
    },
      ListItem:{
          width: "80%",
          padding: "1rem 1rem",
          display: "flex",
          flexDirection: "row",
          borderRadius: "1rem",
          fontSize: "2.2vmin"
      },
      icon:{
          fontSize: "5vh"
      },
      ListIcons: {
        fontSize: `calc(18px + (30 - 18) * ((40vw - 320px) / (1600 - 300)))`
      },
      Avatar:{
          width:"60",
          height: "60"
      },
      listItemText:{
        fontWeight: "600",
        fontSize: `calc(18px + (30 - 18) * ((40vw - 320px) / (1600 - 300)))`
      },
      
  }));