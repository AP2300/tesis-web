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
        name = name.toLowerCase();
        let Update = JSON.parse(JSON.stringify(userData))
        console.log(Update[name]);
        Update[name][0].IsActive = Number(!Update[name][0].IsActive)
        let testDict = []
        for (let key in Update) {
            testDict.push(Update[key][0])
        }
        console.log(testDict)
        const IsToUpdate = testDict.some(el => el.IsActive && el.Name != "Codigo")
        if (IsToUpdate) {
            const params = {
                id: Update[name][0].IDSecurity,
                active: Update[name][0].IsActive
            }
            const res = UpdateAuthMethods(params)
            if (!res) history.push("/")
            else setUserData(Update)
        } else {
            console.log("asdasdasd")
            setNoti({
                severity: "warning",
                description: "No puedes desactivar tu último metodo de autenticacion activo",
                open: true
            })

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
            {(noti.open) ? <Notification close={setNoti} data={noti}/> : ""}
            <Paper className={classes.mainContainer}>
                <div className={classes.panelContainer}>
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
                            <div className={classes.userSecHeader}>
                                <Typography variant="h4" className={classes.userTitle}>
                                    Usuario: {activeUser}
                                </Typography>
                                <Typography gutterBottom variant="h6" className={classes.userCode}>
                                    Código de acceso: {userData.codigo[0].data}
                                </Typography>
                                <Divider orientation="horizontal" variant={"middle"} style={{width: "95%"}} />
                            </div>
                        
                        <div className={classes.motherContainer}>
                        
                            <Paper className={classes.facialContainer}>
                                <Typography variant="h5" className={classes.photoTitle}>
                                    Foto para reconocimiento facial
                                </Typography>
                                <Avatar className={classes.faceAvatar} src={`http://localhost:3001${userData.facial[0].data}`}/>
                                <div className={classes.photoButtonGroup}>
                                    <Button variant="contained" className={clsx([classes.button, classes.editButton])}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" className={clsx([classes.button, classes.deleteButton])}>
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
                            <Paper className={classes.fingerContainer}>
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
                                                                <Button variant="contained" className={clsx([classes.button, classes.deleteButton])}>
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
                                            {userData.huella[0].name}
                                        </Typography>
                                        </Paper>
                                        <Typography className="IsActive">
                                            {userData.huella[0].IsActive ? "Activo" : "Inactivo"}
                                        </Typography>
                                    </Paper>
                                </div>
                            </Paper>
                        </div>
                        </div>
                    ) :
                    <Typography className={classes.noInfoText}>
                        Seleccione un usuario para visualizar su información
                    </Typography>
                }
                    </Paper>
                </div>
            </Paper>
        </div>
    )
}