import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
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
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import HistoryIcon from '@material-ui/icons/History';
import LockTwoToneIcon from '@material-ui/icons/LockTwoTone';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import useStyles from "../styles/Home";
import { GetUserData } from "../api/user";
import { EndSession } from "../api/session";
import { PageSelector, otherPage } from "../helpers/Home";
import { useHistory } from 'react-router';
import AdminDial from './AdminDial';

export default function Home() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isPromiseReady, setisPromiseReady] = useState(false);
  const [Data, setData] = useState("")
  const [activeWindow, setActiveWindow] = useState("Panel Principal")
  const [SearchData, setSearchData] = useState("")

  useEffect(() => {
    if (Data === "") getData();

  }, [Data])

  const getData = async () => {
    const req = await GetUserData();
    if (req.success === true) {
      setData(req.res);
      setisPromiseReady(true);
    } else {
      history.push("/")
    }
  }


  const items = [
    { text: 'Panel Principal', icon: <DashboardIcon className={classes.ListIcons} /> },
    { text: 'Panel Personal', icon: <AccountBoxTwoToneIcon className={classes.ListIcons} /> },
    { text: 'Historial', icon: <HistoryIcon className={classes.ListIcons} /> },
    { text: 'Seguridad', icon: <LockTwoToneIcon className={classes.ListIcons} /> },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  function ChangePage(e) {
    let route = "";
    if(typeof e === 'object') route = e.target.outerText; 
    else route = e; 
    let path = otherPage(route);
    if (path) {
      setActiveWindow(route);
      setOpen(false);
      history.push(path);
    }
  }

  const CloseSession = async () => {
    const res = await EndSession();
    console.log(res);
    if (res.data.success === true) history.push("/");
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
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon className={classes.userWelcome} />
          </IconButton >
            <Typography noWrap className={clsx(classes.userWelcome, !isPromiseReady && classes.loading)}>
              {activeWindow == "Panel Principal" ?
                (isPromiseReady ? `Bienvenido, ${Data.FullName}` : "f") : activeWindow
              }
            </Typography>
            {Data.IsAdmin && <AdminDial ChangePage={ChangePage} />}
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <Paper elevation={0} className={classes.userBadge} >
            <Avatar src="/broken-image.jpg" className={classes.Avatar} />
            <Typography className={clsx(classes.typography, !isPromiseReady && classes.loading)}>{isPromiseReady ? Data.FullName : "f"}</Typography>
          </Paper>
          <IconButton onClick={handleDrawerClose} >
            <ChevronLeftIcon className={classes.icon} />
          </IconButton>
        </div>
        <Divider variant="middle" />
        <List className={classes.List} >
          {items.map((text, index) => (
            <ListItem button className={clsx(classes.ListItem, activeWindow === text.text ? classes.active : text.text)} key={index} onClick={ChangePage} >
              <ListItemIcon fontSize="inherit">{text.icon}</ListItemIcon>
              <ListItemText primary={text.text} classes={{ primary: classes.listItemText }} />
            </ListItem>
          ))}
        </List>
        <Divider variant="middle" />
        <List className={classes.List1}>
          <ListItem button className={classes.LogOut} onClick={CloseSession} >
            <ListItemIcon fontSize="inherit" ><ExitToAppIcon className={classes.LogOuIcon} /></ListItemIcon>
            <ListItemText primary={"Cerrar Sesion"} classes={{ primary: classes.listItemText }} />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {PageSelector(Data, SearchData)}
      </main>
    </div>
  );
}