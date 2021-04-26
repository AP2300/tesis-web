import React, { useState, useEffect } from 'react';
import { Paper, Snackbar, Slide, IconButton } from '@material-ui/core/';
import { Close, ReportProblemRounded, CheckCircle, Error } from '@material-ui/icons/';
import clsx from 'clsx';
import useStyles from '../styles/Notifications';

function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}

export default function Notification(props) {
    const { data } = props
    const classes = useStyles()
    const [state, setState] = useState({
        open: false,
        Transition: Slide,
    });

    useEffect(async () => {
        const res = await props.data
        if (res) {
            handleOpen(SlideTransition)
        }
    }, [props])

    function handleOpen(Transition) {
        setState({
            open: true,
            Transition,
        });
    };

    function handleClose() {
        setState({
            ...state,
            open: false,
        });
        setTimeout(() => {
            if (data.open) {
                props.close({ ...data, open: false })
            }
        }, 200)

    }

    function Severity(severity) {
        switch (severity) {
            case "warning":
                return [classes.orange, <ReportProblemRounded />]
            case "success":
                return [classes.green, <CheckCircle />]
            case "error":
                return [classes.red, <Error />]

            default:
                return ""
        }
    }

    return (
        <Snackbar open={state.open}
            onClose={handleClose}
            autoHideDuration={5000}
            TransitionComponent={state.Transition}
            key={state.Transition.name}
        >
            <Paper elevation={6} className={clsx(classes.Noti, Severity(data.severity)[0])}>
                <div className={classes.textContainer}>
                    <span className="icon">{Severity(data.severity)[1]}</span>
                    <span>{data.description}</span>
                </div>
                <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose} className="closeIcon">
                    <Close fontSize="small" />
                </IconButton>
            </Paper>
        </Snackbar>
    )
};

