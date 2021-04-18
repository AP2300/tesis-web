import React, { useState, useEffect } from 'react';
import {Paper} from "@material-ui/core";
import useStyles from '../styles/TitleContainer';
import clsx from 'clsx';

export default function TitleContainer(props) {
    const classes = useStyles();
    return (
        <Paper className={clsx(classes.ParentContainer, props.loading && classes.loading)} elevation={0}>
            <Paper className={classes.TitleContainer} elevation={0}>
                {props.title}
            </Paper>
            <div className={classes.content}>
                {props.children}
            </div>
        </Paper>
    );

}