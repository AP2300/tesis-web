import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';


const useStyles = makeStyles((theme) => ({
    root: {
        width: "40vw",
        height: "81.5vh",
        borderRadius: "10px",
        boxShadow: "2px 2px 5px 1px rgba(0,0,0,0.45)",
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
    cardContent: {
        marginTop: "8.8rem"
    },
    divider: {
        width: "83%",
        margin: "auto",
        marginBottom: "1rem"
    },
    textField: {
        width: "80%",
        borderRadius: "2rem",
        backgroundColor:"#bdbdbd6e",

        marginBottom: "1em",
        ["& input"]:{
            height: "1em",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
          },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
          },
          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3f51b5"
          },

    },  
    inputText: {
        marginBottom: "1rem",
    },
    textFields: {
        [`&& typography`]: {
            marginTop: "1rem",
            
        },
        [`& fieldset`]: {
            borderRadius: "40px",
            height: "3rem",
            paddingBottom: "0.25rem",
            paddingTop: "0.2rem",
        },
    button: {
        textTransform: "none",
        borderRadius: "40px",
        marginBottom: "20rem",
        padding: "0.55rem 1.5rem",
    },
    }
}));

function Login() {
    const classes = useStyles();
    return (
        <div>
        <Card className={classes.root}>
            <Avatar className={classes.avatar} alt="" src="" />
            <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                Inicia Sesion
                </Typography>
                <Divider className={classes.divider} variant="middle" />
                <form noValidate autoComplete="off" className={classes.textFields}>
                    <Typography gutterBottom variant="body1" component="h2">
                        E-mail
                    </Typography>
                    <TextField className={classes.textField} label="E-mail" id="outlined-basic" variant="outlined" InputProps={classes.inputText}/>
                    <Typography gutterBottom variant="body1" component="h2">
                        Contraseña
                    </Typography>
                    <TextField className={classes.textField} id="outlined-basic" variant="outlined" type="password" label="Contraseña"/>
                </form>
            </CardContent>
            <Button variant="contained" className={classes.button}>
                Iniciar Sesion
            </Button>
        </Card>
        </div>
    );
}

export default Login;