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
        width: "75vh",
        height: "80vh",
        borderRadius: "10px",
        boxShadow: "0px 0px 8px 0px rgba(0,0,0,0.75)",
    },
    avatar: {
        margin: "auto",
        position: "absolute",
        top: "2vh",
        left: "50%",
        marginLeft: "-6.5rem",
        height: "13rem",
        width: "13rem",
        overflow: "visible"
    },
    cardContent: {
        marginTop: "10rem"
    },
    divider: {
        width: "83%",
        margin: "auto",
        marginBottom: "1rem"
    },
    textField: {
        width: "80%",
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
            height: "3rem"
        },
    },
    button: {
        textTransform: "none",
        borderRadius: "40px",
        marginBottom: "20rem",
        padding: "0.55rem 1.5rem",
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
                    <TextField className={classes.textField} id="outlined-basic" variant="outlined" />
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