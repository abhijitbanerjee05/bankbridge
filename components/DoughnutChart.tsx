"use client"

import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ accounts }: {accounts : Account[]}) => {
    const getLabels = () => {
        return accounts.map( (a) => a.name);
    }

    const getBalance = () => {
        return accounts.map( (a) => a.currentBalance);
    }

    const data = {
        datasets : [
            {
                label: 'Balance',
                data: getBalance(),
                backgroundColor: ['#0747b6', '#2265d8', '#2f91fa']
            }
        ],
        labels: getLabels()
    }
    return (
        <Doughnut
            data={data}
            options={{
                cutout: '60%',
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }}
        />
    )
}

export default DoughnutChart