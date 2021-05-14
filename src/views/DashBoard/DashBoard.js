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
    if (data) {
      let LastEntry = OrderLastEntry(data[1]);
      data[0].forEach((e) => {
        if (String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek')) === e[0]) {
          dates = e;
        }
        setIsPromiseReady(true)
        setData({ ...Data, graph: dates, lastEntry: LastEntry });
      });
    } else {
      setData({ ...Data, graph: "" })
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
    return (
      <div className={classes.centerBox}>
        <Typography className={classes.BoxText}>Su Ultimo Acceso fue </Typography>
        <Typography className={classes.date} align="center">{`${moment(date).date()}-${moment(date).month() + 1}-${moment(date).year()}`}
        </Typography>
        <Typography className={classes.date} align="center">{`${ShowTime('h', moment(date).hour())}:${ShowTime('m', moment(date).minute())} ${ShowTime('am/pm', moment(date).hour())}`}</Typography>
      </div>
    )
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
        <Typography className={classes.BoxText} >Esta semana accedio</Typography>
        <Typography className={classes.number}>{getDateAccess(generateGraphData(Data.graph))}</Typography>
      </Paper>
      <Paper elevation={2} className={clsx(!isPromiseReady && classes.loading)} >
        {isPromiseReady ? getLastEntry() : ""}
      </Paper>
      <Paper elevation={2} className={clsx(classes.borderBoxR, !isPromiseReady && classes.loading, classes.buttonBox)}>
        <Button name="bar" onClick={handleClick} className={clsx(typeChart === "bar" ? classes.selectedChart : "")}>
          <i className="fas fa-chart-bar"></i>
        </Button>
        <Button name="line" onClick={handleClick} className={clsx(typeChart === "line" ? classes.selectedChart : "")}>
          <i className="fas fa-chart-area"></i>
        </Button>
      </Paper>

      <Paper elevation={2} className={clsx(classes.GraphBox, !isPromiseReady && classes.loading)} >
        {Data.graph !== "" ? isPromiseReady ? <ChartComponent
          type={typeChart}
          data={getDataGraph()}
        /> : "" : <div className={classes.message}><Typography >No hay accesos la ultima semana</Typography></div>}
      </Paper>
    </div>
  );
}
