import React, { useState, useEffect } from 'react';
import TitleContainer from "../../components/TitleContainer"
import Modal from "../../components/Modal"
import { Paper, Avatar, Divider, Typography, TextField, Button, Snackbar, Slide, IconButton, Popper } from '@material-ui/core/';
import { Dialpad, Edit, Fingerprint, Mood, Close, ReportProblemRounded, Done } from '@material-ui/icons/';
import useStyles from "../../styles/Profile"
import { GetFullUserData, UpdateBasicData, UpdateAuthMethods, UpdateUserPassword } from "../../api/user"
import clsx from 'clsx';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from 'react-router';
import { EndSession } from '../../api/session';
var moment = require('moment');
moment().format();

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function Profile(props) {
    const { FullName, Email, RegDate } = props.Data
    const history = useHistory()
    const classes = useStyles();
    const [FormControl, setFormControl] = useState({ NameControl: "", EmailControl: "", PassControl: "", PassControlConfirm: "" })
    const [UserData, setUserData] = useState("")
    const [IsPromiseReady, setIsPromiseReady] = useState(false)
    const [state, setState] = useState({
        open: false,
        Transition: Slide,
    });
    const [modal, setModal] = useState(false)

    useEffect(() => {
        if (UserData === "") GetUserData()
    }, [UserData])


    ////////////////////////////////////////////////////// SNACKBAR ////////////////////////////////////////////////////

    function handleOpen(Transition) {
        setState({
            open: true,
            Transition,
        });
    };

    function handleClose() {
        setState({
            ...state,
            open: false,
        });
    };
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    const GetUserData = async () => {
        const res = await GetFullUserData()
        if (res) {
            setUserData(res.data.data)
            setIsPromiseReady(true)
        } else {
            history.push("/")
        }
    }

    function getIcon(name) {
        if (name === "Face") return <Mood />
        else if (name === "Finger") return <Fingerprint />
        else return <Dialpad />
    }

    function HandleClick(arg, event) {
        const params = {
            name: FormControl.NameControl === "" ? FullName : FormControl.NameControl,
            email: FormControl.EmailControl === "" ? Email : FormControl.EmailControl
        }
        if (arg === "name" || arg === "email") {
            if (FormControl.NameControl != "" || FormControl.EmailControl != "") {
                UpdateBasicData(params);
                window.location.reload();
            } else {
                //show warning
            }
        } else if (arg === "pass") {
            if(FormControl.PassControl !== ""){
                setModal(true)
            }else{
                //show warning
            }
            
        }
    }

    function UpdatePassword() {
        if(FormControl.PassControlConfirm !== ""){
            const params = {
                OldPass: FormControl.PassControlConfirm,
                Password: FormControl.PassControl
            }
            console.log("hola");
            UpdateUserPassword(params)
            EndSession()
            setModal(false)
            history.push("/")
        }else{
            //show warning
        }
    }


    function Toggle(index) {
        let Update = JSON.parse(JSON.stringify(UserData))
        Update[index].IsActive = Number(!Update[index].IsActive)
        const IsToUpdate = Update.some(el => el.IsActive && el.Name != "Code")
        if (IsToUpdate) {
            const params = {
                id: Update[index].IDBiometrics,
                active: Update[index].IsActive
            }
            const res = UpdateAuthMethods(params)
            if (!res) history.push("/")
            else setUserData(Update)
        } else {
            handleOpen(SlideTransition)
        }
    }

    function handleChange(e) {
        setFormControl({ ...FormControl, [e.target.name]: e.target.value })
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.mainContainer}>
                <div className={classes.upperContainer}>
                    <div className={classes.leftUpperContainer}>
                        <Avatar src="" className={classes.img} />
                        <Typography className={clsx("activeSince", IsPromiseReady ? "" : classes.loading)}>Activo desde:{IsPromiseReady ?
                            `${moment(RegDate).date()}` + `-${moment(RegDate).month() + 1}` + `-${moment(RegDate).year()}` : ""}</Typography>
                    </div>
                    <div className={classes.rightUpperContainer}>
                        <div className={classes.mainInfo}>
                            <Typography variant="h3" className={clsx("name", !IsPromiseReady && classes.loading)}>
                                {IsPromiseReady ? FullName : "||||||||||||||||||||||"}</Typography>
                            <Typography variant="subtitle1" className={clsx("secondary", !IsPromiseReady && classes.loading)}>
                                {IsPromiseReady ? Email : "|||||||||||||||||||||||||||||||||||||||||||||||||"} - Tipo Usuario</Typography>
                        </div>
                        <div className={classes.modifyImg}>
                            <Typography variant="h5">Modificar foto de perfil</Typography>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className={classes.bottomContainer}>
                    <div className={classes.LeftBox}>
                        <TitleContainer title="Metodos de autenticacion" >
                            <div className={classes.AuthContent}>
                                {IsPromiseReady ? UserData.map((d, index) => {
                                    if (d.Name !== "Code") {
                                        return (
                                            <Paper onClick={() => Toggle(index)} key={index}
                                                className={clsx(classes.AuthItem, d.IsActive && classes.disabled, d.IsActive ? classes.green : classes.red)} elevation={1}>
                                                <Paper className="AuthName" elevation={0}>{getIcon(d.Name)} <Typography>{d.Name}</Typography></Paper>
                                                <Typography className="IsActive">{d.IsActive ? "Activo" : "Inactivo"}</Typography>
                                            </Paper>)
                                    }
                                }) : <div className={classes.AuthContent}>
                                    <Paper className={clsx(classes.AuthItem, classes.loading)} />
                                    <Paper className={clsx(classes.AuthItem, classes.loading)} />
                                    <Paper className={clsx(classes.AuthItem, classes.loading)} />
                                </div>
                                }
                            </div>
                        </TitleContainer>
                    </div>
                    <div className={classes.RightBox}>
                        <TitleContainer title="Modificar perfil">
                            <div className={classes.textFieldContainer1}>
                                <span>Nombre</span>
                                <span>Email</span>
                                <span>Contraseña</span>
                            </div>
                            <div className={classes.textFieldContainer2}>
                                <div className={classes.item}>
                                    <TextField id="Name" variant="outlined" label="Nombre nuevo" onChange={handleChange}
                                        className={classes.textField} value={FormControl.Name} name="NameControl" />
                                    <Button className={classes.editButton} name="name" onClick={() => HandleClick("name")}><Edit /></Button>
                                </div>

                                <div className={classes.item}>
                                    <TextField id="Email" variant="outlined" label="Email nuevo" onChange={handleChange}
                                        className={classes.textField} value={FormControl.Email} name="EmailControl" />
                                    <Button className={classes.editButton} onClick={() => HandleClick("email")}><Edit /></Button>
                                </div>

                                <div className={classes.item}>
                                    <TextField id="Pass" label="Contraseña nueva" variant="outlined" name="PassControl"
                                        className={classes.textField} type="password" value={FormControl.PassControl} onChange={handleChange}/>
                                    <Button className={classes.editButton} id="password" onClick={() => HandleClick("pass", event)}><Edit /></Button>
                                </div>

                            </div>

                        </TitleContainer>
                    </div>
                </div>
            </Paper>
            <Snackbar open={state.open}
                onClose={handleClose}
                autoHideDuration={5000}
                TransitionComponent={state.Transition}
                key={state.Transition.name}
            >
                <Paper elevation={6} className={classes.Noti}>
                    <span className="icon"><ReportProblemRounded /></span> <span>No puedes desactivar la ultima autenticacion activa</span>
                    <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} className="closeIcon">
                        <Close fontSize="small" />
                    </IconButton>
                </Paper>
            </Snackbar>
            <Modal IsOpen={modal} close={setModal} PassConfirm={setFormControl} okFunction={UpdatePassword} title="Comprueba que eres tú">
                <div className={classes.Modal}>
                    <TextField id="Pass" label="Contraseña anterior" variant="outlined" value={FormControl.PassControlConfirm}
                        className={classes.textField} onChange={handleChange} name="PassControlConfirm" type="password"/> 
                </div>
                <Alert severity="warning" variant="filled">Completar esta acción cerrara la sesión</Alert>
            </Modal>
        </div>
    );
}