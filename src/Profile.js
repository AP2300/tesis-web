import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

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
        top: "16vh",
        left: "10%",
        marginLeft: "-6.5rem",
        height: "15rem",
        width: "15rem",
        overflow: "visible",
        boxShadow: "2px 2px 3px rgba(0,0,0,0.45)"
    },
    GraphBox: {
        margin: theme.spacing(2),
        position: "absolute",
        width: "75%",
        height: "75vh",
        top: "10vh",
        left: "20vw",
    },
    button_Edit: {
        background: "white",
        margin: theme.spacing(2),
        position: "absolute",
        top: "55vh",
        left: "2vw",
        width: "15vw",
        height: "6vh",
        borderRadius: "40px"
    },
    button_idk: {
        background: "white",
        margin: theme.spacing(2),
        position: "absolute",
        top: "70vh",
        left: "2vw",
        width: "15vw",
        height: "6vh",
        borderRadius: "40px"
    },
    typography: {
        fontWeight: 1000,
        marginLeft: "1rem",
    },
    username: {
        display: 'flex',
        margin: theme.spacing(2),
        position: "absolute",
        top: "35vh",
        left: "2vw",
        width: "15vw",
        height: "6vh",
        borderRadius: "40px",
        alignItems: "center",
        justifyContent: "center"
    }
  }));

export default function Profile() {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Avatar className={classes.avatar} alt="" src="" />

            <Paper elevation={0} className={classes.username}>
                <Typography className={classes.typography}>Nombre Usuario</Typography>
            </Paper>

            <Button variant="contained" className={classes.button_Edit}>
                <Typography className={classes.typography}>Editar Perfil</Typography>
            </Button>

            <Button variant="contained" className={classes.button_idk}>
                <Typography className={classes.typography}>IDK</Typography>
            </Button>

            <Paper elevation={0} className={classes.GraphBox}/>
        </div>
    );
}