import React, { useEffect, useState } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    FormControlLabel, Typography, TextField, IconButton,
    Paper, Divider, AccordionActions, Button
} from "@material-ui/core";
import { ExpandMore, Search } from "@material-ui/icons";
import useStyles from "../../styles/History";
import { GetHistoryData } from "../../api/user"
import clsx from 'clsx';
import Chart from "chart.js";
import { Line } from "react-chartjs-2";




export default function History() {
    const classes = useStyles();
    const [isPromiseReady, setIsPromiseReady] = useState(false)
    const [isUserPromiseReady, setIsUserPromiseReady] = useState(false)
    const [SearchData, setSearchData] = useState("")
    const [UserData, setUserData] = useState("")
    const [Textfield, setTextfield] = useState("")
    const [Users, setUsers] = useState("")

    useEffect(() => {
        if (Users === "") GetHistory()
    }, [Users])

    useEffect(() => {
        if (Users != "") FuzzySearch()
    }, [Textfield])

    const GetHistory = async () => {
        const res = await GetHistoryData()
        if (res) {
            setSearchData(res.data.data)
            setUsers(res.data.data)
            setIsPromiseReady(true)
        }
    }

    function FuzzySearch() {
        Textfield.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&");
        let reg = new RegExp(`\\b${Textfield}`, 'i');
        let newSearchArr = []
        Users.forEach(e => {
            if (reg.test(e.FullName) && Textfield !== ""
                || reg.test(e.Email) && Textfield !== ""
                || reg.test(e.IDUser) && Textfield !== "") {
                console.log("gola", Textfield);
                newSearchArr.push(e)
            } else if (Textfield === "") {
                console.log("hola", Textfield);
                setSearchData(Users)
            } else {
                setSearchData(newSearchArr)
            }
        });
    }

    return (
        <div >
            <Accordion className={classes.Acordion}>
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
                        control={<TextField id="adminSearch" label="Busca un usuario"
                            variant="outlined" className={classes.TextInput}
                            onChange={(e) => { setTextfield(e.target.value) }} value={Textfield} />}

                    />
                    <FormControlLabel
                        aria-label="Acknowledge"
                        onClick={(event) => event.stopPropagation()}
                        onFocus={(event) => event.stopPropagation()}
                        control={<IconButton><Search /></IconButton>}

                    />
                </AccordionSummary>
                <AccordionDetails>
                    <Typography color="textSecondary">
                        The click event of the nested action will propagate up and expand the accordion unless
                        you explicitly stop it.
          </Typography>
                </AccordionDetails>
            </Accordion>

            <Paper elevation={0} className={classes.resultBox}>
                {
                    isPromiseReady ?
                        SearchData.map(el => {
                            return (
                                <Accordion >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                        aria-controls="panel1c-content"
                                        id="panel1c-header"
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
                                                                data: [3, 2, 6, 8, 0, 5, 2],
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