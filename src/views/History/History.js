import React, { useEffect, useState } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails, InputLabel,
    FormControlLabel, Typography, TextField, MenuItem, FormControl,
    Paper, Divider, AccordionActions, Select
} from "@material-ui/core";
import { ExpandMore, FilterList, Timeline,  BarChart  } from "@material-ui/icons";
import useStyles from "../../styles/History";
import { GetHistoryData, GetHistoryUserData } from "../../api/user"
import clsx from 'clsx';
import { useHistory } from 'react-router';
import TitleContainer from '../../components/TitleContainer';
import { FilterSearch, ChangeGraph, calcNumWeek, setGradientColor } from '../../helpers/Graph';
import ChartComponent from '../../components/Chart';
const moment = require('moment');
moment().format();

export default function History() {
    const weeks = ["1era", "2da", "3era", "4ta", "5ta"];
    const monthsName = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const classes = useStyles();
    const history = useHistory();
    const [Promises, setPromises] = useState({ isReady: false, isUserReady: false });
    const [Data, setData] = useState({ Search: [], User: "", Users: "", graph: "" });
    const [Dates, setDates] = useState({ week: "", month: moment().month(), year: moment().year() });
    const [States, setStates] = useState({ TimeStamp: "S", Type: "U" , TypeChart: "bar"});
    const [Textfield, setTextfield] = useState("");

    useEffect(() => {
        if (Data.Users === "") GetHistory()
    }, [Data.Users])

    useEffect(() => {
        if (Dates.week === "") NumWeek(Dates.year,Dates.month);
    }, [Dates.week])

    useEffect(() => {
        if (Data.Users !== "") FuzzySearch()
    }, [Textfield])

    useEffect(() => {
        if (Data.User !== "") handleFilterSearch()
    }, [Data.User])

    useEffect(()=>{
        handleFilterSearch();
    },[States])


    const GetHistory = async () => {
        const res = await GetHistoryData();
        if (res) {
            setData({...Data, Users: res.data.data, Search: res.data.data});
            setPromises({...Promises, isReady: true});
        } else {
            history.push("/");
        }
    }

    const GetData = async (id) => {
        const res = await GetHistoryUserData(id);
        if (res) {
            setData({...Data, User: res.data.data});
            setPromises({...Promises, isUserReady: true});
            
        } else {
            history.push("/");
        }
    }

    const handleChange = (event) => {
        if (event.target.name === "timestamp") setStates({...States, TimeStamp: event.target.value});
        else if (event.target.name === "mail") setStates({...States, Type: event.target.value});
        else if (event.target.name === "week") setDates({...Dates, week: event.target.value});
        else if (event.target.name === "month") setDates({...Dates, month: event.target.value});
        else if (event.target.name === "year") setDates({...Dates, year: event.target.value});
    };

    const handleAcordion = (panel) => (event, isExpanded) => {
        setStates({...States, Expanded: isExpanded ? panel : false});
        setPromises({...Promises, isUserReady: false});
    };
    
    function NumWeek(year,month){
        let indexWeek = calcNumWeek(year,month);
        indexWeek.forEach((e,i) => {
            if(e === String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek'))){
                setDates({...Dates, week: i}); 
            }
        });
    }

    function getDataGraph(){
        return canvas => {
            return {
                labels: Data.graph[0],
                datasets: [{
                    backgroundColor : setGradientColor(canvas), 
                    borderColor : setGradientColor(canvas),
                    label: "Accesos",
                    data: Data.graph[1],
                },]
            };
        }
    }

    function getYearRange(){
        let val= 2021;
        let year = new Date()
        val = val - year.getFullYear()+1;
        let newArr = new Array(val);
        for (let i = 0; i < newArr.length; i++) {
            newArr[i] = 2021+i;            
        }
        return newArr
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
                setData({...Data, Search: Data.Users});
            } else {
                setData({...Data, Search: newSearchArr});
            }
        });
    }

    async function handleFilterSearch(){
        setData({...Data, graph: ChangeGraph(States.TimeStamp,Dates.year,Dates.month,Dates.week,
                    FilterSearch(Data.User, Dates.month, Dates.year, States.TimeStamp))});
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
                        control={<BarChart onClick={() => { setStates({...States, TypeChart: "bar"}) }}/>}
                    />
                    <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<Timeline onClick={() => { setStates({...States, TypeChart: "line"}) }}/>}
                    />
                    {/* <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<FilterList />}
                    /> */}
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
                        </div>
                    </Paper>
                </AccordionDetails>
            </Accordion>

            <Paper elevation={0} className={classes.resultBox}>
                { Promises.isReady ?
                        Data.Search.map((el, index) => {
                            return (
                                <Accordion onClick={() => GetData(el.IDUser)} key={index}
                                     onChange={handleAcordion(`panel${index}`)}>
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
                                        <div className={clsx(classes.column1, !Promises.isUserReady && classes.loading)}>
                                            {
                                                Data.graph ? Promises.isUserReady ? <ChartComponent
                                                    type={States.TypeChart}
                                                    data={getDataGraph()}
                                                /> : "" : <div className={classes.message}><Typography>No hay accesos para esta Fecha</Typography></div>
                                            }
                                        </div>
                                        <div className={clsx(classes.info,classes.column, Promises.isUserReady ? "" : classes.loading, classes.helper)}>
                                        </div>
                                    </AccordionDetails>
                                    <Divider />
                                    <AccordionActions>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="week-simple-select-label">Semana</InputLabel>
                                        <Select
                                            id="week-simple-select"
                                            value={Dates.week}
                                            name="week"
                                            onChange={handleChange}
                                            disabled={States.TimeStamp === "A" || States.TimeStamp === "M"? true : false}
                                        >
                                            {weeks.map((w,i) =><MenuItem key={i} value={i}>{w}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="month-simple-select-label">Mes</InputLabel>
                                        <Select
                                            id="month-simple-select"
                                            value={Dates.month}
                                            name="month"
                                            onChange={handleChange}
                                            disabled={States.TimeStamp === "A"? true : false}
                                        >
                                            {monthsName.map((e,i)=><MenuItem key={i} value={i}>{String(e)}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel id="year-simple-select-label">Año</InputLabel>
                                        <Select
                                            id="year-simple-select"
                                            value={Dates.year}
                                            name="year"
                                            onChange={handleChange}
                                        >
                                            {getYearRange().map((e,i)=><MenuItem key={i} value={e}>{String(e)}</MenuItem>)}
                                            <MenuItem value={2022}>2022</MenuItem>
                                            <MenuItem value={2023}>2023</MenuItem>
                                            <MenuItem value={2024}>2024</MenuItem>
                                            <MenuItem value={2025}>2025</MenuItem> 
                                        </Select>
                                    </FormControl>
                                    </AccordionActions>
                                </Accordion>
                            )
                        }) : "" 
                }
            </Paper>
        </div>
    );
}