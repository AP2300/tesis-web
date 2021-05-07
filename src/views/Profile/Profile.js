import React, { useState, useEffect } from 'react';
import TitleContainer from "../../components/TitleContainer"
import Modal from "../../components/Modal"
import Alert from '@material-ui/lab/Alert';
import clsx from 'clsx';
import { Paper, Avatar, Divider, Typography, TextField, Button, Snackbar, Slide, IconButton } from '@material-ui/core/';
import { Dialpad, Edit, Fingerprint, Mood, OpenInNew } from '@material-ui/icons/';
import { GetFullUserData, UpdateBasicData, UpdateAuthMethods, UpdateUserPassword, UpdateProfPicture } from "../../api/user"
import useStyles from "../../styles/Profile"
import { useHistory } from 'react-router';
import { EndSession } from '../../api/session';
import Notification from '../../components/Notifications';
import * as Cons from "../../api/constants"
import { DropzoneArea } from 'material-ui-dropzone';
var moment = require('moment');
moment().format();


export default function Profile(props) {
    const { FullName, Email, RegDate, Picture, IDUser } = props.Data
    const history = useHistory()
    const classes = useStyles();
    const [FormControl, setFormControl] = useState({ NameControl: "", EmailControl: "", PassControl: "", PassControlConfirm: "", selPicture: ""})
    const [UserData, setUserData] = useState("")
    const [IsPromiseReady, setIsPromiseReady] = useState(false)
    const [modal, setModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [noti, setNoti] = useState({ severity: "", open: false, description: "" })

    useEffect(() => {
        if (UserData === "") GetUserData()
    }, [UserData])


    const GetUserData = async () => {
        const res = await GetFullUserData()
        if (res) {
            let data = res.data.data.filter((biometric, index, self) =>
                index === self.findIndex((t) => (
                    t.Name === biometric.Name
                ))
            )

            if (data.findIndex((item) => item.Name === "Facial") === -1) {
                data.push({
                    Name: 'Facial',
                    IsActive: 0,
                    IDSecurity: 3,
                    disabled: true
                })
            }

            if (data.findIndex((item) => item.Name === "Huella") === -1) {
                data.push({
                    Name: 'Huella',
                    IsActive: 0,
                    IDSecurity: 2,
                    disabled: true
                })
            }

            data.sort(function (a, b) {
                var textA = a.Name[0].toUpperCase();
                var textB = b.Name[0].toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            });

            setUserData(data)
            setIsPromiseReady(true)
        } else {
            history.push({
                pathname: '/',
                state: { expired: true }
            });
        }
    }

    function getIcon(name) {
        if (name === "Facial") return <Mood />
        else if (name === "Huella") return <Fingerprint />
        else return <Dialpad />
    }

    function getNoti() {
        if (noti.open) return < Notification close={setNoti} data={noti} />
    }

    async function HandleClick(arg) {
        const params = {
            name: FormControl.NameControl === "" ? FullName : FormControl.NameControl,
            email: FormControl.EmailControl === "" ? Email : FormControl.EmailControl
        }
        if (arg === "name" || arg === "email") {
            if (FormControl.NameControl != "" || FormControl.EmailControl != "") {
                let reg = new RegExp(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
                if (reg.test(FormControl.EmailControl)) {
                    if(FormControl.EmailControl !== Email){
                        UpdateBasicData(params);
                        const res = await EndSession()
                        if (res) {
                            setTimeout(()=>{
                                history.push("/")
                            },400)
                        }
                    }else{
                        setNoti({
                            ...noti, severity: "warning",
                            description: "Se introdujo el correo electronico actual",
                            open: true
                        }) 
                    }
                } else {
                    setNoti({
                        ...noti, severity: "warning",
                        description: "Introduce un correo electronico valido",
                        open: true
                    })
                }
            } else {
                setNoti({
                    ...noti, severity: "warning",
                    description: "No se introdujeron datos nuevos",
                    open: true
                })
            }
        } else if (arg === "pass") {
            if (FormControl.PassControl !== "") {
                setModal(true)
            } else {
                setNoti({
                    ...noti, severity: "warning",
                    description: "No se introdujo una contraseña nueva",
                    open: true
                })
            }

        }
    }

    async function UpdatePassword() {
        if (FormControl.PassControlConfirm !== "") {
            const params = {
                OldPass: FormControl.PassControlConfirm,
                Password: FormControl.PassControl
            }
            UpdateUserPassword(params)

            const res = await EndSession()
            if (res) {
                setModal(false)
                history.push("/")
            }
        } else {
            setNoti({
                ...noti, severity: "error",
                description: "No introdujo la contraseña anterior",
                open: true
            })
        }
    }


    function Toggle(index) {
        let Update = JSON.parse(JSON.stringify(UserData))
        Update[index].IsActive = Number(!Update[index].IsActive)
        const IsToUpdate = Update.some(el => el.IsActive && el.Name != "Codigo")
        if (IsToUpdate) {
            const params = {
                id: Update[index].IDSecurity,
                active: Update[index].IsActive
            }
            const res = UpdateAuthMethods(params)
            if (!res) {
                history.push({
                    pathname: '/',
                    state: { expired: true }
                });
            }
            else setUserData(Update)
        } else {
            setNoti({
                ...noti, severity: "warning",
                description: "No puedes desactivar tu último metodo de autenticacion activo",
                open: true
            })

        }
    }

    function handleChange(e) {
        setFormControl({ ...FormControl, [e.target.name]: e.target.value })
    }

    function handleEditPhoto() {
        setEditModal(true)
    }

    async function EditPhoto() {
        const params={
            img:FormControl.selPicture[0],
            id: IDUser,
            actualPicture: Picture
        }
        const res = await UpdateProfPicture(params)
        if(res.data.success){
            setNoti({noti, severity: "success", description: "Foto actualizada correctamente", open: true})
            window.location.reload()
        }else{
            setNoti({noti, severity: "success", description: "Foto actualizada correctamente", open: true})
        }

    }

    return (
        <div className={classes.root}>
            <Paper className={classes.mainContainer}>
                <div className={classes.upperContainer}>
                    <div className={classes.leftUpperContainer}>
                        <Avatar src={`${Cons.url}/${Picture}`} className={classes.img} />
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
                        <Button onClick={handleEditPhoto}>Modificar foto de perfil<OpenInNew /></Button>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className={classes.bottomContainer}>
                    <div className={classes.LeftBox}>
                        <TitleContainer title="Metodos de autenticacion" >
                            <div className={classes.AuthContent}>
                                {IsPromiseReady ? UserData.map((d, index) => {
                                    if (d.Name !== "Codigo") {
                                        if (!d.disabled) {
                                            return (
                                                <Paper onClick={() => Toggle(index)} key={index}
                                                    className={clsx(classes.AuthItem, d.IsActive && classes.disabled, d.IsActive ? classes.green : classes.red)} elevation={1}>
                                                    <Paper className="AuthName" elevation={0}>{getIcon(d.Name)} <Typography>{d.Name}</Typography></Paper>
                                                    <Typography className="IsActive">{d.IsActive ? "Activo" : "Inactivo"}</Typography>
                                                </Paper>)
                                        } else {
                                            return (
                                                <Paper
                                                    className={clsx(classes.AuthItem, d.IsActive && classes.disabled, classes.gray)} elevation={1}>
                                                    <Paper className="AuthNameDis" elevation={0}>{getIcon(d.Name)} <Typography>{d.Name}</Typography></Paper>
                                                    <Typography className="IsDis">{"No registrado"}</Typography>
                                                </Paper>)
                                        }
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
                                <span>Correo Electronico</span>
                                <span>Contraseña</span>
                            </div>
                            <div className={classes.textFieldContainer2}>
                                <div className={classes.item}>
                                    <TextField id="NameM" variant="outlined" label="Nombre nuevo" onChange={handleChange}
                                        className={classes.textField} value={FormControl.Name} name="NameControl" />
                                    <Button className={classes.editButton} name="name" onClick={() => HandleClick("name")}><Edit /></Button>
                                </div>

                                <div className={classes.item}>
                                    <TextField id="EmailM" variant="outlined" label="Email nuevo" onChange={handleChange} type="email"
                                        className={classes.textField} value={FormControl.Email} name="EmailControl" helperText="modificar el correo cerrara la sesion" />
                                    <Button className={classes.editButton} onClick={() => HandleClick("email")}><Edit /></Button>
                                </div>

                                <div className={classes.item}>
                                    <TextField id="PassM" label="Contraseña nueva" variant="outlined" name="PassControl"
                                        className={classes.textField} type="password" value={FormControl.PassControl} onChange={handleChange} />
                                    <Button className={classes.editButton} id="password" onClick={() => HandleClick("pass")}><Edit /></Button>
                                </div>

                            </div>

                        </TitleContainer>
                    </div>
                </div>
            </Paper>
            {getNoti()}
            {modal && <Modal IsOpen={modal} close={setModal} PassConfirm={setFormControl} okFunction={UpdatePassword} title="Comprueba que eres tú">
                <div className={classes.Modal}>
                    <TextField id="Pass" label="Contraseña anterior" variant="outlined" value={FormControl.PassControlConfirm}
                        className={classes.textField} onChange={handleChange} name="PassControlConfirm" type="password" />
                </div>
                <Alert severity="warning" variant="filled">Completar esta acción cerrara la sesión</Alert>
            </Modal>}

            {editModal && <Modal IsOpen={editModal} close={setEditModal} okFunction={EditPhoto}
                title={`Modifica tu foto de perfil`}>
                <DropzoneArea filesLimit={1} dropzoneText="Arrastra un archivo o has click para seleccionar un archivo" showAlerts={false}
                    onAdd={(fileObjs) => setFormControl({...FormControl, selPicture:fileObjs})} 
                    onDrop={(fileObjs) => setFormControl({...FormControl, selPicture:fileObjs})} 
                    acceptedFiles={['image/*']}/>
            </Modal>}
        </div>
    );
}