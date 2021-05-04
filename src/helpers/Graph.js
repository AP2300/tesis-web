const _ = require('lodash');
const moment = require('moment');
moment().format();

export function calcNumWeek(year, month) {
    let indexWeek = [];
    let j = 0;
    for (let i = 0; i < 6; i++) {
        let date = String(moment(`${year}-${month + 1}-${i === 0 ? 1 : (i * 7) + j}`, "YYYY MM DD hh:mm:ss").startOf('isoWeek'));

        if (indexWeek[i - 1] === String(moment(`${year}-${month + 1}-${23}`, "YYYY MM DD hh:mm:ss").startOf('isoWeek'))) {
            date = String(moment(`${year}-${month + 1}-${30}`, "YYYY MM DD hh:mm:ss").startOf('isoWeek'));
        }
        else if (indexWeek[i - 1] === String(moment(`${year}-${month + 1}-${24}`, "YYYY MM DD hh:mm:ss").startOf('isoWeek'))) {
            if (String(moment(`${year}-${month + 1}-${31}`, "YYYY MM DD hh:mm:ss").startOf('isoWeek')) !== "Invalid date") {
                date = String(moment(`${year}-${month + 1}-${31}`, "YYYY MM DD hh:mm:ss").startOf('isoWeek'));
            }
        }
        else if (i !== 0) {
            if (date === indexWeek[i - 1]) {
                j++;
                date = String(moment(`${year}-${month + 1}-${i === 0 ? 1 : (i * 7) + j}`, "YYYY MM DD hh:mm:ss").startOf('isoWeek'))
            }
        }
        if (date !== "Invalid date") {
            indexWeek.push(date);
        }
    }
    return indexWeek;
}

export function setNumWeek(year, month) {
    let indexWeek = calcNumWeek(year, month);
    indexWeek.map((e, i) => {
        if (e === String(moment(moment()._d, "DD MM YYYY hh:mm:ss").startOf('isoWeek'))) {
            return i
        }
    });
}

export function FilterSearch(UserData, month, year, day, TimeStamp) {
    let graphData = [];
    let groupedResults = "";
    let result = "";
    switch (TimeStamp) {
        case "D":
            groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('day'));
            result = Object.entries(groupedResults);
            result.forEach((e) => {
                if (moment(`${day}-${month+1}-${year}`, "DD MM YYYY").dayOfYear() === moment(e[0], "dd MMM DD YYYY").dayOfYear()) {
                    graphData = e[1];
                }
            })
            return graphData;
        case "S":
            groupedResults = _.groupBy(UserData, (UserData) => moment(UserData.RegDate).startOf('month'));
            result = Object.entries(groupedResults);
            result.forEach((e) => {
                if (month === moment(e[0], "dd MMM DD YYYY").month() && year === moment(e[0], "dd MMM DD YYYY").year()) {
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
                if (month === moment(e[0], "dd MMM DD YYYY").month() && year === moment(e[0], "dd MMM DD YYYY").year()) {
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
                if (year === moment(e[0], "dd MMM DD YYYY").year()) {
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

export const DaysInMonth = (month, year) =>{
    let ArrayDay = [];
    let days = moment(`${year}-${month+1}-1`, "YYYY MM").daysInMonth();
    for (let i = 1; i <= days; i++) {
        ArrayDay.push(i);
    }
    return ArrayDay;
} 

export const GraphLabels = (TimeStamp) => {
    switch (TimeStamp) {
        case "D":
            return ["12 am", "1 am", "2 am", "3 am", "4 am", "5 am", "6 am", "7 am", "8 am", "9 am", "10 am", "11 am", "12 pm"
                , "1 pm", "2 pm", "3 pm", "4 pm", "5 pm", "6 pm", "7 pm", "8 pm", "9 pm", "10 pm", "11 pm"];
        case "S":
            return ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
        case "M":
            return ["1era Semana", "2da Semana", "3era Semana", "4ta Semana", "5ta Semana", "6ta Semana"];
        case "A":
            return ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        default:
            return ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];
    }
}

export function getYearRange() {
    let val = 2021;
    let year = new Date()
    val = val - year.getFullYear() + 1;
    let newArr = new Array(val);
    for (let i = 0; i < newArr.length; i++) {
        newArr[i] = 2021 + i;
    }
    return newArr
}

export function ChangeGraph(TimeStamp, year, month, week, graphData) {
    let OrderResut = "";
    let graphD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let graphW = [0, 0, 0, 0, 0, 0, 0];
    let graphM = [0, 0, 0, 0, 0, 0];
    let graphY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let indexWeek = calcNumWeek(year, month);
    let info = [];
    switch (TimeStamp) {
        case "D":
            let hours = GraphLabels(TimeStamp);
            graphData.forEach((d) => {
                hours.forEach((h, i) => {
                    if (i === moment(d.RegDate).hour()) {
                        info.push({ hour: i, info: d })
                        graphD[i] += 1;
                    }
                });
            })
            if (getDateAccess(graphD) === 0) {
                return false;
            } else return [GraphLabels(TimeStamp), graphD, info];

        case "S":
            const days = [1, 2, 3, 4, 5, 6, 0];
            graphData.forEach((d) => {
                if (d[0] === indexWeek[week]) {
                    info = d[1];
                    d[1].forEach(date => {
                        days.forEach((day, d) => {
                            if (day === moment(date.RegDate).day()) {
                                graphW[d] += 1;
                            }
                        })
                    })
                }
            })
            if (getDateAccess(graphW) === 0) {
                return false;
            } else return [GraphLabels(TimeStamp), graphW, info];

        case "M":
            if (graphData) {
                graphData.forEach((d) => {
                    indexWeek.forEach((w, i) => {
                        if (d[0] === w) {
                            OrderResut = _.orderBy(d[1], (UserData) => moment(UserData.RegDate).startOf('day'));
                            info.push({ week: i, info: OrderResut });
                            graphM[i] = d[1].length;
                        }
                    })
                })
            }
            if (getDateAccess(graphM) === 0) {
                return false;
            }
            return [GraphLabels(TimeStamp), graphM, info];

        case "A":
            const monthsShort = moment()._locale._monthsShort;
            const months = GraphLabels(TimeStamp);
            if (graphData) {
                for (let i = 0; i < 12; i++) {
                    graphData.forEach((y) => {
                        if (monthsShort[i] === y[0].split(" ")[1]) {
                            OrderResut = _.orderBy(y[1], (UserData) => moment(UserData.RegDate).startOf('day'));
                            info[i] = { month: i, info: OrderResut }
                            graphY[i] = y[1].length;
                        }
                    })
                }
            }
            if (getDateAccess(graphY) === 0) {
                return false;
            } else {
                return [months, graphY, info];
            }
        default:
            return false;
    }
}

export const setGradientColor = (canvas, colors) => {
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 370);
    gradient.addColorStop(colors[0].stop, colors[0].color);
    gradient.addColorStop(colors[1].stop, colors[1].color);
    gradient.addColorStop(colors[2].stop, colors[2].color);
    return gradient;
}

export function getDateAccess(graphData) {
    let calc = 0;
    if (graphData) {
        graphData.forEach(e => {
            calc += e;
        })
    }
    return calc
}

export function generateGraphData(graphData) {
    let graph = [0, 0, 0, 0, 0, 0, 0];
    const days = [1, 2, 3, 4, 5, 6, 0];
    if (graphData) {
        graphData[1].forEach(date => {
            days.forEach((day, d) => {
                if (day === moment(date.RegDate).day()) {
                    graph[d] += 1;
                }
            });
        });
    }
    if (getDateAccess(graph) === 0) {
        return false;
    } else {
        return graph
    }
}