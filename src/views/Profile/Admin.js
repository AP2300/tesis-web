import React, {useState} from 'react';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Typography, Button, Switch,  } from '@material-ui/core';
import useStyles from "../../styles/Admin";
var moment = require('moment');
moment().format();

export default function Admin(props){
    const classes = useStyles();
    const { Data } = props;
    const Date = `${moment(Data.RegDate).date()}` + `-${moment(Data.RegDate).month()+1}` + `-${moment(Data.RegDate).year()}`;
    const [fullName, setFullName] = useState(Data.FullName);
    const [email, setEmail] = useState(Data.Email);
    const [newPass, setNewPass] = useState("");
    const [isActive, setIsActive] = useState(Boolean(Data.IsActive) );
    const [Pass, setPass] = useState(true);


    function handleUpdate(){
        console.log("HI")
    }

    function handlePass(){
        console.log("Men, i wanna Change my Pass")
    }

    return(
        <div className={classes.root}>
            <Typography className={classes.profileDate}>Perfil Creado: {Date}</Typography>
            <ValidatorForm
            onSubmit={handleUpdate}
            className={classes.textFields}
            onError={errors => console.log(errors)}
            instantValidate={true}
            >
                <Typography className={classes.typography}>Nombre Completo</Typography>
                <TextValidator
                id="outlined-fullName"
                onChange={(e) => { setFullName(e.target.value) }}
                name="fullName"
                value={fullName}
                variant="outlined"
                className={classes.textField}
                validators={['required']}
                errorMessages={['El campo no puede estar vacío']}
                />

                <Typography className={classes.typography}>Email</Typography>
                <TextValidator
                id="outlined-email"
                onChange={(e) => { setEmail(e.target.value) }}
                name="email"
                value={email}
                variant="outlined"
                className={classes.textField}
                validators={['required', 'isEmail']}
                errorMessages={['El campo no puede estar vacío', 'Correo inválido']}
                />
            </ValidatorForm>

            <Button variant="contained" className={classes.btn_changePass} onClick={() => setPass(!Pass)}>
                <Typography className={classes.typographybtn}>Cambiar Clave</Typography>
            </Button>
            
            <ValidatorForm
            onSubmit={handlePass}
            className={classes.textFields}
            onError={errors => console.log(errors)}
            instantValidate={true}
            >
                <Typography className={classes.typography}>Nueva Clave</Typography>
                <TextValidator
                id="outlined-newPass"
                onChange={(e) => { setNewPass(e.target.value) }}
                name="newPass"
                value={newPass}
                disabled={Pass}
                variant="outlined"
                className={classes.textField}
                validators={['required']}
                errorMessages={['El campo no puede estar vacío']}
                />
            </ValidatorForm> 

            <div className={classes.bottom}>
                <div>
                    <Typography className={classes.typographyState}>Estado</Typography>

                    <Switch
                    className={classes.switch}
                    checked={isActive}
                    onChange={() => {setIsActive(!isActive)}}
                    name="isActive"
                    color="primary"
                    />
                </div>
                <Button variant="contained" className={classes.btn_update}>
                    <Typography className={classes.typographybtn}>Actualizar</Typography>
                </Button>
            </div>
           
        </div>
    );

}