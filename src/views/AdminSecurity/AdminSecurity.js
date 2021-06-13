import React, { useState, useEffect } from 'react';
import useStyles from '../../styles/AdminSecurity';
import { Paper, Avatar, Divider, Typography, List, ListItem, ListItemText, ListItemIcon, Button, Accordion, AccordionSummary, AccordionDetails, Chip, InputLabel, FormHelperText, FormControl, Select, MenuItem } from '@material-ui/core/';
import Alert from '@material-ui/lab/Alert';
import { ChevronLeft, ChevronRight, People, Mood, ExpandMore, Fingerprint, VerifiedUser, ReportProblemRounded, Add, CheckCircle } from '@material-ui/icons/';
import { GetHistoryData, GetSecurityUserData, UpdateAuthMethods, DeleteMethod, setFaceBlob, getFace, setFingerBlob, getFinger } from '../../api/user';
import Notification from '../../components/Notifications';
import Modal from '../../components/Modal';
import { useHistory } from 'react-router';
import { Ellipsis } from 'react-css-spinners'
import { DropzoneArea } from 'material-ui-dropzone';
import * as Cons from "../../api/constants";
import clsx from 'clsx';
import { ReactComponent as PersonaAnimation } from "../../styles/resources/Persona.svg"
import { ReactComponent as HuellaAnimation } from "../../styles/resources/Huella.svg"

export default function AdminUserSecurity(props) {
    const history = useHistory();
    const [activeUser, setActiveUser] = useState("");
    const [userData, setUserData] = useState([{ isActive: true, name: "Facial" }, { isActive: true, name: "Huella" }])
    const [userList, setUserList] = useState([])
    const [isPromiseReady, setIsPromiseReady] = useState(false);
    const [isSecDataReady, setIsSecDataReady] = useState(false);
    const [noti, setNoti] = useState({ severity: "", open: false, description: "" })
    const [open, setOpen] = useState({ open: false });
    const [openAdd, setOpenAdd] = useState({ open: false, name: "" });
    const [openEdit, setOpenEdit] = useState({ open: false, data: "" });
    const [UsersPanel, setUsersPanel] = useState(true);
    const [fileInfo, setFileInfo] = useState({ isAdded: false });
    const [handData, setHandData] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [face, setFace] = useState({ success: false, });
    const [finger, setFinger] = useState({ success: false, });
    const [fingerData, setFingerData] = useState({ value: "", array: [], fingers: ["Pulgar", "Indice", "Medio", "Anular", "Meñique"] });
    const [formCompleted, setFormCompleted] = useState({ file: false, picture: false, fileOm:true})
    const classes = useStyles();

    useEffect(() => {
        console.log(formCompleted)
        if (handData && fingerData.value) setFormCompleted({ ...formCompleted, picture: true })
        if (fileInfo.isAdded) setFormCompleted({ ...formCompleted, file: true })
    }, [fileInfo, fingerData, handData])

    useEffect(() => {
        console.log(openAdd)
    }, [openAdd])

    useEffect(async () => {
        console.log(props.match.params);
        async function GetData() {
            if (userList.length === 0) {
                console.log(userList)
                let data = await GetHistoryData();
                if (data) {
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
                if (Object.keys(props.match.params).length > 0) {
                    const user = userList.filter(user => user.IDUser === props.match.params.id);
                    if (user.length > 0) {
                        setActiveUser(user[0].FullName);
                        console.log(userList)
                        fetchUserSecurity(user[0].FullName, user[0].IDUser)
                    }
                    console.log(user)
                }
            }
        }
        GetData()
    }, [userList])

    useEffect(() => {
        if (face.success) {
            setIsLoading(false)
        }
    }, [face])

    useEffect(() => {
        if (handData) {
            console.log(userData)
            setFingerData({
                ...fingerData, array: userData.huella.filter((item) => {
                    return item.fingerName.includes(handData)
                })
            })
        }
    }, [handData])

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
            if (key !== "email" && key !== "isActive" && key !== "IDUser" && Update[key][0] !== undefined) testDict.push(Update[key][0])
        }
        console.log(testDict)
        const IsToUpdate = testDict.some(el => el.IsActive && el.Name !== "Codigo")
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
                description: "No puedes desactivar el último metodo de autenticacion activo",
                open: true
            })

        }
    }

    const handleClickOpen = (id, IDUser) => {
        setOpen({ open: true, id, IDUser });
    };

    const handleClose = () => {
        setOpen({ open: false });
    };

    async function handleConfirmDelete() {
        console.log(open)
        let data = await DeleteMethod(open.id);
        console.log(data)
        if (data) {
            setOpen({ open: false });
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

    function handleClickOpenAdd(name) {
        setOpenAdd({ open: true, name });
    }

    function handleCloseAdd() {
        setOpenAdd({ open: false, name: "" })
        setFileInfo({ isAdded: false })
        setFace({success: false})
        // setHandData("")
        // setFingerData({ ...fingerData, value: "", array: [] })
    }

    async function handleAddUpload() {
        const params = {
            face: fileInfo.fileObjs[0],
            id: userData.IDUser
        }
        console.log(params);
        const res = await setFace(params)
        console.log(res);
        if (res) {
            if (res.data.success) {
                setOpenAdd({ open: false, name: "" });
                setNoti({
                    severity: "success",
                    description: "Se ha agregado la imagen satisfactoriamente",
                    open: true
                })
                fetchUserSecurity(activeUser, userData.IDUser);
                setFileInfo({ isAdded: false });
            } else {
                setNoti({
                    severity: "error",
                    description: "Ha ocurrido un error, inténtelo nuevamente",
                    open: true
                })
            }
        } else {
            history.push({
                pathname: '/',
                state: { expired: true }
            });
        }
    }

    async function handleAddUploadFinger() {
        const params = {
            finger: fileInfo.fileObjs[0],
            id: userData.IDUser,
            fingerName: `${fingerData.value} ${handData}`
        }
        console.log(params);
        const res = await setFinger(params)
        console.log(res);
        if (res) {
            if (res.data.success) {
                setOpenAdd({ open: false, name: "" });
                setNoti({
                    severity: "success",
                    description: "Se ha agregado la imagen satisfactoriamente",
                    open: true
                })
                fetchUserSecurity(activeUser, userData.IDUser);
                setFileInfo({ isAdded: false });
            } else {
                setNoti({
                    severity: "error",
                    description: "Ha ocurrido un error, inténtelo nuevamente",
                    open: true
                })
            }
        } else {
            history.push({
                pathname: '/',
                state: { expired: true }
            });
        }
    }

    function handleAddTakePhoto(type) {
        if (type === "finger") {
            setOpenAdd({ open: true, name: "fingerInstructions" });
        } else if (type === "face") {
            setOpenAdd({ open: true, name: "faceInstructions" });
        }
    }

    async function handleAddTakePic(type) {
        setIsLoading(true)
        if (type === "fingerConfirm") {
            setOpenAdd({ open: true, name: "fingerAdd" });
            const res = await getFinger();
            if (res) {
                if (res.data.success) {
                    
                    setFinger({...finger, success: true})
                    const params = {
                        finger: b64toBlob(res.data.base64_img, "image/jpeg"),
                        id: userData.IDUser,
                        fingerName: `${fingerData.value} ${handData}`
                    }
                    const res2 = await setFingerBlob(params)
                    if (res2) {
                        setFinger({...finger, success: false})
                        setOpenAdd({ open: false, name: "" });
                        setFingerData({...fingerData, value: ""})
                        setHandData("")
                        setNoti({
                            severity: "success",
                            description: "Se ha agregado la imagen satisfactoriamente",
                            open: true
                        })
                        fetchUserSecurity(activeUser, userData.IDUser);
                        setFileInfo({ isAdded: false });
                    }

                } else {
                    setFingerData({ value: "", array: [], fingers: ["Pulgar", "Indice", "Medio", "Anular", "Meñique"] })
                    setOpenAdd({ open: false, name: "" })
                    setNoti({
                        severity: "error",
                        description: res.data.msg,
                        open: true
                    })
                }
            }
        } else if (type === "faceConfirm") {
            setOpenAdd({ open: true, name: "faceAdd" });
            const res = await getFace();
            if (res) {
                if (res.data.success) {
                    setFace(res.data)
                } else {
                    setOpenAdd({ open: false, name: "" })
                    setNoti({
                        severity: "error",
                        description: res.data.msg,
                        open: true
                    })
                }
            }

        }
    }

    function retakeFace() {
        setFace({success: false})
        handleAddTakePic("faceConfirm")
    }

    const b64toBlob = (b64Data, contentType = '', sliceSize = 512) => {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    };

    async function handleConfirmPhoto() {
        const params = {
            face: b64toBlob(face.base64_img, 'image/jpeg'),
            id: userData.IDUser
        }
        setFace({ success: false, })
        setIsLoading(true)
        console.log(params);
        const res = await setFaceBlob(params)
        console.log(res);
        if (res) {
            if (res.data.success) {
                setOpenAdd({ open: false, name: "" });
                setNoti({
                    severity: "success",
                    description: "Se ha agregado la imagen satisfactoriamente",
                    open: true
                })
                fetchUserSecurity(activeUser, userData.IDUser);
                setFileInfo({ isAdded: false });
            } else {
                setNoti({
                    severity: "error",
                    description: "Ha ocurrido un error, inténtelo nuevamente",
                    open: true
                })
            }
        } else {
            history.push({
                pathname: '/',
                state: { expired: true }
            });
        }
    }


    function handleFinger(e) {
        if (e.target.name === "hand") setHandData(e.target.value)
        if (e.target.name === "finger") setFingerData({ ...fingerData, value: e.target.value })
    }

    async function fetchUserSecurity(name, id) {
        console.log(id);
        console.log(name)
        let data = await GetSecurityUserData(id);
        let d = ""
        const email = userList.filter(user => user.IDUser === id)[0].Email;
        const isActive = userList.filter(user => user.IDUser === id)[0].IsActive;
        const IDUser = userList.filter(user => user.IDUser === id)[0].IDUser;
        console.log(email, isActive)
        if (data) {
            if (data.data.data.length > 0) {
                console.log(data.data.data);
                const codigo = data.data.data.filter((d) => d.Name === "Codigo")
                const huella = data.data.data.filter((d) => d.Name === "Huella")
                const facial = data.data.data.filter((d) => d.Name === "Facial")
                d = { IDUser, isActive, email, codigo, huella, facial }
                console.log(d);
                if (huella.length === 0 && facial.length === 0) {
                    setNoti({
                        ...noti, severity: "warning",
                        description: "No hay métodos de autenticación configurados",
                        open: true
                    })
                }
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

    /*const handleClickOpenEdit = (data) => {
        setOpenEdit({ open: true, data });
    };*/

    function handleCloseEdit() {
        setOpenEdit({ open: false, data: "" })
    }

    return (
        <div className={classes.root}>
            {(noti.open) ? <Notification close={setNoti} data={noti} /> : ""}
            <Paper elevation={2} className={classes.mainContainer}>
                <Modal IsOpen={open.open} close={handleClose} okFunction={handleConfirmDelete} title="Desea eliminar la foto?">
                    <Alert severity="warning" variant="filled" >Esta accion es irreversible</Alert>
                </Modal>
                {openAdd.name == "Huella" ? (
                    <Modal defaultButtons={false} noButtons={false} buttonsDisabled={formCompleted} IsOpen={openAdd.open} close={handleCloseAdd} uploadPhotoFunction={handleAddUploadFinger} takePhotoFunction={() => handleAddTakePhoto("finger")} title={"Agregar Dedo"}>
                        <div >
                            <DropzoneArea filesLimit={1} dropzoneText="Arrastra un archivo o haz click para seleccionar un archivo" showAlerts={false} acceptedFiles={['image/*']} onAdd={(fileObjs) => setFileInfo({ fileObjs, isAdded: true })} onDrop={(fileObjs) => setFileInfo({ fileObjs, isAdded: true })}
                                onDelete={() => setFileInfo({ isAdded: false })} />
                            <div style={{ display: "flex" }}>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel htmlFor="hand-native-required">Mano</InputLabel>
                                    <Select
                                        value={handData}
                                        onChange={handleFinger}
                                        name="hand"
                                        inputProps={{
                                            id: 'hand-native-required',
                                        }}
                                    >
                                        <MenuItem disabled value="">
                                            <em>Seleccionar</em>
                                        </MenuItem>
                                        <MenuItem value={"derecho"}>Derecha</MenuItem>
                                        <MenuItem value={"izquierdo"}>Izquierda</MenuItem>
                                    </Select>
                                    <FormHelperText>Obligatorio</FormHelperText>
                                </FormControl>
                                <FormControl required className={classes.formControl}>
                                    <InputLabel htmlFor="finger-native-required">Dedo</InputLabel>
                                    <Select
                                        value={fingerData.value}
                                        onChange={handleFinger}
                                        name="finger"
                                        inputProps={{
                                            id: 'finger-native-required',
                                        }}
                                    >
                                        {fingerData.array ? fingerData.fingers.map((finger, idx) => {
                                            for (let i of fingerData.array) {
                                                console.log(i)
                                                console.log(handData)
                                                if (i.fingerName.includes(finger)) {
                                                    return <MenuItem disabled key={idx} value={finger}>{finger}</MenuItem>
                                                }
                                            }
                                            return <MenuItem key={idx} value={finger}>{finger}</MenuItem>
                                        }) : ""}
                                    </Select>
                                    <FormHelperText>Obligatorio</FormHelperText>
                                </FormControl>
                            </div>
                        </div>
                    </Modal>
                ) : openAdd.name == "fingerInstructions" ? (
                    <Modal defaultButtons={false} noButtons={false} takePhoto={true} IsOpen={openAdd.open} close={handleCloseAdd} handleTakePicFunction={() => handleAddTakePic("fingerConfirm")} title={"Tomar imagen del dedo"}>
                        <div>
                            <HuellaAnimation width="300" height="300" className={classes.root} />
                        </div>
                    </Modal>
                ) : openAdd.name == "fingerAdd" ? (
                    <Modal defaultButtons={false} noButtons={true} confirmPhoto={false} IsOpen={openAdd.open} close={handleCloseAdd} handleRetakePicFunction={retakeFace} okFunction={handleConfirmPhoto} title={"Confirmar imagen del dedo"}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%" }}>
                            {isLoading  ? (

                                <Ellipsis size={120} color={"#4f4f4f"} />

                            ) : (
                                <CheckCircle style={{ fontSize: "8rem", color: "#4f4f4f" }} />
                            )}
                        </div>
                    </Modal>
                ) : openAdd.name == "Facial" ? (
                    <Modal defaultButtons={false} noButtons={false} IsOpen={openAdd.open} close={handleCloseAdd} uploadPhotoFunction={handleAddUpload} takePhotoFunction={() => handleAddTakePhoto("face")} buttonsDisabled={formCompleted} title={"Agregar imagen facial"}>
                        <div>
                            <Typography align="center">Ingrese la nueva foto facial</Typography>
                            <DropzoneArea filesLimit={1} dropzoneText="Arrastra un archivo o haz click para seleccionar un archivo" showAlerts={false} acceptedFiles={['image/*']} onAdd={(fileObjs) => setFileInfo({ fileObjs, isAdded: true })} onDrop={(fileObjs) => setFileInfo({ fileObjs, isAdded: true })}
                                onDelete={() => setFileInfo({ isAdded: false })} />
                        </div>
                    </Modal>
                ) : openAdd.name == "faceInstructions" ? (
                    <Modal defaultButtons={false} noButtons={false} takePhoto={true} IsOpen={openAdd.open} close={handleCloseAdd} handleTakePicFunction={() => handleAddTakePic("faceConfirm")} title={"Tomar imagen facial"}>
                        <div>
                            <PersonaAnimation width="300" height="300" className={classes.root} />
                        </div>
                    </Modal>
                ) : openAdd.name == "faceAdd" ? (
                    <Modal defaultButtons={false} noButtons={isLoading} confirmPhoto={!isLoading} IsOpen={openAdd.open} close={handleCloseAdd} handleRetakePicFunction={retakeFace} okFunction={handleConfirmPhoto} title={"Confirmar imagen facial"}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginTop: "5%" }}>
                            {isLoading ? (
                                <Ellipsis size={120} color={"#4f4f4f"} />
                            ) : (
                                <Avatar src={`data:image/jpeg;base64,${face.base64_img}`} style={{ width: "300px", height: "300px" }} />
                            )}
                        </div>
                    </Modal>
                ) : (null)}
                {/*<Modal defaultButtons={false} IsOpen={openEdit.open} close={handleCloseEdit} uploadPhotoFunction={handleEditUpload} takePhotoFunction={handleEditTakePhoto} disableUploadPhoto={!fileInfo.isAdded} title="Editar">
                    {openEdit.data.Name === "Huella" ? (
                        <div>
                            <Typography align="center">Dedo {openEdit.data.fingerName}</Typography>
                            <DropzoneArea filesLimit={1} dropzoneText="Arrastra un archivo o haz click para seleccionar un archivo" showAlerts={false} acceptedFiles={['image/*']} onAdd={(fileObjs) => setFileInfo({ isAdded: true })} onDrop={(fileObjs) => setFileInfo({ isAdded: true })}
                                onDelete={(fileObjs) => setFileInfo({ isAdded: false })} />
                        </div>
                    ) : openEdit.data.Name === "Facial" ? (
                        <div>
                            <Typography align="center">Ingrese la nueva foto facial </Typography>
                            <DropzoneArea filesLimit={1} dropzoneText="Arrastra un archivo o haz click para seleccionar un archivo" showAlerts={false} acceptedFiles={['image/*']} onAdd={(fileObjs) => setFileInfo({ isAdded: true })} onDrop={(fileObjs) => setFileInfo({ isAdded: true })}
                                onDelete={(fileObjs) => setFileInfo({ isAdded: false })} />
                        </div>
                    ) : (null)}

                </Modal>*/}
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
                                            <List className={classes.List}>
                                                {isPromiseReady ? userList.map((data, index) => {
                                                    if (!data.IsAdmin) {
                                                        return (
                                                            <List component="nav" aria-label="main mailbox folders" key={index} >
                                                                <ListItem button key={index} onClick={() => { fetchUserSecurity(data.FullName, data.IDUser) }} id={data.IDUser}>
                                                                    <ListItemIcon>
                                                                        <People />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={data.FullName} />
                                                                </ListItem>
                                                            </List>
                                                            /*
                                                            <ListItem button key={index} onClick={() => {fetchUserSecurity(data.FullName, data.IDUser)}} className={clsx(classes.ListItem, activeUser === data.FullName ? classes.active : "")}>
                                                                <ListItemText primary={data.FullName} classes={{ primary: classes.listItemText }}/>
                                                            </ListItem>*/
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
                                                    if (data.IsAdmin) {
                                                        return (
                                                            <List component="nav" aria-label="main mailbox folders" key={index}>
                                                                <ListItem button key={index} onClick={() => { fetchUserSecurity(data.FullName, data.IDUser) }} id={data.IDUser}>
                                                                    <ListItemIcon>
                                                                        <VerifiedUser />
                                                                    </ListItemIcon>
                                                                    <ListItemText primary={data.FullName} />
                                                                </ListItem>
                                                            </List>
                                                            /*
                                                            <ListItem button key={index} onClick={() => {fetchUserSecurity(data.FullName, data.IDUser)}} className={clsx(classes.ListItem, activeUser === data.FullName ? classes.active : "")}>
                                                                <ListItemText primary={data.FullName} classes={{ primary: classes.listItemText }}/>
                                                            </ListItem>*/
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
                    {(isSecDataReady && Object.keys(userData).length != 0) ? (
                        <Paper elevation={0} className={classes.dataContainer}>
                            <div className={classes.UpperContainer}>
                                <Typography className="name">{activeUser}</Typography>
                                <Typography className="code">{userData.codigo[0].data}</Typography>
                                <Typography className="EmailType">{userData.email}-{userData.isActive ? "Activo" : "Inactivo"}</Typography>
                            </div>
                            <Divider variant="middle" />
                            <div className={classes.BottomContainer}>
                                {userData.facial.length !== 0 ? (
                                    <Paper elevation={2} className={classes.LeftContainer}>
                                        <Typography variant="h5" className={classes.photoTitle}>
                                            Foto para reconocimiento facial
                                        </Typography>

                                        <Avatar className={classes.faceAvatar} src={`${Cons.url}${userData.facial[0].data}`} />
                                        <div className={classes.photoButtonGroup}>
                                            {/*<Button variant="contained" className={clsx([classes.button, classes.editButton])} onClick={() => handleClickOpenEdit(userData.facial[0])}>
                                                Editar
                                            </Button>*/}
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
                                    <Paper elevation={2} className={clsx(classes.LeftContainer, classes.noPhoto)}>
                                        <Typography variant="h5" className={classes.photoTitle}>
                                            Foto para reconocimiento facial
                                        </Typography>
                                        <div className={classes.noPhotoContent}>
                                            <Chip
                                                className={classes.chip}
                                                icon={<ReportProblemRounded />}
                                                label="No hay foto configurada"
                                            />
                                            <Button variant="contained" className={clsx([classes.button, classes.editButton])} onClick={() => handleClickOpenAdd("Facial")}>
                                                <Add />
                                                    Agregar foto
                                            </Button>
                                        </div>
                                    </Paper>
                                )}

                                {userData.huella.length !== 0 ? (
                                    <Paper elevation={2} className={classes.RightContainer}>
                                        <Typography variant="h5" className={classes.fingerTitle}>
                                            Huellas dactilares
                                        </Typography>
                                        <Divider orientation="horizontal" variant={"middle"} style={{ width: "95%" }} />
                                        <div className={classes.fingerInfoContainer}>
                                            {userData.huella.map((data, index) => {
                                                return (
                                                    <div key={data.IDBiometrics} className={classes.fingerDataContainer}>
                                                        <div className={classes.fingerContainer2}>
                                                            <Avatar className={classes.fingerAvatar}>
                                                                <Fingerprint style={{ width: "50%", height: "50%" }} />
                                                            </Avatar>
                                                            <div className={classes.fingerItem}>
                                                                <div className={classes.fingerItemTitleContainer}>
                                                                    <Typography variant="h5" className={classes.fingerItemTitle}>
                                                                        Dedo {data.fingerName}
                                                                    </Typography>
                                                                </div>

                                                                <div className={classes.fingerItemButtonGroup}>
                                                                    {/*<Button variant="contained" className={clsx([classes.button, classes.editButton])} style={{margin: "0.3em 0"}} onClick={() => handleClickOpenEdit(data)}>
                                                                            Editar
                                                                        </Button>*/}
                                                                    <Button variant="contained" className={clsx([classes.button, classes.deleteButton])} onClick={() => handleClickOpen(data.IDBiometrics, userData.IDUser)}>
                                                                        Eliminar
                                                                        </Button>
                                                                </div>

                                                            </div>
                                                        </div>
                                                        <Divider orientation="horizontal" variant={"middle"} style={{ width: "80%" }} />
                                                        {(userData.huella.length === (index + 1)) ? (
                                                            <Button variant="contained" className={clsx([classes.button, classes.editButton])} onClick={handleClickOpenAdd} style={{ margin: "1em 0" }} onClick={() => handleClickOpenAdd("Huella")}>
                                                                <Add />
                                                                Agregar foto
                                                            </Button>
                                                        ) : null}
                                                    </div>
                                                )
                                            })}
                                        </div>

                                        <div style={{ width: "100%" }}>
                                            <Divider orientation="horizontal" variant={"middle"} />
                                            <Paper onClick={() => Toggle(userData.huella[0].Name)} key={userData.huella[0].Name} className={clsx(classes.AuthItem, userData.huella[0].IsActive && classes.disabled, userData.huella[0].IsActive ? classes.green : classes.red)} elevation={1} style={{ margin: "1em auto" }}>
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
                                        <Paper elevation={2} className={clsx(classes.RightContainer, classes.noPhoto)}>
                                            <Typography variant="h5" className={classes.fingerTitle}>
                                                Huellas dactilares
                                            </Typography>
                                            <Divider orientation="horizontal" variant={"middle"} style={{ width: "95%" }} />
                                            <div className={classes.noPhotoContent}>
                                                <Chip
                                                    className={clsx(classes.chip)}
                                                    icon={<ReportProblemRounded />}
                                                    label="No hay huellas dactilares configuradas"
                                                />
                                                <Button variant="contained" className={clsx([classes.button, classes.editButton])} onClick={handleClickOpenAdd} style={{ margin: "1em 0" }} onClick={() => handleClickOpenAdd("Huella")}>
                                                    <Add />
                                                        Agregar foto
                                                </Button>
                                            </div>
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