import React from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails, InputLabel,
    FormControlLabel, Typography, TextField, MenuItem, FormControl,
    Paper, Divider, AccordionActions, Select, IconButton, Button
} from "@material-ui/core";
import { GraphLabels, getYearRange, calcNumWeek, DaysInMonth } from '../helpers/Graph'

export default function GraphFormControl(props) {
    const { TimeStamp, Dates, handleChange, className } = props;
    return (
        <div className={className}>
            <FormControl className="timestamp">
                <InputLabel id="Timestamp">Escala de tiempo</InputLabel>
                <Select
                    labelId="Timestamp"
                    name="Timestamp"
                    id="Timestamp"
                    value={TimeStamp}
                    onChange={handleChange}
                >
                    <MenuItem value="D">Diario</MenuItem>
                    <MenuItem value="S">Semanal</MenuItem>
                    <MenuItem value="M">Mensual</MenuItem>
                    <MenuItem value="A">Anual</MenuItem>
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="day">Dia</InputLabel>
                <Select
                    id="week-simple-select"
                    value={Dates.day}
                    name="day"
                    onChange={handleChange}
                    disabled={TimeStamp === "A" || TimeStamp === "M" || TimeStamp === "S" ? true : false}
                >
                    {DaysInMonth(Dates.month, Dates.year).map((w, i) => <MenuItem key={i} value={w}>{w}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="week">Semana</InputLabel>
                <Select
                    labelId="week"
                    id="week"
                    name="week"
                    value={Dates.week}
                    onChange={handleChange}
                    disabled={TimeStamp === "A" || TimeStamp === "M" || TimeStamp === "D" ? true : false}
                >
                    {GraphLabels("M").map((w, i) => {
                        if (calcNumWeek(Dates.year, Dates.month).length === 6) {
                            return <MenuItem key={i} value={i} disabled={Dates.NumWeek}>{w}</MenuItem>
                        } else if (i < 5) {
                            return <MenuItem key={i} value={i}>{w}</MenuItem>
                        }
                    })}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="month">Mes</InputLabel>
                <Select
                    labelId="month"
                    id="month"
                    name="month"
                    value={Dates.month}
                    onChange={handleChange}
                    disabled={TimeStamp === "A" ? true : false}
                >
                    {GraphLabels("A").map((e, i) => <MenuItem key={i} value={i}>{String(e)}</MenuItem>)}
                </Select>
            </FormControl>

            <FormControl>
                <InputLabel id="year">Año</InputLabel>
                <Select
                    labelId="year"
                    id="year"
                    name="year"
                    value={Dates.year}
                    onChange={handleChange}
                >
                    {getYearRange().map((e, i) => <MenuItem key={i} value={e}>{String(e)}</MenuItem>)}
                    <MenuItem value={2022}>2022</MenuItem>
                    <MenuItem value={2023}>2023</MenuItem>
                    <MenuItem value={2024}>2024</MenuItem>
                    <MenuItem value={2025}>2025</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}