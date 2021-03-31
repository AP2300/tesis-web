import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import {Bar, Line} from "react-chartjs-2";
import useStyles from "./styles/DashBoard";
import axios from "axios";
import clsx from 'clsx';
var _ = require('lodash');
var moment = require('moment'); // require
moment().format(); 



export default function DashBoard(props) {
  const classes = useStyles();
  let isStillOpen = true;
  const [graphData, setgraphData] = useState("")
  const [isPromiseReady, setIsPromiseReady] = useState(false)

  // useEffect(access=>{
  //   setgraphData(access)
  // },[graphData])

  useEffect(()=>{ 
    axios.get("http://localhost:3001/access_data",{
      headers: {
          'Content-Type': 'application/json',    
      },
      withCredentials: true
  })
    .then(res => {
      let data = res.data.data[1]
      let accessData = _.groupBy(data, (data) => moment(data.RegDate).startOf('day'))
      let access = Object.entries(accessData)
      setIsPromiseReady(true)
      setgraphData(access)
    })
    .catch(err => {
      console.error(err); 
    })
  },[graphData])

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

  function redraw() {
    isStillOpen = true;
    setTimeout(()=>{
      isStillOpen = false;
    },50)
  }

  return (
    <div className={classes.root}>
      <Paper elevation={0} className={clsx(classes.borderBoxL, !isPromiseReady && classes.loading)}/>
      <Paper elevation={0} className={clsx(!isPromiseReady && classes.loading)}/>
      <Paper elevation={0} className={clsx(classes.borderBoxR, !isPromiseReady && classes.loading)} />
    
      <Paper elevation={0} className={clsx(classes.GraphBox, !isPromiseReady && classes.loading)}>
      {isPromiseReady ? <Line 
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
          redraw={props.isOpen ? false : isStillOpen}
          options={{ maintainAspectRatio: false,
          // responsive: true,

          scales:{
            yAxes:[{
              tricks:{
                beginAtZero: true
              }
            }]
          }
        }
        }
        /> : ""}
      </Paper>

    </div>
  );
}