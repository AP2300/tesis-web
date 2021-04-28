import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import useStyles from "../../styles/HistoryUser"
import clsx from 'clsx';
import {
    Accordion, AccordionSummary, AccordionDetails, InputLabel,
    FormControlLabel, Typography, TextField, MenuItem, FormControl,
    Paper, Divider, AccordionActions, Select, IconButton, Button
} from "@material-ui/core";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SvgIcon from '@material-ui/core/SvgIcon/SvgIcon';
import Chart from 'chart.js'
import BarChartIcon from '@material-ui/icons/BarChart';
import SubjectIcon from '@material-ui/icons/Subject';
import ChartComponent from '../../components/Chart';
import { GetHistoryUserData } from "../../api/user"
import { colors } from '../../api/constants';
import { FilterSearch, ChangeGraph, calcNumWeek, setGradientColor, GraphLabels, getYearRange } from '../../helpers/Graph';
const moment = require('moment');
moment().format();

export default function HistoryUser(props) {
    const [animations, setAnimations] = useState({ Filter: false, Minimize: false })
    const [Promises, setPromises] = useState({ isUserReady: false });
    const [Data, setData] = useState({ User: "", graph: "" });
    const [Dates, setDates] = useState({ week: "", month: moment().month(), year: moment().year() });
    const [States, setStates] = useState({ TimeStamp: "S", Type: "U", TypeChart: "bar", ShowGeneral: true });
    const classes = useStyles();
    const history = useHistory();
    const { User } = props;

    useEffect(() => {
        if (Data.User === "" || Data.User.length === 0) GetHistory()
    }, [Data.User])

    useEffect(() => {
        if (Dates.week === "") NumWeek(Dates.year, Dates.month);
    }, [Dates.week])

    useEffect(() => {
        if (Data.User.length !== 0) {
            handleFilterSearch(Data.User)
        }
    }, [Promises.isUserReady, Dates.week, Dates.month, Dates.year, States.TimeStamp])

    function ShowFilters() {
        if (!animations.Filter) setAnimations({ ...animations, Filter: true })
        else setAnimations({ ...animations, Filter: false })
    }

    function handleMinimize() {
        if (!animations.Minimize) setAnimations({ ...animations, Minimize: true })
        else setAnimations({ ...animations, Minimize: false })
    }

    const GetHistory = async () => {
        const res = await GetHistoryUserData(User.IDUser);
        if (res) {
            setData({ ...Data, User: res.data.data });
            if(res.data.data.length !== 0){
                setPromises({ ...Promises, isUserReady: true });
            }
        } else {
            history.push("/");
        }
    }

    function NumWeek(year, month) {
        let indexWeek = calcNumWeek(year, month);
        indexWeek.forEach((e, i) => {
            if (e === String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek'))) {
                setDates({ ...Dates, week: i });
            }
        });
    }

    async function handleFilterSearch() {
        setData({ ...Data, graph: ChangeGraph(States.TimeStamp, Dates.year, Dates.month, Dates.week,
            FilterSearch(Data.User, Dates.month, Dates.year, States.TimeStamp)) });
    }

    function getDataGraph(name) {
        return canvas => {
            return {
                labels: Data.graph[0],
                datasets: [{
                    backgroundColor: setGradientColor(canvas,colors[0]),
                    borderColor: setGradientColor(canvas,colors[0]),
                    label: "Accesos",
                    data: Data.graph[1],
                },]
            };
        }
    }

    window.addEventListener("click", beforePrintHandler);
    function beforePrintHandler() {
        setTimeout(() => {
            console.log('putabida');
            for (var id in Chart.instances) {
                Chart.instances[id].resize();
            }
        }, 250)
    }

    function handleChange(event) {
        if (event.target.name === "Timestamp") setStates({ ...States, TimeStamp: event.target.value });
        else if (event.target.name === "week") setDates({ ...Dates, week: event.target.value });
        else if (event.target.name === "month") setDates({ ...Dates, month: event.target.value });
        else if (event.target.name === "year") setDates({ ...Dates, year: event.target.value });
    }

    function GraphType(e) {
        setStates({...States, TypeChart: e.currentTarget.name})
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
                                        name="Timestamp"
                                        id="Timestamp"
                                        value={States.TimeStamp}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="S">Semanal</MenuItem>
                                        <MenuItem value="M">Mensual</MenuItem>
                                        <MenuItem value="A">Anual</MenuItem>
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel id="week">Semana</InputLabel>
                                    <Select
                                        labelId="week"
                                        id="week"
                                        name="week"
                                        value={Dates.week}
                                        onChange={handleChange}
                                        disabled={States.TimeStamp === "A" || States.TimeStamp === "M" ? true : false}
                                    >
                                        {GraphLabels("M").map((w, i) => <MenuItem key={i} value={i}>{w}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel id="month">Mes</InputLabel>
                                    <Select
                                        labelId="month"
                                        id="month"
                                        name="month"
                                        value={Dates.month}
                                        onChange={handleChange}
                                        disabled={States.TimeStamp === "A" ? true : false}
                                    >
                                       {GraphLabels("A").map((e, i) => <MenuItem key={i} value={i}>{String(e)}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <FormControl>
                                    <InputLabel id="year">Año</InputLabel>
                                    <Select
                                        labelId="year"
                                        id="year"
                                        name="year"
                                        value={Dates.year}
                                        onChange={handleChange}
                                    >
                                        {getYearRange().map((e, i) => <MenuItem key={i} value={e}>{String(e)}</MenuItem>)}
                                        <MenuItem value={2022}>2022</MenuItem>
                                        <MenuItem value={2023}>2023</MenuItem>
                                        <MenuItem value={2024}>2024</MenuItem>
                                        <MenuItem value={2025}>2025</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                        </Paper>
                    </div>
                    <div className={classes.iconContainer}>
                        <IconButton onClick={GraphType} name="line" className={clsx(States.TypeChart === "line" ? classes.selectedChart : "")}>
                            <i className="fas fa-chart-bar"></i></IconButton>
                        <IconButton onClick={GraphType} name="bar" className={clsx(States.TypeChart === "bar" ? classes.selectedChart : "")}>
                            <i className="fas fa-chart-area"></i>
                        </IconButton>
                    </div>

                </div>
                <Divider variant="middle" />
                <div className={classes.panelContainer}>
                    <Paper className={clsx(!animations.Minimize ? classes.maximizedContainer : classes.minimizedContainer, classes.dataContainer)} elevation={2}>
                        {!animations.Minimize ? Data.graph ? <ChartComponent
                                                type={States.TypeChart}
                                                data={getDataGraph()}
                                            /> : <div className={classes.message}><Typography>No hay accesos para esta Fecha</Typography></div>
                            : <BarChartIcon />}
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