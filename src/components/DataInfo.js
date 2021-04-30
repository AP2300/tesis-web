import React from 'react'
import TitleContainer from '../styles/TitleContainer';
const moment = require('moment');
moment().format();

export default function DataInfo(props) {
    const { TimeStamp, Data, classes } = props;
    let graphW = [0, 0, 0, 0, 0, 0, 0];
    let graphM = [0, 0, 0, 0, 0];
    let graphY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    switch (TimeStamp) {
        case "S":
            const days = [1, 2, 3, 4, 5, 6, 0];
            if (Data) {
                days.forEach((day, i) => {
                    Data[2].forEach(w => {
                        if (moment(w.RegDate).day() === day) {
                            graphW[i] = w;
                        }
                    })
                })
            }
            console.log(graphW)
            break;

        case "M":
            if (Data) {
                for (let i = 0; i < 5; i++) {
                    Data[2].forEach(w => {
                        if (i === w.week) {
                            graphM[i] = w.info;
                        }
                    })
                }
                console.log(graphM)
            }
            break;

        case "A":
            if (Data) {
                for (let i = 0; i < 12; i++) {
                    Data[2].forEach(w => {
                        if (i === w.month) {
                            graphY[i] = w.info;
                        }
                    })
                }
                console.log(graphY)
            }
            break;

        default:

            break;
    }
    return (
        <div className={classes}>

        </div>
    )

}