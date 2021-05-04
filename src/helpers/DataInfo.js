const moment = require('moment');
moment().format();

export const OrderData = (TimeStamp, Data) => {
    let graphD = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let graphW = [0, 0, 0, 0, 0, 0, 0];
    let graphM = [0, 0, 0, 0, 0, 0];
    let graphY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    switch (TimeStamp) {
        case "D":
            if (Data) {
                for (let i = 0; i <= 23; i++) {
                    graphD[i] = [];
                    Data[2].forEach((w) => {
                        if (w.hour === i) {
                            graphD[i] = [...graphD[i], w.info];
                        }
                    })
                }
                return graphD;
            }
            break;

        case "S":
            const days = [1, 2, 3, 4, 5, 6, 0];
            if (Data) {
                days.forEach((day, i) => {
                    graphW[i] = [];
                    Data[2].forEach(w => {
                        if (moment(w.RegDate).day() === day) {
                            graphW[i] = [...graphW[i], w];
                        }
                    })
                })
                return graphW;
            }
            break;

        case "M":
            if (Data) {
                for (let i = 0; i < 6; i++) {
                    graphM[i] = [];
                    Data[2].forEach(w => {
                        if (i === w.week) {
                            console.log(w.info,i)
                            graphM[i] = w.info;
                        }
                    })
                }
                return graphM;
            }
            break;

        case "A":
            if (Data) {
                for (let i = 0; i < 12; i++) {
                    graphY[i] = [];
                    Data[2].forEach(w => {
                        if (i === w.month) {
                            graphY[i] = w.info;
                        }
                    })
                }
                return graphY;
            }
            break;

        default:
            return false;
            break;
    }
}

export const DayofWeek = (Date) => {
    switch (moment(Date).day()) {
        case 0:
            return "Domingo";

        case 1:
            return "Lunes";

        case 2:
            return "Martes";

        case 3:
            return "Miercoles";

        case 4:
            return "Jueves";

        case 5:
            return "Viernes";

        case 6:
            return "Sabado";

        default:
            return "no data";

    }
}

export const ShowTime = (type,data) => {
    let value = "00";
    switch (type) {
        case "h":
            if(data === 0){
                return "01";
            }
            else if( data > 12){
                value = data - 12;
                return value;
            }
            else {
                return data;
            }
            break;

        case "m":
            if(data === 0){
                return value;
            } else {
                return data;
            }
            break;

        default:
            return "no data";

    }
}