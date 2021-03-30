import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  "@keyframes loading ":{
    // from: {background: "#fff"},
    // to:  { background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)"},
    // "100%":{transform:" Translate(100%)" },
   " 0%": {backgroundPosition:"0% 50%"},
    "50%": {backgroundPosition:"100% 50%"},
    "100%": {backgroundPosition: "0% 50%"}
},
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: "330px",
    '& > *': {
      margin: "2%",
      width: "25%",
      height: theme.spacing(16),
      boxShadow: "3px 3px 4px 1px #00000052",
      animationName: '$loading',
      background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
      backgroundSize: "400% 400%",
      animationDuration: '1s',
      animationIterationCount:'infinite'
    },
        "& GraphBox" :{
        },
    justifyContent: "center"
  },
  borderBoxL: {
      borderTopLeftRadius: "1rem",
      borderBottomLeftRadius: "1rem",
  },
  borderBoxR: {
    borderTopRightRadius: "1rem",
    borderBottomRightRadius: "1rem",
  },
  GraphBox: {
      margin: theme.spacing(2),
      width: "82%",
      height: "50vh",

      animationName: '$loading',
      background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent)",
      backgroundSize: "400% 400%",
      animationDuration: '1s',
      animationIterationCount:'infinite'
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