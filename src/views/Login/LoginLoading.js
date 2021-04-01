import React from 'react';
import useStyles from '../../styles/LoginLoading';
import Typography from '@material-ui/core/Typography';

export default function LoginLoading(props) {
    const classes = useStyles();

    return (
        props.isLoading ? (
            <div className={classes.cont}>
                <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                    Iniciando Sesion...
                </Typography>
                <div className={classes.root}>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        ) : (
            props.children
        )
    )
}