import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton"
import { Close, Done, Backup, AddAPhoto, Delete, Replay } from '@material-ui/icons/';
import useStyles from "../styles/Modal";

export default function ModalComponent(props) {
    const { defaultButtons = true, buttonsDisabled = false, takePhoto = false, confirmPhoto = false, noButtons=true, facial = false} = props
    const classes = useStyles();
    const [open, setOpen] = useState(props.IsOpen);

    useEffect(() => {
        async function waitForProps() {
            const IsOpen = await props.IsOpen
            if (IsOpen) handleOpen()
        }
        waitForProps()
    }, [props])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        props.close(false)
    };

    const handleOK = () => {
        props.okFunction()
        setOpen(false);
        props.close(false)
    };

    const handleUploadPhoto = () => {
        props.uploadPhotoFunction()
        setOpen(false);
        props.close(false)
    };

    const handleTakePhoto = () => {
        setOpen(false);
        props.takePhotoFunction()
    };

    const handleDeletePicture = () => {
        props.deletePicture()
        setOpen(false);
        props.close(false)
    }

    const handleTakePic = () => {
        setOpen(false);
        props.handleTakePicFunction()
    }

    const handleRetakePic = () => {
        props.handleRetakePicFunction()
    }

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className={classes.title}>
                            <Typography variant="h5" align="center">{props.title}</Typography>
                        </div>

                        <Divider />
                        {props.children}
                        <br />
                        <Divider />
                        {defaultButtons ? (
                            <div className={classes.bottom}>
                                <IconButton className={classes.close} onClick={handleClose}>
                                    <Close /> Cancelar
                                </IconButton>
                                {props.deletePicture &&
                                    <IconButton className={classes.continue} onClick={handleDeletePicture}>
                                        <Delete /> Eliminar foto actual
                                    </IconButton>}
                                <IconButton className={classes.continue} onClick={handleOK}>
                                    <Done /> Continuar
                                </IconButton>
                            </div>
                        ) : takePhoto ? (
                            <div className={classes.bottom}>
                                <IconButton className={classes.close} onClick={handleClose}>
                                    <Close /> Cancelar
                                </IconButton>
                                <IconButton className={classes.continue} onClick={handleTakePic} >
                                    <AddAPhoto />  Tomar Foto
                                </IconButton>
                            </div>
                        ) : confirmPhoto ? (
                            <div className={classes.bottom}>
                                <IconButton className={classes.close} onClick={handleClose}>
                                    <Close /> Cancelar
                                </IconButton>
                                <IconButton className={classes.continue} onClick={handleRetakePic}>
                                    <Replay /> Volver a tomar
                                </IconButton>
                                <IconButton className={classes.continue} onClick={handleOK}>
                                    <Done /> Confirmar
                                </IconButton>
                            </div>
                        ) : !noButtons ? (
                            <div className={classes.bottom}>
                                <IconButton className={classes.close} onClick={handleClose}>
                                    <Close /> Cancelar
                                </IconButton>
                                <IconButton className={classes.continue} onClick={handleUploadPhoto} disabled={!buttonsDisabled.file}>
                                    <Backup />  Cargar Foto
                                </IconButton>
                                {console.log(buttonsDisabled.picture, buttonsDisabled.fileOm)}
                                {console.log(buttonsDisabled.fileOm)}
                                <IconButton className={classes.continue} onClick={handleTakePhoto} disabled={buttonsDisabled.picture ? !buttonsDisabled.picture : buttonsDisabled.fileOm && facial ? false : true}>
                                    <AddAPhoto />  Tomar Foto
                                </IconButton>
                            </div>
                        ): ""}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}