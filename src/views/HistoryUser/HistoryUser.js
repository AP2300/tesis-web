import React, { useState, useEffect } from 'react';
import useStyles from "../../styles/HistoryUser"
import {
    Accordion, AccordionSummary, AccordionDetails, InputLabel,
    FormControlLabel, Typography, TextField, MenuItem, FormControl,
    Paper, Divider, AccordionActions, Select, IconButton, Button
} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import BarChartIcon from '@material-ui/icons/BarChart';
import SubjectIcon from '@material-ui/icons/Subject';
import clsx from 'clsx';

export default function HistoryUser(props) {
    const [animations, setAnimations] = useState({ Filter: false, Minimize: false })
    const [typeChart, setTypeChart] = useState("line")
    const classes = useStyles()


    function ShowFilters() {
        if (!animations.Filter) setAnimations({ ...animations, Filter: true })
        else setAnimations({ ...animations, Filter: false })
    }

    function handleMinimize() {
        if (!animations.Minimize) setAnimations({ ...animations, Minimize: true })
        else setAnimations({ ...animations, Minimize: false })
    }

    function handleChange() {

    }

    function GraphType(e) {
        setTypeChart(e.currentTarget.name)
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.mainContainer}>
                <div className={classes.ButtonDiv}>
                    <div className="AFC">
                        <Paper elevation={3} className={classes.ExpandibleButton} onClick={ShowFilters}>
                            Filtrar {!animations.Filter ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </Paper>
                        <Paper className={clsx(classes.ExpandibleContainer, animations.Filter && classes.ExpandedContainer)} elevation={3}>
                            <div className={clsx(classes.formControl, animations.Filter && classes.show)}>
                                <FormControl className="timestamp">
                                    <InputLabel id="Timestamp">Escala de tiempo</InputLabel>
                                    <Select
                                        labelId="Timestamp"
                                        id="Timestamp"
                                        value={""}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel id="week">Semana</InputLabel>
                                    <Select
                                        labelId="week"
                                        id="week"
                                        value={""}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel id="month">Mes</InputLabel>
                                    <Select
                                        labelId="month"
                                        id="month"
                                        value={""}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel id="year">Año</InputLabel>
                                    <Select
                                        labelId="year"
                                        id="year"
                                        value={""}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Paper>
                    </div>
                    <div className={classes.iconContainer}>
                        <IconButton onClick={GraphType} name="line" className={clsx(typeChart === "line" ? classes.selectedChart : "")}>
                            <i className="fas fa-chart-bar"></i></IconButton>
                        <IconButton onClick={GraphType} name="bar" className={clsx(typeChart === "bar" ? classes.selectedChart : "")}>
                            <i className="fas fa-chart-area"></i>
                        </IconButton>
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