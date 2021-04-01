import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js"
import useStyles from "../../styles/DashBoard";
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { GetGraphData } from '../../api/user';
var _ = require('lodash');
var moment = require('moment');
moment().format();



export default function DashBoard() {
  const classes = useStyles();
  let history = useHistory();
  const [graphData, setgraphData] = useState("")
  const [isPromiseReady, setIsPromiseReady] = useState(false)


  useEffect(() => {
    if (graphData === "") getData()
  }, [graphData])

  const getData = async () => {
    const data = await GetGraphData();
    if (data) {
      let accessData = _.groupBy(data[1], (data) => moment(data.RegDate).startOf('day'))
      let access = Object.entries(accessData)
      setIsPromiseReady(true)
      setgraphData(access)
    } else {
      setgraphData([])
      setIsPromiseReady(true)
    }
    window.addEventListener("beforeprint", beforePrintHandler());
  }

  function beforePrintHandler() {
    for (var id in Chart.instances) {
      Chart.instances[id].resize();
    }
  }

  function generateGraphData() {
    let graph = [];
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    let j = 0;
    if (graphData) {
      for (let i = 0; i < days.length; i++) {
        if (graphData[i]) {
          if (days[i] === graphData[i - j][0].split(" ")[0]) {
            console.log(graphData[i - j][0]);
            graph.push(graphData[i - j][1].length)
          } else {
            graph.push(0)
            j++
          }
        } else {
          graph.push(graphData[i - j][1].length)
        }
      }
    }
    console.log(graph);
    return graph
  }


  return (
    <div className={classes.root}>
      <Paper elevation={0} className={clsx(classes.borderBoxL, !isPromiseReady && classes.loading)} />
      <Paper elevation={0} className={clsx(!isPromiseReady && classes.loading)} />
      <Paper elevation={0} className={clsx(classes.borderBoxR, !isPromiseReady && classes.loading)} />

      <Paper elevation={0} className={clsx(classes.GraphBox, !isPromiseReady && classes.loading)}>
        {graphData !== [] ? isPromiseReady ? <Line
          data={
            {
              labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
              datasets: [{
                label: "accesos",
                data: generateGraphData(),
                backgroundColor: "#f5deb382",
                borderColor: "wheat"
              },]
            }
          }

          options={{
            maintainAspectRatio: false,
            responsiveAnimationDuration: 250,
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
        /> : "" : <div className={classes.message}><Typography >No hay accesos la ultima semana</Typography></div>}
      </Paper>
    </div>
  );
}