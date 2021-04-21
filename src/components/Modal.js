import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from "@material-ui/core/IconButton"
import { Close, Done} from '@material-ui/icons/';


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: "1em",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 0),
    },
    title: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around"
    },
    close: {
        fontSize: "1em",
        borderRadius: "1em",
        color: "#f44336",
        backgroundColor: "#f4433612",
    },
    continue:{
        fontSize: "1em",
        borderRadius: "1em",
        color: "#2196f3",
        backgroundColor: "#2196f312",
    },
    bottom: {
        paddingTop: "3%",
        paddingBottom: "3%",
        display: "flex",
        justifyContent: "space-between"
    }
}));

export default function ModalComponent(props) {
    const classes = useStyles();
    const [open, setOpen] = useState(props.IsOpen);

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
                        <div className={classes.bottom}>
                            <IconButton className={classes.close} onClick={handleClose}>
                                <Close /> Cerrar
                            </IconButton>
                            <IconButton className={classes.continue} onClick={handleOK}>
                                <Done /> Aceptar
                            </IconButton>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}