const _ = require('lodash');
const moment = require('moment');
moment().format();

export function calcNumWeek(year,month){
    let indexWeek = [];
    let j = 0;
    for (let i = 0; i < 5; i++) {
        let date = String(moment(`${year}-${month+1}-${i === 0 ? 1 : (i*7)+j}`, "YYYY MM DD hh:mm:ss").startOf('isoWeek'));
        if(i !== 0){
            if(date === indexWeek[i-1]){
                j++;
                date = String(moment(`${year}-${month+1}-${i === 0 ? 1 : (i*7)+j}`, "YYYY MM DD hh:mm:ss").startOf('isoWeek'))
            }
        }
        indexWeek.push(date);
    }
    return indexWeek;
}

export function setNumWeek(year,month){
    let indexWeek = calcNumWeek(year,month);
    indexWeek.map((e,i) => {
        if(e === String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek'))){
            return i
        }
    });
}

export function FilterSearch(UserData, month, year, TimeStamp) {
    let graphData = [];
    let groupedResults = "";
    let result = "";
    switch (TimeStamp) {
        case "S":
            groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('month'));
            result = Object.entries(groupedResults);
            
            result.forEach((e) => {
                if(month === moment(e[0], "dd MMM DD YYYY").month() && year === moment(e[0], "dd MMM DD YYYY").year()){
                    let dates = _.groupBy(e[1], (DateData) => moment(DateData.RegDate).startOf('isoWeek'));
                    let order = Object.entries(dates);
                    graphData = _.orderBy(order, (DateData) => moment(DateData[0], "dd MMM DD YYYY").startOf('isoWeek'));
                }
            })
            return graphData;
        case "M":
            groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('month'));
            result = Object.entries(groupedResults);
            result.forEach((e) => {
                if(month === moment(e[0], "dd MMM DD YYYY").month() && year === moment(e[0], "dd MMM DD YYYY").year()){
                    let dates = _.groupBy(e[1], (DateData) => moment(DateData.RegDate).startOf('isoWeek'));
                    let order = Object.entries(dates);
                    graphData = _.orderBy(order, (DateData) => moment(DateData[0], "dd MMM DD YYYY").startOf('isoWeek'));
                }
            })
            return graphData;
        case "A":
            groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('year'));
            result = Object.entries(groupedResults);
            result.forEach((e) => {
                if(year === moment(e[0], "dd MMM DD YYYY").year()){
                    let monthsData = _.groupBy(e[1], (Data) => moment(Data.RegDate).startOf('month'));
                    let res = Object.entries(monthsData);
                    graphData = _.orderBy(res, (Data) => moment(Data[0], "dd MMM DD YYYY").startOf('month'));
                }
            })
            return graphData;
        default:
            return graphData;
    }
}

export function ChangeGraph(TimeStamp,year,month,week,graphData){
    let graphW = [ 0 , 0 , 0 , 0 , 0 , 0 , 0 ];
    let graphM = [ 0 , 0 , 0 , 0 , 0 ];
    let graphY = [ 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ];
    let indexWeek = calcNumWeek(year,month);
    switch (TimeStamp) {
        case "S":
            const days = [1, 2, 3, 4, 5, 6, 0];
            graphData.forEach((d) => {
                if(d[0] === indexWeek[week]){
                    d[1].forEach(date => {
                        days.forEach((day,d) => {
                            if(day === moment(date.RegDate).day()){
                                graphW[d] += 1;                                 
                            }
                        })
                    })
                }
            })
            if(getDateAccess(graphW) === 0){
                return false;
            } else return [["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"],graphW];
        case "M":
            const weeks = ["1era", "2da", "3era", "4ta", "5ta"];
            if(graphData){
                graphData.forEach((d,i) => {
                    indexWeek.forEach((w) =>{
                        if(d[0] === w){
                            graphM[i] = d[1].length;
                        }
                    })
                })
            }
            if(getDateAccess(graphM) === 0){
                return false;
            }
            return [weeks,graphM];
        case "A":
            const monthsShort = moment()._locale._monthsShort;
            const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            if(graphData){
                for (let i = 0; i < 12; i++) {
                    graphData.forEach((y) => {
                        if(monthsShort[i] === y[0].split(" ")[1]) graphY[i] = y[1].length; 
                    })
                }
            }
            if(getDateAccess(graphY) === 0){
                return false;
            } else {
                return [months,graphY];
            }
        default:
            return false;
    }
} 

export const setGradientColor = (canvas) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0,0,80,400);
    gradient.addColorStop(0, "#2978b5b2");
    gradient.addColorStop(0.95, "#caffbfb2");
    return gradient;
}

export function getDateAccess(graphData) {
    let calc = 0;
    if(graphData){
        graphData.forEach(e => {
            calc += e;
        })
    }
    return calc
  }

export function generateGraphData(graphData) {
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
    if(getDateAccess(graph) === 0){
        return false;
    } else {
        return graph
    }
}