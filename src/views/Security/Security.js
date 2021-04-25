import React, { useState } from 'react';
import useStyles from '../../styles/Security';
import { Paper, Avatar, Divider, Typography, TextField, Button, Chip, Slide, IconButton } from '@material-ui/core/';
import { Dialpad, Edit, Fingerprint, Mood, Close, ReportProblemRounded, Done } from '@material-ui/icons/';
import {ToggleButton, ToggleButtonGroup} from '@material-ui/lab/';
import TitleContainer from '../../components/TitleContainer';

export default function Security(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Paper className={classes.mainContainer}>
                <Paper elevation={2} className={classes.leftContainer}>
                    <div className={classes.Code}>
                        <Typography className="Text">Tu codigo de acceso es: </Typography>
                        <Typography className={classes.CodeNumber}>1234557</Typography>
                    </div>
                    <Divider orientation="horizontal" variant={"middle"} />
                    <div className={classes.faceModel}>
                        <Typography className="Text" align="center">Foto para reconocimiento facial actual</Typography>
                        <Avatar src="" className={classes.img} />
                    </div>
                </Paper>
                <div className={classes.rightContainer}>
                    <Typography variant={"h4"} align="center">Usuario, estos son tus metodos de autenticacion
                    <Divider orientation="horizontal" variant={"middle"} flexItem />
                    </Typography>

                    <div className={classes.fingerContainer}>
                        <div className={classes.fingerBox}>
                        <TitleContainer title={`Huellas Registradas`}>
                            <Chip
                                className={classes.chip}
                                icon={<ReportProblemRounded />}
                                label="Las huellas estan desactivadas"
                            />
                        </TitleContainer>
                        </div>
                        <div className={classes.Buttons}>
                            
                        </div>
                    </div>

                </div>
            </Paper>
        </div>
    )
}
