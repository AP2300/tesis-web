import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  borderBoxL: {
      borderTopLeftRadius: "1rem",
      borderBottomLeftRadius: "1rem"
  },
  borderBoxR: {
    borderTopRightRadius: "1rem",
    borderBottomRightRadius: "1rem"
  },
  GraphBox: {
      margin: theme.spacing(2),
      width: "82%",
      height: "50vh",
      
  }
}));

export default function DashBoard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={classes.borderBoxL}/>
      <Paper elevation={0} />
      <Paper elevation={0} className={classes.borderBoxR} />

      <Paper elevation={0} className={classes.GraphBox}/>
    </div>
  );
}