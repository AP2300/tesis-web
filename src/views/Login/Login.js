import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import Card from '@material-ui/core/Card';
import Alert from '@material-ui/lab/Alert';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import useStyles from "../../styles/Login";
import { LogIn } from '../../api/session';
import LoginLoading from './LoginLoading';

function Login() {
    const classes = useStyles();
    let history = useHistory();
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [open, setOpen] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const btn = {
        textTransform: "none",
        borderRadius: "40px",
        marginTop: "0.5rem",
        padding: "0.55rem 1.5rem",
    }

    useEffect(() => {
        if (open) {
            setTimeout(() => { setOpen(false) }, 5000);
        }
    }, [open])

    async function handleLogin(e) {
        if(!email) {
            setMsg("El campo E-mail está vacío");
            setOpen(true);
        } else if (!pass) {
            setMsg("El campo Contraseña está vacío");
            setOpen(true);
        } else {
            setisLoading(true);
            console.log(isLoading);
            let params = {
                email,
                pass
            }
            goLogIn(params);
        }
    };

    const goLogIn = async (params) => {
        const response = await LogIn(params);
        console.log(response);
        if (response.data.success) {
            history.push("/dashboard");
        } else {
            setMsg("Los datos ingresados son inválidos, intente nuevamente");
            console.log(msg);
            setOpen(true);
        }
    }

    return (
        <div>
            {open && (
                <Alert className={classes.alert} severity="error" onClose={() => { setOpen(false) }}>{msg}</Alert>)}
            <div className={classes.login}>
                <Card className={classes.root}>
                    <LoginLoading isLoading={isLoading}>
                        <Avatar className={classes.avatar} alt="" src="" />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Inicia Sesion
                            </Typography>
                            <Divider className={classes.divider} variant="middle" />
                            <ValidatorForm
                                onSubmit={handleLogin}
                                className={classes.textFields}
                                onError={errors => console.log(errors)}
                                instantValidate={true}
                            >
                                <Typography gutterBottom variant="body1" component="h2">
                                    E-mail
                                </Typography>
                                <TextValidator
                                    id="outlined-email"
                                    label="E-mail"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    name="email"
                                    value={email}
                                    variant="outlined"
                                    className={classes.textField}
                                    validators={['required', 'isEmail']}
                                    errorMessages={['El campo no puede estar vacío', 'Correo inválido']}
                                />
                                <Typography gutterBottom variant="body1" component="h2">
                                    Contraseña
                                </Typography>
                                <TextValidator
                                    id="outlined-pass"
                                    label="Contraseña"
                                    type="password"
                                    onChange={(e) => { setPass(e.target.value) }}
                                    name="pass"
                                    value={pass}
                                    variant="outlined"
                                    className={classes.textField}
                                    validators={['required']}
                                    errorMessages={['El campo no puede estar vacío']}
                                />
                                <Button type="submit" variant="contained" style={btn}>
                                    Iniciar Sesion
                                </Button>
                            </ValidatorForm>
                        </CardContent>
                    </LoginLoading>
                </Card>
            </div>
        </div>

    );
}

export default Login;