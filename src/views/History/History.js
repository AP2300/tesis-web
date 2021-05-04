import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import clsx from 'clsx';
import useStyles from "../../styles/History";
import {
    Accordion, AccordionSummary, AccordionDetails, MenuItem,
    FormControlLabel, Typography, TextField, FormControl,
    Paper, Divider, Select, IconButton, Button
} from "@material-ui/core";
import { ExpandMore, FilterList, ChevronLeft, ChevronRight, Subject, BarChart } from "@material-ui/icons";
import { FilterSearch, ChangeGraph, calcNumWeek, setGradientColor, GraphLabels, getYearRange, DaysInMonth } from '../../helpers/Graph';
import { GetHistoryData, GetHistoryUserData } from "../../api/user"
import TitleContainer from '../../components/TitleContainer';
import ChartComponent from '../../components/Chart';
import DataInfo from '../../components/DataInfo';
import Chart from 'chart.js'
import { colors } from '../../api/constants';
const moment = require('moment');
moment().format();

export default function History() {
    const classes = useStyles();
    const history = useHistory();
    const [Promises, setPromises] = useState({ isReady: false, isUserReady: false });
    const [Data, setData] = useState({ Search: [], Users: "", AllUsers: "", graph: "" });
    const [Dates, setDates] = useState({ day: moment().date(), week: "", month: moment().month(), year: moment().year() });
    const [States, setStates] = useState({ TimeStamp: "D", Type: "U", TypeChart: "bar", ShowGeneral: true, showChart: true });
    const [Textfield, setTextfield] = useState("");

    useEffect(() => {
        if (Data.Users === "") GetHistory()
    }, [Data.Users])

    useEffect(() => {
        if (Data.Users !== "" && Promises.isReady) setDataofUsers();
    }, [Promises.isReady])

    useEffect(() => {
        if (Dates.week === "") NumWeek(Dates.year, Dates.month);
    }, [Dates.week])

    useEffect(() => {
        if (Data.Users !== "") FuzzySearch()
    }, [Textfield])

    useEffect(() => {
        if (Data.AllUsers.length !== 0) {
            handleFilterSearch(Data.AllUsers)
        }
    }, [Promises.isUserReady, Dates.day, Dates.week, Dates.month, Dates.year, States.TimeStamp])


    const GetHistory = async () => {
        const res = await GetHistoryData();
        if (res) {
            setData({ ...Data, Users: res.data.data, Search: res.data.data });
            setPromises({ ...Promises, isReady: true });
        } else {
            history.push({
                pathname: '/',
                state: { expired: true }
            });
        }
    }

    const setDataofUsers = async () => {
        let AllUsersData = [];
        if (Data.Users) {
            Data.Users.forEach(async (User) => {
                const res = await GetHistoryUserData(User.IDUser);
                if (res) {
                    AllUsersData.push({ id: User.IDUser, name: User.FullName, Data: res.data.data })
                }
                if (AllUsersData.length === Data.Users.length) {
                    setData({ ...Data, AllUsers: AllUsersData });
                    setPromises({ ...Promises, isUserReady: true });
                    handleFilterSearch(AllUsersData);
                }
            });
        } else {
            history.push({
                pathname: '/',
                state: { expired: true }
            });
        }
    }

    const handleChange = (event) => {
        if (event.target.name === "timestamp") setStates({ ...States, TimeStamp: event.target.value });
        else if (event.target.name === "mail") setStates({ ...States, Type: event.target.value });
        else if (event.target.name === "day") setDates({ ...Dates, day: event.target.value });
        else if (event.target.name === "week") setDates({ ...Dates, week: event.target.value });
        else if (event.target.name === "month") setDates({ ...Dates, month: event.target.value });
        else if (event.target.name === "year") setDates({ ...Dates, year: event.target.value });
    };

    const handleAcordion = (panel) => (event, isExpanded) => {
        setStates({ ...States, Expanded: isExpanded ? panel : false });
    };

    function NumWeek(year, month) {
        let indexWeek = calcNumWeek(year, month);
        indexWeek.forEach((e, i) => {
            if (e === String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek'))) {
                setDates({ ...Dates, week: i });
            }
        });
    }

    window.addEventListener("click", beforePrintHandler);
    function handleClick(e) {
        if (States.showChart) setStates({ ...States, showChart: false })
        else setStates({ ...States, showChart: true })
    }

    function beforePrintHandler() {
        setTimeout(() => {
            for (var id in Chart.instances) {
                Chart.instances[id].resize();
            }
        }, 260)
    }

    function getDataGraph(name) {
        if (name !== "") {
            return canvas => {
                return {
                    labels: Data.graph[name][0],
                    datasets: [{
                        backgroundColor: setGradientColor(canvas, colors[0]),
                        borderColor: setGradientColor(canvas, colors[0]),
                        label: "Accesos",
                        data: Data.graph[name][1],
                    },]
                };
            }
        }
    }

    function getGeneralGraph() {
        let names = Object.keys(Data.graph);
        let DataSet = Array(names.length)
        return canvas => {
            for (let i = 0; i < names.length; i++) {
                if (Data.graph[names[i]][1]) {
                    DataSet[i] = {
                        fill: true,
                        backgroundColor: setGradientColor(canvas, colors[i]),
                        borderColor: setGradientColor(canvas, colors[i]),
                        label: names[i],
                        data: Data.graph[names[i]][1],
                    }
                } else {
                    DataSet[i] = {
                        fill: false,
                        backgroundColor: setGradientColor(canvas, colors[i]),
                        borderColor: setGradientColor(canvas, colors[i]),
                        label: names[i],
                        data: [0],
                    }
                }
            }
            beforePrintHandler()
            return {
                labels: GraphLabels(States.TimeStamp),
                datasets: DataSet
            };
        }
    }

    function FuzzySearch() {
        Textfield.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
        let reg = new RegExp(`\\b${Textfield}`, 'i');
        let newSearchArr = []
        Data.Users.forEach(e => {
            if (reg.test(e.FullName) && Textfield !== ""
                || reg.test(e.Email) && Textfield !== ""
                || reg.test(e.IDUser) && Textfield !== "") {
                newSearchArr.push(e)
            } else if (Textfield === "") {
                setData({ ...Data, Search: Data.Users });
            } else {
                setData({ ...Data, Search: newSearchArr });
            }
        });
    }

    async function handleFilterSearch(All) {
        let AllGraphData = {};
        All.map(User => {
            AllGraphData = {
                ...AllGraphData, [User.name]: ChangeGraph(States.TimeStamp, Dates.year, Dates.month, Dates.week,
                    FilterSearch(User.Data, Dates.month, Dates.year, Dates.day, States.TimeStamp))
            };
        });
        setData({ ...Data, graph: AllGraphData });
    }

    return (
        <div >
            <Accordion className={classes.Acordion}  >
                <AccordionSummary className={classes.margins}
                    expandIcon={<FilterList />}
                    aria-label="Expand"
                    aria-controls="additional-actions1-content"
                    id="additional-actions1-header"
                >
                    <FormControlLabel className={classes.FormSize}
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<TextField id="adminSearch" label="Busca un usuario" autoComplete="false"
                            variant="outlined" className={classes.TextInput}
                            onChange={(e) => { setTextfield(e.target.value) }} value={Textfield} />}

                    />
                    <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<IconButton
                            className={clsx(States.TypeChart === "bar" ? classes.BtnActive : classes.Btnoff)}
                            onClick={() => { setStates({ ...States, TypeChart: "bar" }) }} >
                            <i className="fas fa-chart-bar"></i></IconButton>}
                    />
                    <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<IconButton
                            className={clsx(States.TypeChart === "line" ? classes.BtnActive : "")}
                            onClick={() => { setStates({ ...States, TypeChart: "line" }) }} >
                            <i className="fas fa-chart-line"></i></IconButton>}
                    />
                    <FormControlLabel
                        className={clsx(States.ShowGeneral ? classes.BtnActive : "")}
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<IconButton
                            onClick={() => { setStates({ ...States, ShowGeneral: !States.ShowGeneral }) }} >
                            <i className="fas fa-globe-americas"></i>
                        </IconButton>}
                    />
                </AccordionSummary>
                <AccordionDetails>
                    <Paper elevation={0} className={classes.FilterContainer}>
                        <Typography>Filtros</Typography>
                        <Divider />
                        <div className={classes.OuterContainer}>
                            <div className={classes.innerContainer}>
                                <TitleContainer title={"Mostrar accesos en:"} loading={false} >
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-outlined"
                                            value={States.TimeStamp}
                                            displayEmpty
                                            onChange={handleChange}
                                            name="timestamp"
                                        >
                                            <MenuItem value="D">Diario</MenuItem>
                                            <MenuItem value="S">Semanal</MenuItem>
                                            <MenuItem value="M">Mensual</MenuItem>
                                            <MenuItem value="A">Anual</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TitleContainer>
                            </div>
                            <div className={classes.innerContainer}>
                                <TitleContainer title={"Tipo de usuario"} loading={false} className={classes.box}>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <Select
                                            labelId="demo-simple-select-filled-label"
                                            id="demo-simple-select-outlined"
                                            value={States.Type}
                                            displayEmpty
                                            onChange={handleChange}
                                            name="mail"
                                        >
                                            <MenuItem value="U" >
                                                <em>Usuario</em>
                                            </MenuItem>
                                            <MenuItem value="A">Administrador</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TitleContainer>
                            </div>
                            <div className={classes.innerContainer}>
                                <TitleContainer title={"Dia"} loading={false} className={classes.box}>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <Select
                                            id="week-simple-select"
                                            value={Dates.day}
                                            name="day"
                                            onChange={handleChange}
                                            disabled={States.TimeStamp === "A" || States.TimeStamp === "M" || States.TimeStamp === "S" ? true : false}
                                        >
                                            {DaysInMonth(Dates.month, Dates.year).map((w, i) => <MenuItem key={i} value={w}>{w}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </TitleContainer>
                            </div>
                            <div className={classes.innerContainer}>
                                <TitleContainer title={"Semana"} loading={false} className={classes.box}>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <Select
                                            id="week-simple-select"
                                            value={Dates.week}
                                            name="week"
                                            onChange={handleChange}
                                            disabled={States.TimeStamp === "A" || States.TimeStamp === "M" || States.TimeStamp === "D" ? true : false}
                                        >
                                            {GraphLabels("M").map((w, i) => {
                                                if (calcNumWeek(Dates.year, Dates.month).length === 6) {
                                                    return <MenuItem key={i} value={i} disabled={Dates.NumWeek}>{w}</MenuItem>
                                                } else if (i < 5) {
                                                    return <MenuItem key={i} value={i}>{w}</MenuItem>
                                                }
                                            })}
                                        </Select>
                                    </FormControl>
                                </TitleContainer>
                            </div>
                            <div className={classes.innerContainer}>
                                <TitleContainer title={"Mes"} loading={false} className={classes.box}>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <Select
                                            id="month-simple-select"
                                            value={Dates.month}
                                            name="month"
                                            onChange={handleChange}
                                            disabled={States.TimeStamp === "A" ? true : false}
                                        >
                                            {GraphLabels("A").map((e, i) => <MenuItem key={i} value={i}>{String(e)}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </TitleContainer>
                            </div>
                            <div className={classes.innerContainer}>
                                <TitleContainer title={"Año"} loading={false} className={classes.box}>
                                    <FormControl variant="filled" className={classes.formControl}>
                                        <Select
                                            id="year-simple-select"
                                            value={Dates.year}
                                            name="year"
                                            onChange={handleChange}
                                        >
                                            {getYearRange().map((e, i) => <MenuItem key={i} value={e}>{String(e)}</MenuItem>)}
                                            <MenuItem value={2022}>2022</MenuItem>
                                            <MenuItem value={2023}>2023</MenuItem>
                                            <MenuItem value={2024}>2024</MenuItem>
                                            <MenuItem value={2025}>2025</MenuItem>
                                        </Select>
                                    </FormControl>
                                </TitleContainer>
                            </div>
                        </div>
                    </Paper>
                </AccordionDetails>
            </Accordion>

            <Paper elevation={0} className={classes.resultBox}>
                <Accordion>
                    <div className={clsx(States.ShowGeneral ? Promises.isUserReady ? classes.GeneralGraph : classes.loading : classes.HideGraph)}>
                        {Data.graph ? <ChartComponent
                            type={States.TypeChart}
                            data={getGeneralGraph()}
                        /> : <div className={classes.message}><Typography>No hay accesos para esta Fecha</Typography></div>}
                    </div>
                </Accordion>
                {Promises.isReady ?
                    Data.Search.map((el, index) => {
                        return (
                            <Accordion key={index} className={classes.AcordionResult}
                                onChange={handleAcordion(`panel${index}`)}>
                                <AccordionSummary
                                    expandIcon={<ExpandMore />}
                                    aria-controls="panel1c-content"
                                >
                                    <div className="UserInfo">
                                        <Typography className={classes.heading}>{el.FullName}</Typography>
                                    </div>
                                    <div className="UserInfo">
                                        <Typography className={classes.secondaryHeading}>ID: {el.IDUser}</Typography>
                                    </div>
                                    <div className="UserInfo">
                                        <Typography className={classes.secondaryHeading}>{el.Email}</Typography>
                                    </div>
                                </AccordionSummary>
                                <AccordionDetails className={classes.details}>
                                    <div className={clsx(States.showChart ? classes.column1 : classes.columnDisabled)}>
                                        {
                                            States.showChart ? Data.graph[el.FullName] ? <ChartComponent
                                                type={States.TypeChart}
                                                data={getDataGraph(el.FullName)}
                                            /> : <div className={classes.message}><Typography>No hay accesos para esta Fecha</Typography></div> : <BarChart />
                                        }
                                    </div>
                                    <Button className={classes.dividerButton}
                                        onClick={handleClick}>{States.showChart ? <ChevronLeft /> : <ChevronRight />}
                                    </Button>
                                    <div className={clsx(classes.info, !States.showChart ? classes.column : classes.columnDisabled)}>
                                        {States.showChart ? <Subject /> : <DataInfo classes={classes.column} TimeStamp={States.TimeStamp} Data={Data.graph[el.FullName]} />}
                                    </div>
                                </AccordionDetails>
                            </Accordion>
                        )
                    }) : ""
                }
            </Paper>
        </div>
    );
}