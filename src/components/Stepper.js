import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, StepContent, Button, Paper, TextField, Divider, FormControl, InputLabel, MenuItem, Select, CircularProgress } from '@material-ui/core/';
import { Fingerprint, AccountCircle, VpnKey, ExitToApp } from '@material-ui/icons/';
import { CreateUser } from "../api/admin"
import Notification from './Notifications';
import clsx from 'clsx';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: "100%",
        padding: 0
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
        padding: "1%",
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
    FormContainer: {
        padding: "4%"
    },
    formControl: {
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


export default function StepperComponent(props) {
    const classes = useStyles();
    const history = useHistory()
    const [activeStep, setActiveStep] = useState(0);
    const [formControl, setFormControl] = useState({ name: "", email: "", pass: "", type: 0, registeredID: "" })
    const [noti, setNoti] = useState({ severity: "", open: false, description: "" })
    const [loading, setLoading] = useState(false)

    const steps = getSteps();

    async function register(params) {
        const res = await CreateUser(params)

        if (res.data.success) {
            setFormControl({ ...formControl, registeredID: res.data.data.Inserted })
            setLoading(false)
            props.reload()
        } else if (res.data.success === false) {
            setNoti({ ...noti, severity: "error", open: true, description: `hubo un error creando el usuario, ${res.data.msg}` })
            setActiveStep(0)
            setLoading(false)
        } else {
            setNoti({ ...noti, severity: "error", open: true, description: "hubo un error creando el usuario, intentelo de nuevo" })
            setActiveStep(0)
            setLoading(false)
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => {
            console.log(activeStep);
            if (activeStep === 1) {
                let reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                if (formControl.name !== "" && formControl.email !== "" && formControl.pass !== "") {
                    if (reg.test(formControl.email)) {
                        setLoading(true)
                        const params = {
                            name: formControl.name,
                            email: formControl.email,
                            pass: formControl.pass,
                            type: formControl.type
                        }
                        register(params)
                        return prevActiveStep + 1
                    } else if (activeStep === 2) {
                        history.push(`/admin/security/${formControl.registeredID}`)
                        setFormControl({ ...formControl, registeredID: "" })
                    } else {
                        setNoti({ ...noti, severity: "warning", open: true, description: "Ingrese un correo electronico valido" })
                        return prevActiveStep - 2
                    }
                } else {
                    setNoti({ ...noti, severity: "warning", open: true, description: "Debe llenar todos los campos para continuar" })
                    return prevActiveStep
                }
                return prevActiveStep
            } else {
                return prevActiveStep + 1
            }
        });
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
            setLoading(false)
            return prevActiveStep - 1
        });
    };

    function handleChange(e) {
        setFormControl({ ...formControl, [e.target.name]: e.target.value })
    }

    function getNoti() {
        if (noti.open) return < Notification close={setNoti} data={noti} />
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
                            <MenuItem value={0}>Usuario</MenuItem>
                            <MenuItem value={1}>Administrador</MenuItem>
                        </Select>
                    </FormControl>
                </Paper>)
            case 2:
                return "El usuario ha sido creado, pero deben agregarse metodos de autenticacion para activarlo";
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
                            <div>{getStepContent(index)}</div>
                            <div className={classes.actionsContainer}>
                                <div>
                                    <Button
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        className={classes.button}
                                    >
                                        Atras
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={handleNext}
                                        className={classes.button}
                                    >
                                        {activeStep === steps.length - 1 ? `Ir a Administrar seguridad ` : 'Siguiente'}
                                        {!loading ? activeStep === steps.length - 1 ? <ExitToApp /> : ""
                                            : <CircularProgress style={{ color: "inherit", width: "20px", height: "20px", marginLeft: "4px" }} />}

                                    </Button>
                                </div>
                            </div>
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
            {getNoti()}
        </div>
    );
}