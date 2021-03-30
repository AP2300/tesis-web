import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import useStyles from "./styles/Login";
import axios from 'axios';
import './Login.css';

function Login() {
    const classes = useStyles();
    let history = useHistory();
    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

    function handleLogin(e) {
        let params = {
            email,
            pass
        }

        axios.post('http://localhost:3001/login', params, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
        .then(res => {
            console.log(res)
            if(res.data.success) {
                history.push("/dashboard");
            }
        })
        .catch(err => {
            console.error(err); 
        })
    };

    return (
        <div className="Login">
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
                    <TextField className={classes.textField} label="E-mail" id="outlined-basic" variant="outlined" InputProps={classes.inputText} onChange={(e) => {setEmail(e.target.value)}}/>
                    <Typography gutterBottom variant="body1" component="h2">
                        Contraseña
                    </Typography>
                    <TextField className={classes.textField} id="outlined-basic" variant="outlined" type="password" label="Contraseña" onChange={(e) => {setPass(e.target.value)}}/>
                </form>
            </CardContent>
            <Button variant="contained" className={classes.button} onClick={handleLogin}>
                Iniciar Sesion
            </Button>
        </Card>
        </div>
    );
}

export default Login;