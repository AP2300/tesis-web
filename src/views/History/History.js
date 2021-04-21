import React, { useEffect, useState } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails, InputLabel,
    FormControlLabel, Typography, TextField, MenuItem, FormControl,
    Paper, Divider, AccordionActions, Button, Select
} from "@material-ui/core";
import { ExpandMore, FilterList } from "@material-ui/icons";
import useStyles from "../../styles/History";
import { GetHistoryData, GetHistoryUserData } from "../../api/user"
import clsx from 'clsx';
import { Line } from "react-chartjs-2";
import { useHistory } from 'react-router';
import TitleContainer from '../../components/TitleContainer';
import { FilterSearch, ChangeGraph, calcNumWeek } from '../../helpers/Graph';
const moment = require('moment');
moment().format();

export default function History() {
    const weeks = ["1era", "2da", "3era", "4ta", "5ta"];
    const monthsName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const classes = useStyles();
    const history = useHistory();
    const [isPromiseReady, setIsPromiseReady] = useState(false);
    const [isUserPromiseReady, setIsUserPromiseReady] = useState(false);
    const [SearchData, setSearchData] = useState("");
    const [UserData, setUserData] = useState("");
    const [Textfield, setTextfield] = useState("");
    const [Users, setUsers] = useState("");
    const [TimeStamp, setTimeStamp] = useState('S');
    const [Type, setType] = useState("U");
    const [expanded, setExpanded] = useState(false);
    const [graph, setGraph] = useState("");
    const [week, setWeek] = useState("");
    const [month, setMonth] = useState(moment().month());
    const [year, setYear] = useState(moment().year());

    useEffect(() => {
        if (Users === "") GetHistory()
    }, [Users])

    useEffect(() => {
        if (week === "") NumWeek(year,month);
    }, [week])

    useEffect(() => {
        if (Users != "") FuzzySearch()
    }, [Textfield])

    useEffect(() => {
        if (UserData != "") handleFilterSearch()
    }, [UserData])


    const GetHistory = async () => {
        const res = await GetHistoryData();
        if (res) {
            setSearchData(res.data.data);
            setUsers(res.data.data);
            setIsPromiseReady(true);
        } else {
            history.push("/");
        }
    }

    const GetData = async (id) => {
        const res = await GetHistoryUserData(id);
        if (res) {
            setUserData(res.data.data);
            setIsUserPromiseReady(true);
            
        } else {
            history.push("/");
        }
    }

    const handleChange = (event) => {
        if (event.target.name === "timestamp") setTimeStamp(event.target.value);
        else if (event.target.name === "mail") setType(event.target.value);
        else if (event.target.name === "week") setWeek(event.target.value);
        else if (event.target.name === "month") setMonth(event.target.value);
        else if (event.target.name === "year") setYear(event.target.value);
    };

    const handleAcordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setIsUserPromiseReady(false);
    };
    
    function NumWeek(year,month){
        let indexWeek = calcNumWeek(year,month);
        indexWeek.forEach((e,i) => {
            if(e === String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek'))){
                setWeek(i); 
            }
        });
    }

    function FuzzySearch() {
        Textfield.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
        let reg = new RegExp(`\\b${Textfield}`, 'i');
        let newSearchArr = []
        Users.forEach(e => {
            if (reg.test(e.FullName) && Textfield !== ""
                || reg.test(e.Email) && Textfield !== ""
                || reg.test(e.IDUser) && Textfield !== "") {
                newSearchArr.push(e)
            } else if (Textfield === "") {
                setSearchData(Users);
            } else {
                setSearchData(newSearchArr);
            }
        });
    }

    async function handleFilterSearch(){
        setGraph(ChangeGraph(TimeStamp,year,month,week,FilterSearch(UserData, month, year, TimeStamp)));
    }

    return (
        <div >
            <Accordion className={classes.Acordion}  >
                <AccordionSummary className={classes.margins}
                    expandIcon={<ExpandMore />}
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
                        control={<FilterList />}

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
                                            value={TimeStamp}
                                            displayEmpty
                                            onChange={handleChange}
                                            name="timestamp"
                                        >
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
                                            value={Type}
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
                        </div>
                    </Paper>
                </AccordionDetails>
            </Accordion>

            <Paper elevation={0} className={classes.resultBox}>
                {
                    isPromiseReady ?
                        SearchData.map((el, index) => {
                            return (
                                <Accordion onClick={() => GetData(el.IDUser)} key={index}
                                    expanded={expanded === `panel${index}`} onChange={handleAcordion(`panel${index}`)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1c-content"
                                    >
                                        <div className={classes.column}>
                                            <Typography className={classes.heading}>{el.FullName}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>ID: {el.IDUser}</Typography>
                                        </div>
                                        <div className={classes.column}>
                                            <Typography className={classes.secondaryHeading}>{el.Email}</Typography>
                                        </div>
                                    </AccordionSummary>
                                    <AccordionDetails className={classes.details}>
                                        <div className={clsx(classes.column1, !isUserPromiseReady && classes.loading)}>
                                            {
                                                graph ? isUserPromiseReady ? <Line
                                                    data={
                                                        {
                                                            labels: graph[0],
                                                            datasets: [{
                                                                label: "accesos",
                                                                data: graph[1],
                                                                backgroundColor: "#f5deb382",
                                                                borderColor: "wheat"
                                                            },]
                                                        }
                                                    }
                                                    options={{
                                                        maintainAspectRatio: false,
                                                        responsiveAnimationDuration: 100,
                                                        scales: {
                                                            yAxes: [{
                                                                ticks: {
                                                                    beginAtZero: true,
                                                                    stepSize: 1,
                                                                }
                                                            }]
                                                        }
                                                    }
                                                    }
                                                /> : "" : <div className={classes.message}><Typography >No hay accesos para esta Fecha</Typography></div>
                                            }
                                        </div>
                                        <div className={clsx(classes.column, isUserPromiseReady ? "" : classes.loading, classes.helper)}>

                                        </div>
                                    </AccordionDetails>
                                    <Divider />
                                    <AccordionActions>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="week-simple-select-label">Semana</InputLabel>
                                        <Select
                                            id="week-simple-select"
                                            value={week}
                                            name="week"
                                            onChange={handleChange}
                                        >
                                            {weeks.map((w,i) =><MenuItem value={i}>{w}</MenuItem>)}
                                            {/* <MenuItem value={0}>1era</MenuItem>
                                            <MenuItem value={1}>2da</MenuItem>
                                            <MenuItem value={2}>3era</MenuItem>
                                            <MenuItem value={3}>4ta</MenuItem>
                                            <MenuItem value={4}>5ta</MenuItem> */}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="month-simple-select-label">Mes</InputLabel>
                                        <Select
                                            id="month-simple-select"
                                            value={month}
                                            name="month"
                                            onChange={handleChange}
                                        >
                                            {monthsName.map((e,i)=><MenuItem value={i}>{String(e)}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="year-simple-select-label">Año</InputLabel>
                                        <Select
                                            id="year-simple-select"
                                            value={year}
                                            name="year"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={2021}>2021</MenuItem>
                                            <MenuItem value={2022}>2022</MenuItem>
                                            <MenuItem value={2023}>2023</MenuItem>
                                            <MenuItem value={2024}>2024</MenuItem>
                                            <MenuItem value={2025}>2025</MenuItem>
                                        </Select>
                                    </FormControl>
                                        <Button size="small">Cancel</Button>
                                        <Button size="small" color="primary">
                                            Save
                                        </Button>
                                    </AccordionActions>
                                </Accordion>
                            )
                        }) : "" 
                }
            </Paper>

        </div>
    );
}