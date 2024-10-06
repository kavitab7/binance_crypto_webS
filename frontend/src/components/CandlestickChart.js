import React from 'react';
import Chart from 'react-apexcharts';
import { Chart as ChartJS, registerables, CategoryScale } from 'chart.js'

ChartJS.register(...registerables, CategoryScale)

export const CandlestickChart = ({ chartData }) => {
    const options = {
        chart: {
            type: 'candlestick',
            height: 400,
            width: 600,
        },
        title: {
            text: 'Candlestick Chart',
            align: 'left',
        },
        xaxis: {
            type: 'datetime',
            labels: {
                format: 'MMM dd HH:mm',
            },
        },
        yaxis: {
            title: {
                text: 'Price',
            },
        },
    };

    const series = [
        {
            name: 'Candlestick',
            data: chartData.datasets[0].data.map(dataPoint => ({
                x: new Date(dataPoint.t).toISOString(),
                y: [dataPoint.o, dataPoint.h, dataPoint.l, dataPoint.c],
            })),
        },
    ];

    return (
        <div>
            <Chart options={options} series={series} type="candlestick" height={400} />
        </div>
    );
};
