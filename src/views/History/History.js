import React from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    FormControlLabel, Typography, TextField, IconButton,
    Paper, Divider, AccordionActions, Button
} from "@material-ui/core";
import { ExpandMore, Search } from "@material-ui/icons";
import useStyles from "../../styles/History"
import clsx from 'clsx';
import Chart from "chart.js";
import { Line } from "react-chartjs-2";




export default function ActionsInAccordionSummary() {
    const classes = useStyles();

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
                        control={<TextField id="adminSearch" label="Busca un usuario" variant="outlined" className={classes.TextInput} />}

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


                <Accordion >
                    <AccordionSummary
                        expandIcon={<ExpandMore />}
                        aria-controls="panel1c-content"
                        id="panel1c-header"
                    >
                        <div className={classes.column}>
                            <Typography className={classes.heading}>Nombre</Typography>
                        </div>
                        <div className={classes.column}>
                            <Typography className={classes.secondaryHeading}>ID</Typography>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails className={classes.details}>
                        <div className={classes.column1}>
                            <Line
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
                            />
                        </div>
                        <div className={clsx(classes.column, classes.helper)}>

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
            </Paper>

        </div>
    );
}