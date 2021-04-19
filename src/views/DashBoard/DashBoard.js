import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js"
import useStyles from "../../styles/DashBoard";
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { GetGraphData } from '../../api/user';
var _ = require('lodash');
var moment = require('moment');
moment().format();

export default function DashBoard() {
  const classes = useStyles();
  const [graphData, setgraphData] = useState("")
  const [isPromiseReady, setIsPromiseReady] = useState(false)


  useEffect(() => {
    getData()
  }, [])


  const getData = async () => {
    const data = await GetGraphData();
    let dates = "";
    if (data) {
      console.log(data)
      data.forEach((e) => {
        if(String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek')) === e[0]){
          dates = e;
        }
        setIsPromiseReady(true)
        setgraphData(dates);
      });
    } else {
      setgraphData([])
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

  function generateGraphData() {
    let graph = [ 0 , 0 , 0 , 0 , 0 , 0 , 0 ];
    const days = [1, 2, 3, 4, 5, 6, 0];
    if(graphData) {
      graphData[1].forEach(date => {
          days.forEach((day,d) => {
              if(day === moment(date.RegDate).day()){
                  graph[d] += 1;                                 
              }
          });
      });
    }
    return graph
  }

  function getWeekAccess() {
    let calc = 0;
    generateGraphData().forEach(e => {
      calc += e;
    })
    return calc
  }


  return (
    <div className={classes.root}>
      <Paper elevation={0} className={clsx(classes.borderBoxL, !isPromiseReady && classes.loading)}>
        <Typography > Esta semana</Typography>
        <Typography className={classes.number}>{getWeekAccess()}</Typography>
        <Typography >Accesos</Typography>
      </Paper>
      <Paper elevation={0} className={clsx(!isPromiseReady && classes.loading)} />
      <Paper elevation={0} className={clsx(classes.borderBoxR, !isPromiseReady && classes.loading)} />

      <Paper elevation={0} className={clsx(classes.GraphBox, !isPromiseReady && classes.loading)} >
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
          redraw={true}
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
        /> : "" : <div className={classes.message}><Typography >No hay accesos la ultima semana</Typography></div>}
      </Paper>
    </div>
  );
}
