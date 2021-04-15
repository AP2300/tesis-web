import React, { useEffect, useState } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails, FormHelperText,
    FormControlLabel, Typography, TextField, MenuItem, FormControl,
    Paper, Divider, AccordionActions, Button, InputLabel, Select
} from "@material-ui/core";
import { ExpandMore, FilterList } from "@material-ui/icons";
import useStyles from "../../styles/History";
import { GetHistoryData, GetHistoryUserData } from "../../api/user"
import clsx from 'clsx';
import Chart from "chart.js";
import { Line } from "react-chartjs-2";
import { useHistory } from 'react-router';
import TitleContainer from '../../components/TitleContainer';
const _ = require('lodash');
const moment = require('moment');
moment().format();

export default function History() {
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
    const [graph, setgraph] = useState("")

    useEffect(() => {
        if (Users === "") GetHistory()
    }, [Users])

    useEffect(() => {
        if (Users != "") FuzzySearch()
    }, [Textfield])

    useEffect(() => {
        if (UserData != "") FilterSearch()
    }, [UserData])


    const GetHistory = async () => {
        const res = await GetHistoryData();
        if (res) {
            setSearchData(res.data.data);
            setUsers(res.data.data);
            setIsPromiseReady(true);
        }
    }

    const GetData = async (id) => {
        const res = await GetHistoryUserData(id);
        if (res) {
            setUserData(res.data.data);
            setIsUserPromiseReady(true);
            // FilterSearch();
        } else {
            history.push("/");
        }
    }

    const handleChange = (event) => {
        if (event.target.name === "timestamp") setTimeStamp(event.target.value);
        else if (event.target.name === "mail") setType(event.target.value);
    };

    const handleAcordion = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
        setIsUserPromiseReady(false);
    };

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

    async function FilterSearch() {
            let graphData = "";
            let groupedResults = "";
            let result = "";
            switch (TimeStamp) {
                case "S":
                    groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('isoWeek'));
                    result = Object.entries(groupedResults);
                    result.forEach((e) => {
                        if(String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek')) === e[0]){
                            graphData = e;
                        }
                    });
                    ChangeGraph(graphData);
                break;
                case "M":
                    groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('month'));
                    result = Object.entries(groupedResults);
                    console.log(groupedResults);
                break;
                case "A":
                    groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('year'));
                    result = Object.entries(groupedResults);
                    console.log(groupedResults);
                break;
            }
    }

    async function ChangeGraph(graphData){
        let groupedResults = "";
        let result = "";
        let grap = [ 0 , 0 , 0 , 0 , 0 , 0 , 0 ];
        switch (TimeStamp) {
            case "S":
                const days = [1, 2, 3, 4, 5, 6, 0];
                if (graphData) {
                    graphData[1].forEach(date => {
                        days.forEach((day,d) => {
                            if(day === moment(date.RegDate).day()){
                                grap[d] += 1;                                 
                            }
                        });
                    });
                }
                setgraph(grap)
            break;
            case "M":
                groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('month'));
                result = Object.entries(groupedResults);
                console.log(result);
                    const weeks = ["1era", "2da", "3era", "4ta", "5ta"];
            break;
            case "A":
                groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('year'));
                result = Object.entries(groupedResults);
                console.log(result);
            break;
        }
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
                                <TitleContainer title={"Mostrar accesos en:"} loading={false} className={classes.box}>
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
                                                isUserPromiseReady ? <Line
                                                    data={
                                                        {
                                                            labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
                                                            datasets: [{
                                                                label: "accesos",
                                                                data: graph,
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
                                                /> : ""
                                            }

                                        </div>
                                        <div className={clsx(classes.column, isUserPromiseReady ? "" : classes.loading, classes.helper)}>

                                        </div>
                                    </AccordionDetails>
                                    <Divider />
                                    <AccordionActions>
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