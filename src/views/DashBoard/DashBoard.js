import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {Line} from "react-chartjs-2";
import {Chart} from "chart.js"
import useStyles from "../../styles/DashBoard";
import axios from "axios";
import clsx from 'clsx';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';
var _ = require('lodash');
var moment = require('moment');
moment().format(); 



export default function DashBoard() {
  const classes = useStyles();
  let history = useHistory()
  const [graphData, setgraphData] = useState("")
  const [isPromiseReady, setIsPromiseReady] = useState(false)


  useEffect(()=>{ 
    axios.get("http://localhost:3001/access_data",{
      headers: {
          'Content-Type': 'application/json',    
      },
      withCredentials: true
  })
    .then(res => {
      let data = res.data.data;
      if(data){
        let accessData = _.groupBy(data, (data) => moment(data.RegDate).startOf('day'))
        let access = Object.entries(accessData)
        setIsPromiseReady(true)
        setgraphData(access)
      } else {
        setgraphData([])    
        setIsPromiseReady(true)
      }
      
      window.addEventListener("beforeprint", beforePrintHandler())
    })
    .catch(err => {
      console.error(err.stack)
      if(err) history.push("/")
    })
  },[graphData])

  function beforePrintHandler () {
    for (var id in Chart.instances) {
        Chart.instances[id].resize();
    }
}

  function Putabida (){ 
    let graph = [];
    if(!graphData) graph = []
    else {
      graphData.forEach(e => {
        if(e[1].length === 0){
          graph.push(0)
        }else{
          graph.push(e[1].length)
        }
      });
    }
    return graph
  }


  return (
    <div className={classes.root}>
      <Paper elevation={0} className={clsx(classes.borderBoxL, !isPromiseReady && classes.loading)}/>
      <Paper elevation={0} className={clsx(!isPromiseReady && classes.loading)}/>
      <Paper elevation={0} className={clsx(classes.borderBoxR, !isPromiseReady && classes.loading)} />
    
      <Paper elevation={0} className={clsx(classes.GraphBox, !isPromiseReady && classes.loading)}>
      {graphData === [] ? isPromiseReady ? <Line 
          data={
            {
              labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
            datasets: [{
                label: "accesos",
                data: Putabida(),
                backgroundColor: "#f5deb382",
                borderColor: "wheat"
              },]
            }
          }
          
          options={{ maintainAspectRatio: false,
          responsiveAnimationDuration: 250,
          scales:{
            yAxes:[{
              tricks:{
                beginAtZero: true
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