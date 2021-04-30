import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js"
import useStyles from "../../styles/DashBoard";
import clsx from 'clsx';
import { Typography, Button, Divider } from '@material-ui/core';
import { GetGraphData } from '../../api/user';
import { generateGraphData, getDateAccess, setGradientColor } from '../../helpers/Graph'
import ChartComponent from "../../components/Chart";
import { colors } from '../../api/constants';
var _ = require('lodash');
var moment = require('moment');
moment().format();

export default function DashBoard() {
  const classes = useStyles();
  const [graphData, setgraphData] = useState("")
  const [isPromiseReady, setIsPromiseReady] = useState(false)
  const [typeChart, setTypeChart] = useState("line")

  useEffect(() => {
    if (graphData === "") getData()
  }, [])

  function handleClick(e){
    if(typeChart === "line") setTypeChart("bar")
    else setTypeChart("line")
  }

  const getData = async () => {
    const data = await GetGraphData();
    let dates = "";
    if (data) {
      data.forEach((e) => {
        if (String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek')) === e[0]) {
          dates = e;
        }
        setIsPromiseReady(true)
        setgraphData(dates);
      });
    } else {
      setgraphData("")
      setIsPromiseReady(true)
    }
  }

  window.addEventListener("click", beforePrintHandler);

  function beforePrintHandler() {
    setTimeout(() => {
      for (var id in Chart.instances) {
        Chart.instances[id].resize();
      }
    }, 200)
  }

  function getDataGraph() {
    return canvas => {
      let num = Math.floor(Math.random() * (colors.length - 1)) + 1;
      return {
        labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
        datasets: [{
          label: "accesos",
          data: generateGraphData(graphData),
          backgroundColor: setGradientColor(canvas, colors[num]),
          borderColor: setGradientColor(canvas, colors[num])
        }]
      };
    }
  }

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={clsx(classes.borderBoxL, !isPromiseReady && classes.loading)}>
        <Typography > Esta semana</Typography>
        <Typography className={classes.number}>{getDateAccess(generateGraphData(graphData))}</Typography>
        <Typography >Accesos</Typography>
      </Paper>
      <Paper elevation={0} className={clsx(!isPromiseReady && classes.loading)} >
      </Paper>
      <Paper elevation={0} className={clsx(classes.borderBoxR, !isPromiseReady && classes.loading, classes.buttonBox)}>
        <Button onClick={handleClick} className={clsx( typeChart === "bar" ?classes.selectedChart: "")}>
          <i className="fas fa-chart-bar"></i>
        </Button>
        <Button onClick={handleClick} className={clsx( typeChart === "line" ?classes.selectedChart: "")}>
          <i className="fas fa-chart-area"></i>
        </Button>
      </Paper>

      <Paper elevation={0} className={clsx(classes.GraphBox, !isPromiseReady && classes.loading)} >
        {graphData !== "" ? isPromiseReady ? <ChartComponent
          type={typeChart}
          data={getDataGraph()}
        /> : "" : <div className={classes.message}><Typography >No hay accesos la ultima semana</Typography></div>}
      </Paper>
    </div>
  );
}
