import { Card, CardContent, CardHeader, Divider, List, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import useStyles from "../styles/DataInfo";
import { OrderData, DayofWeek, ShowTime } from '../helpers/DataInfo'
import { GraphLabels } from '../helpers/Graph'
const moment = require('moment');
moment().format();

export default function DataInfo(props) {
    const classes = useStyles();
    const { TimeStamp, Data } = props;
    const [DataUser, setDataInfo] = useState(OrderData(TimeStamp, Data));

    useEffect(() => {
        setDataInfo(OrderData(TimeStamp, Data));
    }, [Data])

    if (Data !== false) {
        return (
            <div className={classes.Cardgrid}>
                {GraphLabels(TimeStamp).map((DayLabel, d) => {
                    if (DataUser) {
                        if (DataUser[d]) {
                            if (DataUser[d].length !== 0) {
                                return (
                                    <Card className={classes.Card} key={`day-${DayLabel}-${d}`}>
                                        <CardHeader className={classes.header} title={DayLabel} key={`header-${DayLabel}-${d}`} />
                                        <CardContent className={classes.content} key={`content-${DayLabel}-${d}`}>
                                            <List className={classes.List} key={`List-${DayLabel}-${d}`}>
                                                {DataUser[d].map((info, i) => 
                                                        <div key={`item-${DayLabel}-${i}`}>
                                                            <Typography>{`Registro N° ${info.IDRecords}`}</Typography>
                                                            <Typography>{`Dia ${DayofWeek(info.RegDate)}`}</Typography>
                                                            <Typography>{`Hora de Entrada:  ${ShowTime('h', moment(info.RegDate).hour())}:${ShowTime('m', moment(info.RegDate).minute())}
                                                             ${ShowTime('am/pm', moment(info.RegDate).hour())}`}</Typography>
                                                            <Divider className={classes.Divider} />
                                                        </div>
                                                )}
                                            </List>
                                        </CardContent>
                                    </Card>
                                )
                            }
                        }
                    }
                })}
            </div>
        )
    } else {
        return (
            <div className={classes.message}><Typography>No hay accesos para esta Fecha</Typography></div>
        )
    }
}