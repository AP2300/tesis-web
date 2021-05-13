import React from 'react';
import useStyles from '../../styles/LoginLoading';
import Typography from '@material-ui/core/Typography';
import { Ellipsis } from 'react-css-spinners'

export default function LoginLoading(props) {
    const classes = useStyles();

    return (
        props.isLoading ? (
            <div className={classes.cont}>
                <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                    Iniciando Sesión...
                </Typography>
                <Ellipsis size={120} color={"#4f4f4f"}/>
            </div>
        ) : (
            props.children
        )
    )
}