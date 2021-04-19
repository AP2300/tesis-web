import React from 'react';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Typography } from '@material-ui/core';
import useStyles from "../../../styles/Info";
var moment = require('moment');
moment().format();

export default function Info(props){
    const classes = useStyles();
    const { Data } = props;
    const Date = `${moment(Data.RegDate).date()}` + `-${moment(Data.RegDate).month()+1}` + `-${moment(Data.RegDate).year()}`;
    console.log(Data)

    return(
        <div className={classes.root}>
            <Typography className={classes.profileDate}>Perfil Creado: {Date}</Typography>
            <ValidatorForm
            className={classes.textFields}
            onError={errors => console.log(errors)}
            instantValidate={true}
            >
                <Typography className={classes.typography}>Nombre Completo</Typography>
                <TextValidator
                id="outlined-fullName"
                name="fullName"
                value={Data.FullName}
                variant="outlined"
                disabled={false}
                className={classes.textField}
                validators={['required']}
                errorMessages={['El campo no puede estar vacío']}
                />

                <Typography className={classes.typography}>Email</Typography>
                <TextValidator
                id="outlined-email"
                name="email"
                value={Data.Email}
                disabled={false}
                variant="outlined"
                className={classes.textField}
                validators={['required', 'isEmail']}
                errorMessages={['El campo no puede estar vacío', 'Correo inválido']}
                />
            </ValidatorForm>
           
        </div>
    );

}