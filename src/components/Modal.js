import React, { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton"
import { Close, Done, Backup, AddAPhoto} from '@material-ui/icons/';
import useStyles from "../styles/Modal";

export default function ModalComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(props.IsOpen);

    ModalComponent.defaultProps = {
        defaultButtons: true,
        disableUploadPhoto: false
    }

    useEffect(async () => {
        const IsOpen = await props.IsOpen
        if (IsOpen) handleOpen()
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
        props.takePhotoFunction()
        setOpen(false);
        props.close(false)
    };

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
                        {props.defaultButtons ? (
                            <div className={classes.bottom}>
                                <IconButton className={classes.close} onClick={handleClose}>
                                    <Close /> Cancelar
                                </IconButton>
                                <IconButton className={classes.continue} onClick={handleOK}>
                                    <Done /> Continuar
                                </IconButton>
                            </div>
                        ) : (
                            <div className={classes.bottom}>
                                <IconButton className={classes.close} onClick={handleClose}>
                                    <Close /> Cancelar
                                </IconButton>
                                <IconButton className={classes.continue} onClick={handleUploadPhoto} disabled={props.disableUploadPhoto}>
                                    <Backup />  Cargar Foto
                                </IconButton>
                                <IconButton className={classes.continue} onClick={handleTakePhoto}>
                                    <AddAPhoto />  Tomar Foto
                                </IconButton>
                            </div>
                        )}
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}