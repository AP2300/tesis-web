import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Paper from '@material-ui/core/Paper';
import { Chart } from "chart.js"
import useStyles from "../../styles/DashBoard";
import clsx from 'clsx';
import { Typography, Button } from '@material-ui/core';
import { GetGraphData } from '../../api/user';
import { generateGraphData, getDateAccess, setGradientColor } from '../../helpers/Graph'
import { ShowTime, DayofWeek } from '../../helpers/DataInfo'
import ChartComponent from "../../components/Chart";
import { colors } from '../../api/constants';
var moment = require('moment');
moment().format();

export default function DashBoard(props) {
  const history = useHistory();
  const classes = useStyles();
  const [Data, setData] = useState({ graph: "", lastEntry: "" });
  const [isPromiseReady, setIsPromiseReady] = useState(false);
  const [typeChart, setTypeChart] = useState("line");
  const { UserData } = props;

  useEffect(() => {
    if (Data.graph === "") getData();
  }, [])

  function handleClick(e) {
    if (e.currentTarget.name === "line") setTypeChart("line")
    else setTypeChart("bar")
  }

  const getData = async () => {
    const data = await GetGraphData();
    let dates = "";
    if (data[0].length > 0) {
      let LastEntry = OrderLastEntry(data[1]);
      data[0].forEach((e) => {
        if (String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek')) === e[0]) {
          dates = e;
        }
        console.log("putabida");
        setIsPromiseReady(true)
        setData({ ...Data, graph: dates, lastEntry: LastEntry })
      });
    } else {
      setData({ ...Data, graph: "", lastEntry: false })
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

  function OrderLastEntry(data) {
    let LastEntry = "2019-01-01T00:00:00.000Z";
    data.forEach((e) => {
      if (moment(e.RegDate).isSameOrAfter(LastEntry)) {
        LastEntry = e.RegDate;
      }
    });
    return LastEntry;
  }

  function getLastEntry(date) {
    if (date !== false) {
      return (
        <div className={classes.centerBox}>
          <Typography className={classes.BoxText}>Su último acceso fue </Typography>
          <Typography className={classes.date} align="center">{`${moment(date).date()}-${moment(date).month() + 1}-${moment(date).year()}`}
          </Typography>
          <Typography className={classes.date} align="center">{`${ShowTime('h', moment(date).hour())}:${ShowTime('m', moment(date).minute())} ${ShowTime('am/pm', moment(date).hour())}`}</Typography>
        </div>)
    } else {
      return (
        <div className={classes.centerBox}>
          <Typography align="center" style={{fontSize: "calc(17px + (30 - 17) * ((90vw - 320px) / (1600 - 300)))"}}>Usted no ha accedido aun al sistema</Typography>
        </div>);
    }
  }

  function getDataGraph() {
    return canvas => {
      let num = Math.floor(Math.random() * (colors.length - 1)) + 1;
      return {
        labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],
        datasets: [{
          label: "accesos",
          data: generateGraphData(Data.graph),
          backgroundColor: setGradientColor(canvas, colors[num]),
          borderColor: setGradientColor(canvas, colors[num])
        }]
      };
    }
  }

  return (
    <div className={classes.root}>
      <Paper elevation={2} className={clsx(classes.borderBoxL, !isPromiseReady && classes.loading)}>
        {isPromiseReady ? <Typography className={classes.BoxText} >Esta semana accedió</Typography> : ""}
        {isPromiseReady ? <Typography className={classes.number}>{getDateAccess(generateGraphData(Data.graph))}</Typography> : ""}
      </Paper>
      <Paper elevation={2} className={clsx(!isPromiseReady && classes.loading)} >
        {isPromiseReady ? getLastEntry(Data.lastEntry) : ""}
      </Paper>
      <Paper elevation={2} className={clsx(classes.borderBoxR, classes.buttonBox)}>
        <Typography align="center" className="title">
          Tipo de gráfica
        </Typography>
        <div>
          <Button name="bar" onClick={handleClick} className={clsx(typeChart === "bar" ? classes.selectedChart : "")}>
            <i className="fas fa-chart-bar"></i>
          </Button>
          <Button name="line" onClick={handleClick} className={clsx(typeChart === "line" ? classes.selectedChart : "")}>
            <i className="fas fa-chart-area"></i>
          </Button>
        </div>
      </Paper>

      <Paper elevation={2} className={clsx(classes.GraphBox, !isPromiseReady && classes.loading)} >
        {isPromiseReady ? Data.graph !== "" ? <ChartComponent
          type={typeChart}
          data={getDataGraph()}
        /> : <div className={classes.message}><Typography>No hay accesos la última semana</Typography></div> : ""}
      </Paper>
    </div>
  );
}
