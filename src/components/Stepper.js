import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepContent, Button, Paper, Typography, TextField, Divider, FormControl, InputLabel, MenuItem, Select } from '@material-ui/core/';
import { Fingerprint, AccountCircle, VpnKey, ExitToApp } from '@material-ui/icons/';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "100%",
        overflow: "hidden"
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        backgroundColor: "#51baffb2",
        color: "#4c4c4c",
        transition: "200ms",
        "&:hover": {
            transition: "200ms",
            backgroundColor: "#51baff",
            color: "whitesmoke"
        }
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
    Stepper: {
        "& .MuiStepContent-root": {
            backgroundImage: "linear-gradient( 53deg, #22f8ff 0%, #a07fff 9%, #c15fff 100%)",
            paddingRight: "0",
            paddingLeft: "5px",
            maxWidth: "70vw",
            border: "none",
            marginTop: "-4px",
            marginLeft: "17px",
            "& > *": {
                backgroundColor: "white",
                padding: "3%",
                maxWidth: "70vw",
            }
        },
        "& .MuiStepConnector-line.MuiStepConnector-lineVertical": {
            backgroundColor: "transparent",
            border: "none"
        },
        "& .MuiStepConnector-vertical": {
            padding: 0,
            marginBottom: "-4px"
        }
    },
    textField: {
        width: "100%",
        "& .MuiOutlinedInput-root": {
            borderRadius: "2rem",
            backgroundColor: "#bdbdbd6e",
        },
        marginBottom: "1em",
        ["& input"]: {
            height: ".3em",
        },
        "& .MuiFormLabel-root": {
            marginTop: "-5px",
            overflowWrap: "break-word"
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#3f51b5"
        },

    },
    FormContainer:{
        padding: "4%"
    },
    formControl:{
        display: "flex",
        width: "100%",
        justifyContent: "center"
    }
}));

const StepIconsStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, #22f8ff 0%, #a07fff 50%, #c15fff 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, #22f8ff 0%, #a07fff 50%, #c15fff 100%)',
    },
});

function getSteps() {
    return ['Nombre y correo', 'Crear contraseña y definir tipo de usuario', 'Agregar metodos de autenticacion'];
}


export default function StepperComponent() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = useState(0);
    const [formControl, setFormControl] = useState({ name: "", email: "", pass: "" , type: "usuario"})
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) =>{
            if(prevActiveStep ===3){

            }else return prevActiveStep + 1});
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    function handleChange(e) {
        setFormControl({ ...formControl, [e.target.name]: e.target.value })
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return (<Paper elevation={2} className={classes.FormContainer}>
                    <TextField name="name" autoComplete="off" id="name" label="Nombre"
                        variant="outlined" className={classes.textField} value={formControl.name} onChange={handleChange} />
                    <TextField name="email" autoComplete="off" id="email" label="Correo Electronico" type="email"
                        variant="outlined" className={classes.textField} value={formControl.email} onChange={handleChange} />
                </Paper>)
            case 1:
                return (<Paper elevation={2} className={classes.FormContainer}>
                    <TextField name="pass" autoComplete="off" id="pass" label="Contraseña" type="password"
                        variant="outlined" className={classes.textField} value={formControl.pass} onChange={handleChange} />
                    <Divider />
                    <FormControl variant="filled" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-filled-label">Tipo</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            value={formControl.type}
                            name="type"
                            onChange={handleChange}
                        >
                            <MenuItem value={"usuario"}>Usuario</MenuItem>
                            <MenuItem value={"admin"}>Administrador</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>)
            case 2:
                return "";
            default:
                return 'Unknown step';
        }
    }

    StepIcons.propTypes = {
        active: PropTypes.bool,
        completed: PropTypes.bool,
        icon: PropTypes.node,
    };

    function StepIcons(props) {
        const classes = StepIconsStyles();
        const { active, completed } = props;

        const icons = {
            1: <AccountCircle />,
            2: <VpnKey />,
            3: <Fingerprint />,
        };

        return (
            <div
                className={clsx(classes.root, {
                    [classes.active]: active,
                    [classes.completed]: completed,
                })}
            >
                {icons[String(props.icon)]}
            </div>
        );
    }

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical" className={classes.Stepper} >
                {steps.map((label, index) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={StepIcons} >{label}</StepLabel>
                        <StepContent>
                            <Typography>{getStepContent(index)}</Typography>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? `Ir a Administrar seguridad ` : 'Next'}
                                        {activeStep === steps.length - 1 ? <ExitToApp/> : ""}
                                        
                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </div>
    );
}