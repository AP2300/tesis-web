import React from 'react';
import { Line, Bar } from "react-chartjs-2";

export default function ChartComponent(props) {
    const {type,data, redraw, plugins} = props;
    const options={
        maintainAspectRatio: false,
        responsiveAnimationDuration: 100,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1,
            }
          }]
        }
      }
    const render = type === "line" ? type === "bar" ? 
        "" : 
        <Line
            data={data}
            redraw={redraw}
            options={options}
            plugins={plugins}
        /> : 
        <Bar
            data={data}
            redraw={redraw}
            options={options}
            plugins={plugins}
        />;
    return ( 
        render
    );
}

// plugins={[{
//     beforeInit: function(canvas) {
//         const ctx = canvas.ctx;                                                            
//         const gradient = ctx.createLinearGradient(0,0,ctx.canvas.attributes.height.value,ctx.canvas.attributes.width.value/0.8);
//         gradient.addColorStop(0, "#2978b5b2");
//         gradient.addColorStop(0.95, "#caffbfb2");
//         canvas.data.datasets[0].backgroundColor = gradient;
//         canvas.data.datasets[0].borderColor = gradient;
//     }
// }]} 