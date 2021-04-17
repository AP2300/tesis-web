import React, { useState, useEffect } from 'react';
import TitleContainer from "../../components/TitleContainer"
import { Paper, Avatar, Divider, Typography, TextField, Button } from '@material-ui/core/';
import { Edit, Mood } from '@material-ui/icons/';
import useStyles from "../../styles/Profile"

export default function Profile() {
    const classes = useStyles();
    const [NameControl, setNameControl] = useState("")
    const [EmailControl, setEmailControl] = useState("")

    function handleChange(e) {
        if (e.target.name === "NameControl") setNameControl(e.target.value)
        else if (e.taget.name === "EmailControl") setEmailControl(e.target.value)
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.mainContainer}>
                <div className={classes.upperContainer}>
                    <div className={classes.leftUpperContainer}>
                        <Avatar src="" className={classes.img} />
                        <Typography className="activeSince">Activo desde:</Typography>
                    </div>
                    <div className={classes.rightUpperContainer}>
                        <div className={classes.mainInfo}>
                            <Typography variant="h3" className="name">Nombre Usuario</Typography>
                            <Typography variant="subtitle1" className="secondary">Email - tipo Usuario</Typography>
                        </div>
                        <div className={classes.modifyImg}>
                            <Typography variant="h5">Modificar foto de perfil</Typography>
                        </div>
                    </div>
                </div>
                <Divider />
                <div className={classes.bottomContainer}>
                    <div className={classes.LeftBox}>
                        <TitleContainer title="Metodos de autenticacion" className={classes.titleContainer}>
                            <Paper className={classes.AuthItem} elevation={0}>
                                <Paper className="AuthName" elevation={0}><Mood /></Paper>
                            </Paper>
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
                                    <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleChange}
                                        className={classes.textField} disabled value={NameControl} name="NameControl" />
                                    <Button className={classes.editButton}><Edit /></Button>
                                </div>

                                <div className={classes.item}>
                                    <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={handleChange}
                                        className={classes.textField} disabled value={EmailControl} name="EmailControl" />
                                    <Button className={classes.editButton}><Edit /></Button>
                                </div>

                                <div className={classes.item}>
                                    <TextField id="outlined-basic" label="Contraseña nueva" variant="outlined" disabled className={classes.textField} />
                                    <Button className={classes.editButton}><Edit /></Button>
                                </div>

                            </div>

                        </TitleContainer>
                    </div>
                </div>
            </Paper>

        </div>
    );
}