import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useStyles from '../../styles/AdminSecurity';
import PeopleIcon from '@material-ui/icons/People';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Mood from '@material-ui/icons/Mood';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Notification from '../../components/Notifications';
import clsx from 'clsx';
import { GetHistoryData, GetSecurityUserData, UpdateAuthMethods } from '../../api/user';
import { useHistory } from 'react-router-dom';

export default function AdminSecurity() {
    const history = useHistory();
    const [animations, setAnimations] = useState({ Minimize: false });
    const [activeUser, setActiveUser] = useState("");
    const [userData, setUserData] = useState([{isActive: true, name: "Facial"}, {isActive: true, name: "Huella"}])
    const [userList, setUserList] = useState([])
    const [isPromiseReady, setIsPromiseReady] = useState(false);
    const [isSecDataReady, setIsSecDataReady] = useState(false);
    const [noti, setNoti] = useState({ severity: "", open: false, description: "" })
    const classes = useStyles();

    useEffect(async () => {
        if(userList.length == 0) {
            console.log(userList)
            let data = await GetHistoryData();
            if(data) {
                setUserList(data.data.data);
                console.log(userList);
                setIsPromiseReady(true);
                console.log(isPromiseReady);
            }
        } else {
            console.log("false")
        }
    }, [userList])

    function handleMinimize() {
        if (!animations.Minimize) setAnimations({ Minimize: true })
        else setAnimations({ Minimize: false })
    }

    function Toggle(name) {
        let Update = JSON.parse(JSON.stringify(userData))
        console.log(Update);
        Update[name].IsActive = Number(!Update[name].IsActive)
        const IsToUpdate = Update[name].some(el => el.IsActive && el.Name != "Codigo")
        if (IsToUpdate) {
            const params = {
                id: Update[name].IDSecurity,
                active: Update[name].IsActive
            }
            const res = UpdateAuthMethods(params)
            if (!res) history.push("/")
            else setUserData(Update)
        } else {
            console.log("asdasdasd")
            /*setNoti({
                ...noti, severity: "warning",
                description: "No puedes desactivar tu último metodo de autenticacion activo",
                open: true
            })*/

        }
    }

    async function fetchUserSecurity(name, id) {
        console.log(id);
        console.log(name)
        let data = await GetSecurityUserData(id);
        let d = ""
        
        if(data) {
            if(data.data.data.length!=0) {
                console.log(data.data.data);
                const codigo = data.data.data.filter((d) => d.Name == "Codigo")
                const huella = data.data.data.filter((d) => d.Name == "Huella")
                const facial = data.data.data.filter((d) => d.Name == "Facial")
                d = {codigo, huella, facial}
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
        }
    }

    return(
        <div className={classes.root}>
            {(setNoti.open) ? <Notification data={setNoti}/> : ""}
            <Paper className={classes.mainContainer}>
                {/* <div className={classes.panelContainer}> */}
                    <Paper className={clsx(!animations.Minimize ? [classes.maximizedContainerUsers, classes.dataContainer] : [classes.minimizedContainerUsers, classes.logo])} elevation={2}>
                        {!animations.Minimize ? (
                            <div style={{width: "100%", height: "100%"}}>
                                <Typography gutterBottom variant="h4">
                                    Usuarios:
                                </Typography>
                                <List className={classes.List}>
                                    {isPromiseReady ? userList.map((data, index) => {
                                        return (
                                            <ListItem button key={index} onClick={() => {fetchUserSecurity(data.FullName, data.IDUser)}} className={clsx(classes.ListItem, activeUser === data.FullName ? classes.active : "")}>
                                                <ListItemText primary={data.FullName} classes={{ primary: classes.listItemText }}/>
                                            </ListItem>
                                        )
                                    }) : "cargando"} 
                                </List>
                            </div>
                        )
                        : <PeopleIcon fontSize="large"/>}
                    </Paper>
                    <Button className={classes.minimizerButton} onClick={handleMinimize}>
                        {animations.Minimize ? <ChevronRightIcon className="icon" /> : <ChevronLeftIcon className="icon" />}
                    </Button>
                    <Paper className={clsx(animations.Minimize ? classes.maximizedContainerSecurity : classes.minimizedContainerSecurity)}>
                    {(isSecDataReady && Object.keys(userData).length!=0) ? (
                        <div className={classes.dataContainerSec}>
                            <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", padding: "1em 0em 0em 0em",}}>
                                <Typography variant="h4" style={{fontSize: "calc(1em + 1vw)" }}>
                                    Usuario: {activeUser}
                                </Typography>
                                <Typography gutterBottom variant="h6" style={{fontSize: "calc(0.7em + 0.7vw)" }}>
                                    Código de acceso: {userData.codigo[0].data}
                                </Typography>
                                <Divider orientation="horizontal" variant={"middle"} style={{width: "95%"}} />
                            </div>
                        
                        <div className={classes.motherContainer}>
                        
                            <Paper className={classes.facialContainer}>
                                <Typography variant="h5" style={{fontSize: "calc(0.8em + 0.8vw)", margin: "0.3em 0"}}>
                                    Foto para reconocimiento facial
                                </Typography>
                                <Avatar className={classes.faceAvatar} src={`http://localhost:3001${userData.facial[0].data}`}/>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", width: "100%"}}>
                                    <Button variant="filled" className={[classes.button, classes.editButton]}>
                                        Editar
                                    </Button>
                                    <Button variant="filled" className={[classes.button, classes.deleteButton]}>
                                        Eliminar
                                    </Button>
                                </div>
                                <Paper onClick={() => Toggle(userData.facial.Name)} key={userData.facial.Name}
                                className={clsx(classes.AuthItem, userData.facial.IsActive && classes.disabled, userData.facial.IsActive ? classes.green : classes.red)} elevation={1}>
                                    <Paper className="AuthName" elevation={0}>
                                        <Mood />
                                        <Typography>
                                            {userData.facial.Name}
                                        </Typography>
                                    </Paper>
                                    <Typography className="IsActive">
                                        {userData.facial.IsActive ? "Activo" : "Inactivo"}
                                    </Typography>
                                </Paper>
                            </Paper>
                            <Paper className={classes.fingerContainer}>
                                <Typography variant="h5" style={{fontSize: "calc(0.8em + 0.8vw)", margin: "0.3em 0"}}>
                                    Huellas dactilares
                                </Typography>
                                <Divider orientation="horizontal" variant={"middle"} style={{width: "95%"}}/>
                                <div style={{overflowY: "scroll", width: "100%"}}>
                                    {userData.huella.map((data, index) => {
                                        return (
                                            <div key={data.IDBiometrics} style={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
                                                <div  style={{display: "flex", alignItems: "center", justifyContent: "space-evenly", flexDirection: "row", margin: "0.5em 0", width: "100%"}}>
                                                    <Avatar className={classes.fingerAvatar} style={{margin: "0.4em 0"}}>
                                                        <Fingerprint style={{width: "50%", height: "50%"}}/>
                                                    </Avatar>
                                                        <div style={{display: "flex", flexDirection: "column", width: "100%", justifyContent: "space-evenly"}}>
                                                            <div style={{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-evenly", width: "50%"}}>
                                                                <Typography variant="h5" style={{fontSize: "calc(0.6em + 0.6vw)", marginTop: "0.3em"}}>
                                                                    Dedo {data.fingerName}
                                                                </Typography>
                                                            </div>
                                                            
                                                            <div style={{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-evenly"}}>
                                                                <Button variant="filled" className={[classes.button, classes.editButton]} style={{margin: "0.3em 0"}}>
                                                                    Editar
                                                                </Button>
                                                                <Button variant="filled" className={[classes.button, classes.deleteButton]}>
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
                                    <Paper onClick={() => Toggle(userData.huella.Name)} key={userData.huella.Name} className={clsx(classes.AuthItem, userData.huella.IsActive && classes.disabled, userData.huella.IsActive ? classes.green : classes.red)} elevation={1} style={{margin: "1em auto"}}>
                                    <Paper className="AuthName" elevation={0}>
                                        <Fingerprint />
                                        <Typography>
                                            {userData.huella.name}
                                        </Typography>
                                        </Paper>
                                        <Typography className="IsActive">
                                            {userData.huella.IsActive ? "Activo" : "Inactivo"}
                                        </Typography>
                                    </Paper>
                                </div>
                            </Paper>
                        </div>
                        </div>
                    ) :
                    <Typography>
                        Seleccione un usuario para visualizar su información
                    </Typography>
                }
                    </Paper>
                {/* </div> */}
            </Paper>
        </div>
    )
}