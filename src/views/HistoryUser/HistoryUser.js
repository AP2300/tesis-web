import React, { useState, useEffect } from 'react';
import useStyles from "../../styles/HistoryUser"
import {
    Accordion, AccordionSummary, AccordionDetails, InputLabel,
    FormControlLabel, Typography, TextField, MenuItem, FormControl,
    Paper, Divider, AccordionActions, Select, IconButton, Button
} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import TimelineIcon from '@material-ui/icons/Timeline';
import BarChartIcon from '@material-ui/icons/BarChart';
import SubjectIcon from '@material-ui/icons/Subject';
import clsx from 'clsx';

export default function HistoryUser(props) {
    const [animations, setAnimations] = useState({ Filter: false, Minimize: false })
    const classes = useStyles()


    function ShowFilters() {
        if (!animations.Filter) setAnimations({ ...animations, Filter: true })
        else setAnimations({ ...animations, Filter: false })
    }

    function handleMinimize() {
        if (!animations.Minimize) setAnimations({ ...animations, Minimize: true })
        else setAnimations({ ...animations, Minimize: false })
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.mainContainer}>
                <div className={classes.ButtonDiv}>
                    <Paper className={clsx(classes.ExpandibleContainer, animations.Filter && classes.ExpandedContainer)} elevation={3}>
                        <Paper elevation={3} className={classes.ExpandibleButton} onClick={ShowFilters}>
                            Filtrar<ChevronRightIcon />
                        </Paper>
                    </Paper>
                    <div>
                        <IconButton><TimelineIcon /></IconButton>
                        <IconButton><BarChartIcon /></IconButton>
                    </div>

                </div>
                <Divider variant="middle" />
                <div className={classes.panelContainer}>
                    <Paper className={clsx(!animations.Minimize ? classes.maximizedContainer : classes.minimizedContainer, classes.dataContainer)} elevation={2}>
                        {!animations.Minimize ? "" : <BarChartIcon />}
                    </Paper>
                    <Button className={classes.minimizerButton} onClick={handleMinimize}>
                        {animations.Minimize ? <ChevronRightIcon className="icon" /> : <ChevronLeftIcon className="icon" />}
                    </Button>
                    <Paper className={clsx(animations.Minimize ? classes.maximizedContainer : classes.minimizedContainer, classes.dataContainer)}>
                        {animations.Minimize ? "" : <SubjectIcon />}
                    </Paper>
                </div>
            </Paper>
        </div>
    )
}