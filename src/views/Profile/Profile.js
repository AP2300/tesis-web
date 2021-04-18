import React, { useState, useEffect } from 'react';
import TitleContainer from "../../components/TitleContainer"
import { Paper, Avatar, Divider, Typography, TextField, Button } from '@material-ui/core/';
import { Dialpad, Edit, Fingerprint, Mood } from '@material-ui/icons/';
import useStyles from "../../styles/Profile"
import { GetFullUserData, UpdateBasicData } from "../../api/user"
import clsx from 'clsx';
var moment = require('moment');
moment().format();

export default function Profile(props) {
    const { FullName, Email, RegDate } = props.Data
    const classes = useStyles();
    const [NameControl, setNameControl] = useState("")
    const [EmailControl, setEmailControl] = useState("")
    const [UserData, setUserData] = useState("")
    const [IsPromiseReady, setIsPromiseReady] = useState(false)

    useEffect(() => {
        if (UserData === "") GetUserData()
    }, [UserData])


    const GetUserData = async () => {
        const res = await GetFullUserData()
        if (res) {
            setUserData(res.data.data)
            setIsPromiseReady(true)
        }
    }

    function getIcon(name) {
        if (name === "Face") return <Mood />
        else if (name === "Finger") return <Fingerprint />
        else return <Dialpad />
    }

    function HandleClick(arg) {
        const params = {
            name: NameControl === "" ? FullName : NameControl,
            email: EmailControl === "" ? Email : EmailControl
        }
        if (arg === "name" || arg === "email") {
            UpdateBasicData(params)
            location.reload()
        } else {

        }
    }

    function handleChange(e) {
        if (e.target.name === "NameControl") setNameControl(e.target.value)
        else if (e.target.name === "EmailControl") setEmailControl(e.target.value)
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
                                {IsPromiseReady ? Email : "|||||||||||||||||||||||||||||||||||||||||||||||||"} - tipo Usuario</Typography>
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
                                {IsPromiseReady ? UserData.map(d =>

                                    <Paper
                                        className={clsx(classes.AuthItem, d.IsActive ? classes.green : classes.red)} elevation={1}>
                                        <Paper className="AuthName" elevation={0}>{getIcon(d.Name)} <Typography>{d.Name}</Typography></Paper>
                                        <Typography className="IsActive">{d.IsActive ? "Activo" : "Inactivo"}</Typography>
                                    </Paper>

                                ) : <div className={classes.AuthContent}>
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
                                    <TextField id="outlined-basic" variant="outlined" label="Nombre nuevo" onChange={handleChange}
                                        className={classes.textField} value={NameControl} name="NameControl" />
                                    <Button className={classes.editButton} name="name" onClick={() => HandleClick("name")}><Edit /></Button>
                                </div>

                                <div className={classes.item}>
                                    <TextField id="outlined-basic" variant="outlined" label="Email nuevo" onChange={handleChange}
                                        className={classes.textField} value={EmailControl} name="EmailControl" />
                                    <Button className={classes.editButton} onClick={() => HandleClick("email")}><Edit /></Button>
                                </div>

                                <div className={classes.item}>
                                    <TextField id="outlined-basic" label="Contraseña nueva" variant="outlined" 
                                        className={classes.textField} />
                                    <Button className={classes.editButton} id="password" onClick={() => HandleClick("pass")}><Edit /></Button>
                                </div>

                            </div>

                        </TitleContainer>
                    </div>
                </div>
            </Paper>

        </div>
    );
}