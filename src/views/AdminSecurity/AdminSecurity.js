import React, { useState, useEffect } from 'react';
import useStyles from '../../styles/AdminSecurity';
import { Paper, Avatar, Divider, Typography, List, ListItem, ListItemText, Button, Accordion, AccordionSummary, AccordionDetails, Dialog, DialogActions, DialogContent, DialogContentText} from '@material-ui/core/';
import { ChevronLeft, ChevronRight, People, Mood, ExpandMore, Fingerprint } from '@material-ui/icons/';
import { GetHistoryData, GetSecurityUserData, UpdateAuthMethods, DeleteMethod } from '../../api/user';
import Notification from '../../components/Notifications';
import { useHistory, useLocation } from 'react-router';
import clsx from 'clsx';

export default function AdminUserSecurity(props) {
    const history = useHistory();
    const [activeUser, setActiveUser] = useState("");
    const [userData, setUserData] = useState([{isActive: true, name: "Facial"}, {isActive: true, name: "Huella"}])
    const [userList, setUserList] = useState([])
    const [isPromiseReady, setIsPromiseReady] = useState(false);
    const [isSecDataReady, setIsSecDataReady] = useState(false);
    const [noti, setNoti] = useState({ severity: "", open: false, description: "" })
    const [open, setOpen] = useState({open: false});
    const [UsersPanel, setUsersPanel] = useState(true)
    const classes = useStyles();

    useEffect(async () => {
        console.log(props.match.params);
        if(userList.length == 0) {
            console.log(userList)
            let data = await GetHistoryData();
            if(data) {
                setUserList(data.data.data);
                console.log(userList);
                console.log(data.data.data)
                setIsPromiseReady(true);
                console.log(isPromiseReady);
            } else {
                history.push({
                    pathname: '/',
                    state: { expired: true }
                });
            }
        } else {
            console.log("Datos del usuario")
            if(Object.keys(props.match.params).length > 0) {
                const user = userList.filter(user => user.IDUser == props.match.params.id);
                if(user.length > 0) {
                    setActiveUser(user[0].FullName);
                    console.log(userList)
                    fetchUserSecurity(user[0].FullName, user[0].IDUser)
                }
                console.log(user)
            }
        }
    }, [userList])

    function handleClick() {
        setUsersPanel(!UsersPanel)
    }

    function Toggle(name) {
        name = name.toLowerCase();
        let Update = JSON.parse(JSON.stringify(userData))
        console.log(Update);
        Update[name][0].IsActive = Number(!Update[name][0].IsActive)
        let testDict = []
        for (let key in Update) {
            console.log(key)
            if(key !== "email" && key !== "isActive" && key !== "IDUser") testDict.push(Update[key][0])
        }
        console.log(testDict)
        const IsToUpdate = testDict.some(el => el.IsActive && el.Name != "Codigo")
        if (IsToUpdate) {
            const params = {
                id: Update[name][0].IDSecurity,
                active: Update[name][0].IsActive
            }
            const res = UpdateAuthMethods(params)
            if (!res) {
                history.push({
                    pathname: '/',
                    state: { expired: true }
                });
            } else setUserData(Update)
        } else {
            console.log("asdasdasd")
            setNoti({
                severity: "warning",
                description: "No puedes desactivar tu último metodo de autenticacion activo",
                open: true
            })

        }
    }

    const handleClickOpen = (id, IDUser) => {
        setOpen({open: true, id, IDUser});
    };
    
    const handleClose = () => {
        setOpen({open: false});
    };

    async function handleConfirmDelete() {
        console.log(open)
        let data = await DeleteMethod(open.id);
        console.log(data)
        if(data) {
            setOpen({open: false});
            setNoti({
                severity: "success",
                description: "Se ha eliminado la imagen satisfactoriamente",
                open: true
            })
            fetchUserSecurity(activeUser, open.IDUser)
        } else {
            history.push({
                pathname: '/',
                state: { expired: true }
            });
        }
    };

    async function fetchUserSecurity(name, id) {
        console.log(id);
        console.log(name)
        let data = await GetSecurityUserData(id);
        let d = ""
        const email = userList.filter(user => user.IDUser === id)[0].Email;
        const isActive = userList.filter(user => user.IDUser === id)[0].IsActive;
        const IDUser = userList.filter(user => user.IDUser === id)[0].IDUser;
        console.log(email, isActive)
        if(data) {
            if(data.data.data.length!=0) {
                console.log(data.data.data);
                const codigo = data.data.data.filter((d) => d.Name == "Codigo")
                const huella = data.data.data.filter((d) => d.Name == "Huella")
                const facial = data.data.data.filter((d) => d.Name == "Facial")
                d = {IDUser, isActive, email, codigo, huella, facial}
                console.log(d);
            } else {
                d = {}
                console.log(d);
                setNoti({
                    ...noti, severity: "warning",
                    description: "No hay información del usuario para mostrar",
                    open: true
                })
            }
            setActiveUser(name);
            setUserData(d);
            setIsSecDataReady(true);
        } else {
            history.push({
                pathname: '/',
                state: { expired: true }
            });
        }
    }

    return (
        <div className={classes.root}>
            {(noti.open) ? <Notification close={setNoti} data={noti}/> : ""}
            <Paper elevation={2} className={classes.mainContainer}>
                <Dialog
                    open={open.open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Desea eliminar la foto?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                            Confirmar
                        </Button>
                    </DialogActions>
                </Dialog>
                <div className={classes.panelContainer}>
                    <Paper className={clsx(UsersPanel ? classes.UserList : classes.UserListMinimized)}>
                        {UsersPanel ?
                            <div className="container">
                                <Typography align="center" className="Title">Usuarios</Typography>
                                <Divider variant="middle" className="divider"/>
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
                                            <List className={classes.List}>
                                                {isPromiseReady ? userList.map((data, index) => {
                                                    if(!data.IsAdmin) {
                                                        return (
                                                            <ListItem button key={index} onClick={() => {fetchUserSecurity(data.FullName, data.IDUser)}} className={clsx(classes.ListItem, activeUser === data.FullName ? classes.active : "")}>
                                                                <ListItemText primary={data.FullName} classes={{ primary: classes.listItemText }}/>
                                                            </ListItem>
                                                        )
                                                    }
                                                }) : "cargando"} 
                                            </List>
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
                                        <List className={classes.List}>
                                                {isPromiseReady ? userList.map((data, index) => {
                                                    if(data.IsAdmin) {
                                                        return (
                                                            <ListItem button key={index} onClick={() => {fetchUserSecurity(data.FullName, data.IDUser)}} className={clsx(classes.ListItem, activeUser === data.FullName ? classes.active : "")}>
                                                                <ListItemText primary={data.FullName} classes={{ primary: classes.listItemText }}/>
                                                            </ListItem>
                                                        )
                                                    }
                                                }) : "cargando"} 
                                            </List>
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
                    {(isSecDataReady && Object.keys(userData).length!=0) ? (
                        <Paper elevation={0} className={classes.dataContainer}>
                            <div className={classes.UpperContainer}>
                                <Typography className="name">{activeUser}</Typography>
                                <Typography className="code">{userData.codigo[0].data}</Typography>
                                <Typography className="EmailType">{userData.email}-{userData.isActive ? "Activo" : "Inactivo"}</Typography>
                            </div>
                            <Divider variant="middle"/>
                            <div className={classes.BottomContainer}>
                                {userData.facial.length !== 0 ? (
                                    <Paper elevation={2} className={classes.LeftContainer}>
                                        <Typography variant="h5" className={classes.photoTitle}>
                                            Foto para reconocimiento facial
                                        </Typography>
                                        
                                        <Avatar className={classes.faceAvatar} src={`http://localhost:3001${userData.facial[0].data}`}/>
                                        <div className={classes.photoButtonGroup}>
                                            <Button variant="contained" className={clsx([classes.button, classes.editButton])}>
                                                Editar
                                            </Button>
                                            <Button variant="contained" className={clsx([classes.button, classes.deleteButton])} onClick={() => handleClickOpen(userData.facial[0].IDBiometrics, userData.IDUser)}>
                                                Eliminar
                                            </Button>
                                        </div>
                                        <Paper onClick={() => Toggle(userData.facial[0].Name)} key={userData.facial[0].Name}
                                        className={clsx(classes.AuthItem, userData.facial[0].IsActive && classes.disabled, userData.facial[0].IsActive ? classes.green : classes.red)} elevation={1}>
                                            <Paper className="AuthName" elevation={0}>
                                                <Mood />
                                                <Typography>
                                                    {userData.facial[0].Name}
                                                </Typography>
                                            </Paper>
                                            <Typography className="IsActive">
                                                {userData.facial[0].IsActive ? "Activo" : "Inactivo"}
                                            </Typography>
                                        </Paper>
                                    </Paper>
                                ) : (
                                    <Paper elevation={2} className={classes.LeftContainer}>
                                        <Typography variant="h5" className={classes.photoTitle}>
                                            Foto para reconocimiento facial
                                        </Typography>
                                        <Typography variant="h5" className={classes.photoTitle}>
                                            No hay foto configurada
                                        </Typography>
                                    </Paper>
                                ) }
                                
                                {userData.huella.length !== 0 ? (
                                    <Paper elevation={2} className={classes.RightContainer}>
                                        <Typography variant="h5" className={classes.fingerTitle}>
                                            Huellas dactilares
                                        </Typography>
                                        <Divider orientation="horizontal" variant={"middle"} style={{width: "95%"}}/>
                                        <div className={classes.fingerInfoContainer}>
                                            {userData.huella.map((data, index) => {
                                                return (
                                                    <div key={data.IDBiometrics} className={classes.fingerDataContainer}>
                                                        <div className={classes.fingerContainer2}>
                                                            <Avatar className={classes.fingerAvatar}>
                                                                <Fingerprint style={{width: "50%", height: "50%"}}/>
                                                            </Avatar>
                                                                <div className={classes.fingerItem}>
                                                                    <div className={classes.fingerItemTitleContainer}>
                                                                        <Typography variant="h5" className={classes.fingerItemTitle}>
                                                                            Dedo {data.fingerName}
                                                                        </Typography>
                                                                    </div>
                                                                    
                                                                    <div className={classes.fingerItemButtonGroup}>
                                                                        <Button variant="contained" className={clsx([classes.button, classes.editButton])} style={{margin: "0.3em 0"}}>
                                                                            Editar
                                                                        </Button>
                                                                        <Button variant="contained" className={clsx([classes.button, classes.deleteButton])} onClick={() => handleClickOpen(data.IDBiometrics, userData.IDUser)}>
                                                                            Eliminar
                                                                        </Button>
                                                                    </div>
                                                                    
                                                                </div>                                                 
                                                        </div>
                                                        <Divider orientation="horizontal" variant={"middle"} style={{width: "80%"}} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        
                                        <div style={{width: "100%"}}>                                    
                                            <Divider orientation="horizontal" variant={"middle"} />
                                            <Paper onClick={() => Toggle(userData.huella[0].Name)} key={userData.huella[0].Name} className={clsx(classes.AuthItem, userData.huella[0].IsActive && classes.disabled, userData.huella[0].IsActive ? classes.green : classes.red)} elevation={1} style={{margin: "1em auto"}}>
                                            <Paper className="AuthName" elevation={0}>
                                                <Fingerprint />
                                                <Typography>
                                                    {userData.huella[0].Name}
                                                </Typography>
                                                </Paper>
                                                <Typography className="IsActive">
                                                    {userData.huella[0].IsActive ? "Activo" : "Inactivo"}
                                                </Typography>
                                            </Paper>
                                        </div>
                                    </Paper>
                                    ) 
                                    : (
                                        <Paper elevation={2} className={classes.RightContainer}>
                                            <Typography variant="h5" className={classes.fingerTitle}>
                                                Huellas dactilares
                                            </Typography>
                                            <Divider orientation="horizontal" variant={"middle"} style={{width: "95%"}}/>
                                            <Typography variant="h5" className={classes.fingerTitle}>
                                                No hay huellas dactilares configuradas
                                            </Typography>
                                        </Paper>
                                    )
                                }
                            </div>
                        </Paper>
                    ) :
                    <Typography className={classes.noInfoText}>
                        Seleccione un usuario para visualizar su información
                    </Typography>
                }
                </div>
            </Paper>
        </div>
    )
}