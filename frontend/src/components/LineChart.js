import React from 'react'
import { Line } from 'react-chartjs-2'

export const LineChart = ({ chartData }) => {
    const formattedLabels = chartData.labels.map(label => new Date(label).toLocaleString())

    const formattedData = {
        ...chartData,
        labels: formattedLabels,
    }
    return (
        <Line
            data={formattedData}
            options={{
                responsive: true,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    },
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Time',
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Price',
                        },
                    },
                },
            }}
        />
    )
}
