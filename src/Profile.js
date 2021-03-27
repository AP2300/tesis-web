import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: "10px",
      minWidth: "330px",
      '& > *': {
        margin: "2%",
        width: "25%",
        height: theme.spacing(16),
        boxShadow: "3px 3px 4px 1px #00000052"
      },
          "& GraphBox" :{
          },
      justifyContent: "center"
    },
    avatar: {
        margin: "auto",
        position: "absolute",
        top: "1.55vh",
        left: "50%",
        marginLeft: "-6.5rem",
        height: "12rem",
        width: "12rem",
        overflow: "visible",
        boxShadow: "2px 2px 3px rgba(0,0,0,0.45)"
    },
    GraphBox: {
        margin: theme.spacing(2),
        width: "82%",
        height: "50vh",
        
    }
  }));

export default function Profile() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Avatar className={classes.avatar} alt="" src="" />
            

            <Paper elevation={0} className={classes.GraphBox}/>
        </div>
    );
}