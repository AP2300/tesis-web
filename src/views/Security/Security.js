import React, { useEffect, useState } from 'react';
import useStyles from '../../styles/Security';
import { Paper, Avatar, Divider, Typography, List, ListItem, Chip, ListItemIcon, ListItemSecondaryAction, ListItemText, Tooltip, Switch } from '@material-ui/core/';
import { Fingerprint, Mood, ReportProblemRounded } from '@material-ui/icons/';
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab/';
import TitleContainer from '../../components/TitleContainer';
import Notification from '../../components/Notifications';
import { GetFullUserData, UpdateAuthMethods } from "../../api/user"
import { useHistory } from 'react-router';
import * as Cons from "../../api/constants";
import clsx from 'clsx';

export default function Security(props) {
    const classes = useStyles();
    const history = useHistory()
    const [formats, setFormats] = useState(() => []);
    const [isPromiseReady, setIsPromiseReady] = useState({ ReqPromise: false, PropsPromise: false})
    const [PropsPromise, setPropsPromise] = useState(false)
    const [state, setState] = useState({ Security: "", BasicData: "", Code: 0, checked: [], methods: [] })
    const [noti, setNoti] = useState({ severity: "", open: false, description: "" })

    // const handleToggle = (value) => () => {
    //     const currentIndex = state.checked.indexOf(value);
    //     const newChecked = [...state.checked];

    //     if (currentIndex === -1) {
    //         newChecked.push(value);
    //     } else {
    //         newChecked.splice(currentIndex, 1);
    //     }
    //     setState({ ...state, checked: newChecked });
    // }

    function getFingerStatus() {
        let newArr = []
        state.Security.forEach(e => {
            if (e.Name !== "Codigo" && e.Name !== "Facial") {
                if (e.IsActive) newArr.push(`${e.fingerName}`)
            }

        })
        setState({ ...state, checked: newArr })
    }

    useEffect(() => {
        if (state.Security === "") {
            console.log("primer UE");
            GetUserSecurityData()
        }
    }, [state.Security])

    useEffect(() => {
        if (state.Security !== "") {
            console.log("segundo UE");
            getFingerStatus()
            SetSideButton()
            console.log(state)
        }
    }, [state.Security])

    useEffect(() => {
        GetBasicData()
    }, [props])

    const GetBasicData = async () => {
        const Data = await props.Data
        console.log(Data, props.Data);
        if (Data) {
            console.log("tercer UE");
            setState({ ...state, BasicData: props.Data })
            // setIsPromiseReady({ ...isPromiseReady, PropsPromise: !isPromiseReady.PropsPromise })
            setPropsPromise(true)
        }
    }


    function getNoti() {
        if (noti.open) return < Notification close={setNoti} data={noti} />
    }

    const GetUserSecurityData = async () => {
        const res = await GetFullUserData()
        if (res) {
            setState({ ...state, Security: res.data.data })
            setIsPromiseReady({ ...isPromiseReady, ReqPromise: true })
        } else {
            history.push({
                pathname: '/',
                state: { expired: true }
            });
        }
    }

    async function SetSideButton() {
        let Arr = []
        let RefArr = []

        state.Security.forEach((el, i) => {
            if (el.Name !== "Codigo" && el.IsActive) {
                Arr.push(el.Name)
            }
            if (el.Name !== "Codigo") RefArr.push(el.Name)
        });
        let UniqueArr = [...new Set(Arr)]
        if (!RefArr.includes("Facial")) UniqueArr.push("FacialDis")
        if (!RefArr.includes("Huella")) UniqueArr.push("HuellaDis")
        console.log(RefArr);
        state.Security.forEach(e => { if (e.Name === "Codigo") setState({ ...state, Code: e.data ,  methods: RefArr }) })
        setFormats(UniqueArr)
    }


    const handleFormat = async (event, newFormats) => {
        if (event.currentTarget.name === "Huella") {
            const params = {
                id: 2,
                active: !formats.includes("Huella") ? 1 : 0
            }
            if (formats.includes("Facial")) {
                const res = await UpdateAuthMethods(params)
                if (!res) {
                    history.push({
                        pathname: '/',
                        state: { expired: true }
                    });
                }
                else {
                    setFormats(newFormats)
                    GetUserSecurityData()
                }
            } else {
                setNoti({ ...noti, severity: "error", description: "No puedes desactivar tu ultimo método activo", open: true })
            }

        } else if (event.currentTarget.name === "Facial") {
            const params = {
                id: 3,
                active: !formats.includes("Facial") ? 1 : 0
            }
            if (formats.includes("Huella")) {
                const res = await UpdateAuthMethods(params)
                if (!res) {
                    history.push({
                        pathname: '/',
                        state: { expired: true }
                    });
                }
                else setFormats(newFormats);
            } else {
                setNoti({ ...noti, severity: "error", description: "No puedes desactivar tu ultimo método activo", open: true })

            }

        }
    };

    function getFacialAuthPhoto() {
        const filter = state.Security.filter((el) => el.Name === "Facial")
        if (filter.length) {
            return filter[0].data
        }
        return ""
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.mainContainer}>
                <Paper elevation={2} className={classes.leftContainer}>
                    <div className={classes.Code}>
                        <Typography className="Text">Tu codigo de acceso es: </Typography>
                        <Typography className={clsx(classes.CodeNumber, state.Code === 0 ? classes.loading : "")}>
                            {state.Code === 0 ? "|||||||||||||" : state.Code}
                        </Typography>
                    </div>
                    <Divider orientation="horizontal" variant={"middle"} />
                    <div className={classes.faceModel}>
                        <Typography className="Text" align="center">Foto para reconocimiento facial actual: </Typography>
                        {!formats.includes("Facial") && <Chip
                            className={classes.chip}
                            icon={<ReportProblemRounded />}
                            label="El reconocimiento facial esta desactivado"
                        />}
                        {formats.includes("Facial") ?
                            <Avatar src={`${Cons.url}${state.Security ? getFacialAuthPhoto() : ""}`} className={classes.img} />
                            :
                            <Avatar className={classes.img} />
                        }

                    </div>
                </Paper>
                <div className={classes.rightContainer}>
                    <Typography variant={"h4"} align="center" className={clsx(!PropsPromise && classes.loading, classes.Title)}>{
                        PropsPromise ?
                            `${props.Data.FullName}, estos son tus metodos de autenticacion` :
                            "|||||||||||||||||||||||||||||||||||||||||||||||||||"}
                        <Divider orientation="horizontal" variant={"middle"} flexItem />
                    </Typography>

                    <div className={classes.fingerContainer}>
                        <div className={classes.fingerBox}>
                            <TitleContainer title={`Huellas Registradas`}>
                                {!formats.includes("Huella") && <Chip
                                    className={classes.chip}
                                    icon={<ReportProblemRounded />}
                                    label="Las huellas estan desactivadas"
                                />}
                                {formats.includes("Huella") ? <div className={classes.innerContainer}>
                                    <List className={classes.List}>
                                        {state.Security.map((el, i) => {
                                            if (el.Name !== "Codigo" && el.Name !== "Facial") {
                                                return (
                                                    <ListItem className="ListItem" key={i}>
                                                        <ListItemIcon>
                                                            <Fingerprint />
                                                        </ListItemIcon>
                                                        <ListItemText id="switch-list-label-wifi" primary={`${el.fingerName}`} />
                                                        <ListItemSecondaryAction>
                                                            {/* <Switch
                                                                edge="end"
                                                                onChange={handleToggle(`${el.fingerName}`)}
                                                                checked={state.checked.indexOf(`${el.fingerName}`) !== -1}
                                                                className={classes.Switch}
                                                                color="primary"
                                                                inputProps={{ 'aria-labelledby': 'switch-list-label-wifi' }}
                                                            /> */}
                                                        </ListItemSecondaryAction>
                                                    </ListItem>
                                                )
                                            }
                                        })}
                                    </List>
                                </div> : ""}
                            </TitleContainer>
                        </div>
                        <div className={classes.Buttons}>
                            <ToggleButtonGroup value={formats} onChange={handleFormat}
                                aria-label="text formatting" orientation="vertical" className={isPromiseReady ? classes.sideButton : classes.sideButtonUnloaded}>
                                    
                                {state.methods.includes("Huella") ?
                                    <ToggleButton value="Huella" aria-label="bold" name="Huella">
                                        <Fingerprint />
                                    </ToggleButton>
                                    : formats.includes("HuellaDis") ?
                                        <Tooltip title="Este método no se encuentra registrado" style={{ cursor: "default", backgroundColor: "#8080801c", color: "gray" }}>
                                            <ToggleButton value="" aria-label="bold" name="HuellaDis">
                                                <Fingerprint />
                                            </ToggleButton>
                                        </Tooltip>
                                        : "" }
                                {state.methods.includes("Facial") ?
                                    <ToggleButton value="Facial" aria-label="italic" name="Facial" >
                                        <Mood />
                                    </ToggleButton>
                                    : formats.includes("FacialDis") ?
                                        <Tooltip title="Este método no se encuentra registrado" >
                                            <ToggleButton value="" aria-label="italic" name="FacialDis" style={{ cursor: "default", backgroundColor: "#8080801c", color: "gray" }}>
                                                <Mood />
                                            </ToggleButton>
                                        </Tooltip>
                                        : ""}
                            </ToggleButtonGroup>
                        </div>
                    </div>

                </div>
            </Paper>
            {getNoti()}
        </div>
    )
}
