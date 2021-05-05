import React, { useState, useEffect } from 'react';
import useStyles from '../../styles/AdminUser';
import { Paper, Avatar, Divider, Typography, List, ListItem, TextField, ListItemIcon, ListItemText, Button, Accordion, AccordionSummary, AccordionDetails, Switch } from '@material-ui/core/';
import { ChevronLeft, ChevronRight, People, Edit, Close, ExpandMore, Add, VerifiedUser } from '@material-ui/icons/';
import Notification from '../../components/Notifications';
import Stepper from "../../components/Stepper"
import { GetHistoryData } from "../../api/user"
import { AdminDataUpdate, AdminPassUpdate, DisableEnableUser } from "../../api/admin"
import clsx from 'clsx';

export default function AdminUser() {
    const [UsersPanel, setUsersPanel] = useState(true)
    const [users, setUsers] = useState({ usersList: [], userDisplay: "", userAdd: false })
    const [promises, setPromises] = useState({ users: false })
    const [selUser, setSelUser] = useState("")
    const [FormControl, setFormControl] = useState({ name: "", email: "", pass: "" })
    const [noti, setNoti] = useState({ severity: "", open: false, description: "" })
    const [isActive, setIsActive] = useState("");
    const classes = useStyles()

    function handleClick() {
        setUsersPanel(!UsersPanel)
    }

    function handleClose() {
        setTimeout(() => {
            setUsers({ ...users, userDisplay: "" })
        }, 300)
    }

    function handleAdd() {
        setTimeout(() => {
            setUsers({ ...users, userAdd: !users.userAdd })
        }, 300)
    }

    useEffect(() => {
        if (users.usersList.length === 0) GetUsers()
    }, [users.usersList])


    function SelectUser(e) {
        users.usersList.map((el, i) => {
            if (el.IDUser == e.currentTarget.id) {
                setUsers({ ...users, userDisplay: el, userAdd: false })
                setSelUser(i)
                setIsActive(users.usersList[i].IsActive)

            }
        })
    }

    const GetUsers = async () => {
        const res = await GetHistoryData()
        if (res) {
            setUsers({ ...users, usersList: res.data.data, userDisplay: res.data.data[selUser] })
            setPromises({ ...promises, users: true })
        }
        else window.location.reload()
    }

    async function HandleClick(arg) {
        const params = {
            id: users.userDisplay.IDUser,
            name: FormControl.name === "" ? users.userDisplay.FullName : FormControl.name,
            email: FormControl.email === "" ? users.userDisplay.Email : FormControl.email
        }
        const pass = {
            id: users.userDisplay.IDUser,
            pass: FormControl.pass
        }
        if (arg === "name" || arg === "email") {
            if (FormControl.name != "" || FormControl.email != "") {
                const res = await AdminDataUpdate(params);
                setUsers({ ...users, usersList: [] })
                setFormControl({ ...FormControl, name: "", email: "" })
                if (res.data.success) setNoti({ ...noti, severity: "success", description: "Datos actualizados correctamente", open: true })
                else setNoti({ ...noti, severity: "error", description: "Error al actualizar los datos", open: true })
            } else {
                setNoti({
                    ...noti, severity: "warning",
                    description: "No se introdujeron datos nuevos",
                    open: true
                })
            }
        } else if (arg === "pass") {
            if (FormControl.pass !== "") {
                const res = await AdminPassUpdate(pass)
                setFormControl({ ...FormControl, pass: "" })
                if (res.data.success) {
                    setNoti({
                        ...noti, severity: "success",
                        description: "Contraseña actualizada correctamente",
                        open: true
                    })
                } else {
                    setNoti({
                        ...noti, severity: "error",
                        description: "Error al actualizar la contraseña",
                        open: true
                    })
                }
            } else {
                setNoti({
                    ...noti, severity: "warning",
                    description: "No se introdujo una contraseña nueva",
                    open: true
                })
            }

        }
    }

    function getNoti() {
        if (noti.open) return < Notification close={setNoti} data={noti} />
    }

    function handleChange(e) {
        setFormControl({ ...FormControl, [e.target.name]: e.target.value })
    }

    const handleSwitch = () => {
        setIsActive(!isActive)
        setUsers({ ...users, userDisplay: { ...users.userDisplay, IsActive: Number(!users.userDisplay.IsActive) } })
        const params = {
            state: Number(!users.userDisplay.IsActive),
            id: users.userDisplay.IDUser
        }
        DisableEnableUser(params)
    };

    return (
        <div className={classes.root}>
            <Paper elevation={2} className={classes.mainContainer}>
                <div className={classes.panelContainer}>
                    <Paper className={clsx(UsersPanel ? classes.UserList : classes.UserListMinimized)}>
                        {UsersPanel ?
                            <div className="container">
                                <Typography align="center" className="Title">Usuarios</Typography>
                                <Divider variant="middle" className="divider" />
                                <div className="lists">
                                    <Accordion className="acordion">
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>Usuarios</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {promises.users && users.usersList.map((e, i) => {
                                                if (!e.IsAdmin) {
                                                    return (
                                                        <List component="nav" aria-label="main mailbox folders" key={i} >
                                                            <ListItem button onClick={SelectUser} id={e.IDUser}>
                                                                <ListItemIcon>
                                                                    <People />
                                                                </ListItemIcon>
                                                                <ListItemText primary={e.FullName} />
                                                            </ListItem>
                                                        </List>
                                                    )
                                                }
                                            })}
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion className="acordion">
                                        <AccordionSummary
                                            expandIcon={<ExpandMore />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header"
                                        >
                                            <Typography className={classes.heading}>Administradores</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            {promises.users && users.usersList.map((e, i) => {
                                                if (e.IsAdmin) {
                                                    return (
                                                        <List component="nav" aria-label="main mailbox folders" key={i}>
                                                            <ListItem button onClick={SelectUser} id={e.IDUser}>
                                                                <ListItemIcon>
                                                                    <VerifiedUser />
                                                                </ListItemIcon>
                                                                <ListItemText primary={e.FullName} />
                                                            </ListItem>
                                                        </List>
                                                    )
                                                }
                                            })}
                                        </AccordionDetails>
                                    </Accordion>
                                </div>

                            </div>
                            :
                            <People />
                        }
                    </Paper>
                    <Button className={classes.minimizerButton} onClick={handleClick}>
                        {UsersPanel ? <ChevronLeft className="icon" /> : <ChevronRight className="icon" />}
                    </Button>
                    <Paper elevation={0} className={classes.dataContainer}>
                        {!users.userAdd ? users.userDisplay ?
                            <div className="displayContainer">
                                <div className={classes.UpperContainer}>
                                    <Button onClick={handleClose} className={classes.closeButton}><Close /></Button>
                                    <Typography className="name">{users.userDisplay.FullName}</Typography>
                                    <Typography className="EmailType">{`${users.userDisplay.Email}`}</Typography>
                                </div>
                                <Divider variant="middle" />

                                <div className={classes.BottomContainer}>
                                    <Paper elevation={2} className={classes.LeftContainer}>
                                        <div className="pictureCont">
                                            <Avatar alt="Remy Sharp" src="" className="avatar" />
                                            <Divider variant="middle" flexItem style={{ height: "1px" }} />

                                            <div className={classes.modifyImg}>
                                                <Typography variant="h5">Modificar foto de perfil</Typography>
                                            </div>

                                            <Typography>
                                                Estado del usuario
                                            </Typography>
                                            <Divider variant="middle" flexItem style={{ height: "1px" }}/>

                                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                                                <Typography>Inactivo</Typography>
                                                <Switch
                                                    checked={Boolean(isActive)}
                                                    onChange={handleSwitch}
                                                    name="IsActive"
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                />
                                                <Typography>Activo</Typography>
                                            </div>


                                        </div>
                                        <Divider orientation="vertical" variant="middle" className="dividerV" />
                                        <div className="inputCont">
                                            <Typography align="center" variant="h6">Modificar Datos</Typography>
                                            <Divider variant="middle" flexItem style={{ height: "1px", marginBottom: "20px" }} />

                                            <div className="fields">
                                                <TextField name="name" autoComplete="off" id="name" label="Nombre" variant="outlined" className={classes.textField} value={FormControl.name} onChange={handleChange} />
                                                <Button className={classes.editButton} name="name" onClick={() => HandleClick("name")}><Edit /></Button>
                                            </div>

                                            <div className="fields">
                                                <TextField name="email" autoComplete="off" id="email" label="Correo Electronico" variant="outlined" type="email" className={classes.textField} value={FormControl.email} onChange={handleChange} />
                                                <Button className={classes.editButton} onClick={() => HandleClick("email")}><Edit /></Button>
                                            </div>

                                            <Typography align="center" variant="h6">Modificar Contraseña</Typography>
                                            <Divider variant="middle" flexItem style={{ height: "1px", marginBottom: "20px" }} />

                                            <div className="fields">
                                                <TextField name="pass" autoComplete="off" id="pass" label="Contraseña nueva" variant="outlined" type="password" className={classes.textField} value={FormControl.pass} onChange={handleChange} />
                                                <Button className={classes.editButton} id="password" onClick={() => HandleClick("pass")}><Edit /></Button>
                                            </div>
                                        </div>
                                    </Paper>
                                </div>
                            </div>
                            : <Typography align="center" variant="h3">
                                Seleccione un usuario
                                <Divider variant="middle" />
                                o crea un usuario nuevo
                                <br />
                                <Button className="addButton" onClick={handleAdd}><Add /></Button>
                            </Typography> :
                            <div className={classes.StepperCont}>
                                <div className="closeCont">
                                <Button className={classes.closeButton} onClick={handleAdd}><Close /></Button>
                                </div>
                                <div className="Stepper">
                                <Stepper></Stepper>
                                </div>
                            </div>

                        }

                    </Paper>
                </div>
            </Paper>
            {getNoti()}
        </div>
    )
}