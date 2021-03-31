import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Profile from "./Profile";
import DashBoard from "./DashBoard";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import HistoryIcon from '@material-ui/icons/History';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useStyles from "./styles/Home";
import axios from "axios";


export default function Home(props) {
  const {location, history} = props;
  const classes = useStyles();
  let active = "";
  const [open, setOpen] = useState(false);
  const [isPromiseReady, setisPromiseReady] = useState(false);
  const [Data, setData] = useState("")
  const [activeWindow, setActiveWindow] = useState("")

  useEffect(()=>{
    axios.get("http://localhost:3001/Home", {
      headers: {
          'Content-Type': 'application/json',    
      },
      withCredentials: true
  })
    .then(res => {
      setisPromiseReady(true)
      setData(res.data.data)
    })
    .catch(err => {
      console.error(err); 
    })
  }, [Data])

  const items = [
    {text:'Panel Principal',icon:<InboxIcon className={classes.ListIcons}/>},
    {text:'Panel Personal',icon:<AccountBoxTwoToneIcon className={classes.ListIcons}/>}, 
    {text:'Historial',icon:<HistoryIcon className={classes.ListIcons}/>}, 
    {text:'Seguridad', icon:<LockTwoToneIcon className={classes.ListIcons}/>},
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  function ChangePage(e){
    switch(e.target.outerText){
      case "Panel Principal":
        setActiveWindow(e.target.outerText)
        setOpen(false)
        history.push("/dashboard")
      break;
      case "Panel Personal":
        setActiveWindow(e.target.outerText)
        setOpen(false)
        history.push("/profile")
      break;
    }
  }

  function PageSelector(){
    switch(location.pathname){
      case "/dashboard":
        return <DashBoard isOpen={open}/>;
      case "/profile":
        return <Profile/>;
  
      default: 
        return <DashBoard/>;
    };
  }

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root} >
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar >
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon className={classes.userWelcome}/>
          </IconButton >
          <Typography  noWrap className={clsx(classes.userWelcome, !isPromiseReady && classes.loading)}>
            { activeWindow !== "Panel Personal" ?
           ( isPromiseReady ? `Bienvenido, ${Data.FullName }`: "f" ): activeWindow
            }
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>  
          <Paper elevation={0} className={classes.userBadge} >
            <Avatar src="/broken-image.jpg" className={classes.Avatar}/>
            <Typography className={clsx(classes.typography, !isPromiseReady && classes.loading)}>{isPromiseReady ? Data.FullName: "f"}</Typography>
          </Paper>
          <IconButton onClick={handleDrawerClose} >
           <ChevronLeftIcon className={classes.icon}/>
          </IconButton>
        </div>
        <Divider variant="middle"/>
        <List className={classes.List} >
          {items.map((text, index) => (
            <ListItem button className={clsx(classes.ListItem, activeWindow == text.text ? classes.active : text.text)} key={index} onClick={ChangePage} >
              <ListItemIcon fontSize="inherit">{text.icon}</ListItemIcon>
              <ListItemText primary={text.text}  classes={{primary:classes.listItemText}}/>
            </ListItem>
          ))}
        </List>
        <Divider variant="middle"/>
        <List className={classes.List1}>
            <ListItem button className={classes.ListItem}>
              <ListItemIcon fontSize="inherit"><ExitToAppIcon className={classes.ListIcons}/></ListItemIcon>
              <ListItemText primary={"Cerrar Sesion"}  classes={{primary:classes.listItemText}}/>
            </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
          {PageSelector()}
      </main>
    </div>
  );
}