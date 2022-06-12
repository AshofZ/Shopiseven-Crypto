import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
    const coinPrice = [currentPrice];
    const coinTimestamp = [];

    {
        coinHistory?.map((i) => (
            coinPrice.push(i[1])
        ))
    }

    {
        coinHistory?.map((i) => (
            coinTimestamp.push(new Date(i[0]).toLocaleDateString())
        ))
    }

    const data = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        scales: {
            y: {
                type: 'linear',
                display: true,
                position: 'left',
            }
        },
    };

    return (
        <Line data={data} options={options} />
    )
}

export default LineChart