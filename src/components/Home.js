import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { Drawer, CssBaseline, AppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText, Paper, Avatar } from "@material-ui/core/"
import {AccountBoxTwoTone, History, LockTwoTone, ExitToApp, Dashboard, Menu, ChevronLeft} from '@material-ui/icons/';
import useStyles from "../styles/Home";
import { GetUserData } from "../api/user";
import { EndSession, CheckSession} from "../api/session";
import { PageSelector, otherPage, SelectPage } from "../helpers/Home";
import { useHistory, useLocation } from 'react-router';
import AdminDial from './AdminDial';
import * as Cons from "./../api/constants"
import { ReactComponent as LogoIcon } from '../styles/resources/iconoSVG.svg'
import { ReactComponent as Logo } from '../styles/resources/DataSecSVG.svg'

export default function Home() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isPromiseReady, setisPromiseReady] = useState(false);
  const [Data, setData] = useState("");
  const [activeWindow, setActiveWindow] = useState(SelectPage(location));

  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("checkSess");
      const res = await CheckSession()
      if(res.data.session === "vencida") {
        console.log("deleteSess")
        history.push("/")
        history.replace({state:{ expired: true }})
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Data === "") getData();
  }, [Data])

  const getData = async () => {
    const req = await GetUserData();
    if (req.success === true) {
      setData(req.res);
      setisPromiseReady(true);
    } else {
      history.push({
        pathname: '/',
        state: { expired: true }
      });
    }
  }


  const items = [
    { text: 'Panel Principal', icon: <Dashboard className={classes.ListIcons} /> },
    { text: 'Panel Personal', icon: <AccountBoxTwoTone className={classes.ListIcons} /> },
    { text: 'Historial', icon: <History className={classes.ListIcons} /> },
    { text: 'Seguridad', icon: <LockTwoTone className={classes.ListIcons} /> },
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  function ChangePage(e) {
    let route = "";
    if (typeof e === 'object') route = e.target.outerText;
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
            <Menu className={classes.userWelcome} />
          </IconButton >
          <LogoIcon className={classes.LogoIcon}  />
          <Typography noWrap className={clsx(classes.userWelcome, !isPromiseReady && classes.loading)}>
            {activeWindow === "Panel Principal" ?
              (isPromiseReady ?
                <span>
                  Bienvenido, <span style={{ fontWeight: "600" }}>{Data.FullName}</span>
                </span>
                : "f")
              : activeWindow
            }

          </Typography>
          {Data.IsAdmin ? <AdminDial ChangePage={ChangePage} /> : ""}
        </Toolbar>
      </AppBar>
      <Drawer className={classes.drawer} variant="persistent" anchor="left" open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          
          <Paper elevation={0} className={classes.userBadge} >
            <Avatar src={`${Cons.url}/${Data.Picture}`} className={classes.Avatar} />
            <Typography className={clsx(classes.typography, !isPromiseReady && classes.loading)}>{isPromiseReady ? Data.FullName : "f"}</Typography>
          </Paper>
          <IconButton onClick={handleDrawerClose} >
            <ChevronLeft className={classes.icon} />
          </IconButton>
        </div>
        <Divider variant="middle" className={classes.divider}/>
        <List className={classes.List} >
          {items.map((text, index) => (
            <ListItem button className={clsx(classes.ListItem, activeWindow === text.text ? classes.active : text.text)} key={index} onClick={ChangePage} >
              <ListItemIcon fontSize="inherit">{text.icon}</ListItemIcon>
              <ListItemText primary={text.text} classes={{ primary: classes.listItemText }} />
            </ListItem>
          ))}
        </List>
        <Logo width="20rem" height="12rem"/>
        <Divider variant="middle" className={classes.divider}/>
        <List className={classes.List1}>
          <ListItem button className={classes.LogOut} onClick={CloseSession} >
            <ListItemIcon fontSize="inherit" ><ExitToApp className={classes.LogOuIcon} /></ListItemIcon>
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
        {PageSelector(Data)}
      </main>
    </div>
  );
}