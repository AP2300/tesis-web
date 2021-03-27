import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import DashBoard from "./DashBoard"
import {useTheme } from '@material-ui/core/styles';
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
import useStyles from "./Styles/Home"

const items = [{text:'Panel Personal',icon:<AccountBoxTwoToneIcon/>}, {text:'Historial',icon:<HistoryIcon/>}, {text:'Seguridad', icon:<LockTwoToneIcon/>},{text:'aiuda',icon:<InboxIcon/>}];

export default function Home() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
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
          <Typography  noWrap className={classes.userWelcome}>
            Usuario, bla bla bla
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
            <Avatar src="/broken-image.jpg"/>
            <Typography className={classes.typography}>Usuario</Typography>
          </Paper>
          <IconButton onClick={handleDrawerClose} >
           <ChevronLeftIcon className={classes.userWelcome}/>
          </IconButton>
        </div>
        <Divider variant="middle"/>
        <List className={classes.List} >
          {items.map((text, index) => (
            <ListItem button className={classes.ListItem} key={index}>
              <ListItemIcon>{text.icon}</ListItemIcon>
              <ListItemText primary={text.text}  classes={{primary:classes.listItemText}}/>
            </ListItem>
          ))}
        </List>
        <Divider variant="middle"/>
        <List className={classes.List}>
            <ListItem button className={classes.ListItem}>
              <ListItemIcon><ExitToAppIcon /></ListItemIcon>
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
        <DashBoard/>
      </main>
    </div>
  );
}