import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip
} from "recharts";
import React, { ReactElement } from "react";

import { IChartData, IChart } from "../interface/Chart";

const initialData: IChartData[] = [
    { name: 1, cost: 4.11, impression: 100 },
    { name: 2, cost: 2.39, impression: 120 },
    { name: 3, cost: 1.37, impression: 150 },
    { name: 4, cost: 1.16, impression: 180 },
    { name: 5, cost: 2.29, impression: 200 },
    { name: 6, cost: 3, impression: 499 },
    { name: 7, cost: 0.53, impression: 50 },
    { name: 8, cost: 2.52, impression: 100 },
    { name: 9, cost: 1.79, impression: 200 },
    { name: 10, cost: 2.94, impression: 222 },
    { name: 11, cost: 4.3, impression: 210 },
    { name: 12, cost: 4.41, impression: 300 },
    { name: 13, cost: 2.1, impression: 50 },
    { name: 14, cost: 8, impression: 190 },
    { name: 15, cost: 0, impression: 300 },
    { name: 16, cost: 9, impression: 400 },
    { name: 17, cost: 3, impression: 200 },
    { name: 18, cost: 2, impression: 50 },
    { name: 19, cost: 3, impression: 100 },
    { name: 20, cost: 7, impression: 100 }
];


const initialState: IChart = {
    data: initialData,
    left: "dataMin",
    right: "dataMax",
    top: "dataMax+1",
    bottom: "dataMin-1",
    top2: "dataMax+20",
    bottom2: "dataMin-20",
    animation: true
};

const ChartComponent = (): ReactElement => {

    const {
        data,
        left,
        right,
        top,
        bottom,
        top2,
        bottom2
    } = initialState;


    return (
        <div className="highlight-bar-charts">
            <LineChart
                width={800}
                height={400}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    allowDataOverflow
                    dataKey="name"
                    domain={[left, right]}
                    type="number"
                />
                <YAxis
                    allowDataOverflow
                    domain={[bottom, top]}
                    type="number"
                    yAxisId="1"
                />
                <YAxis
                    orientation="right"
                    allowDataOverflow
                    domain={[bottom2, top2]}
                    type="number"
                    yAxisId="2"
                />
                <Tooltip />
                <Line
                    yAxisId="1"
                    type="natural"
                    dataKey="cost"
                    stroke="#8884d8"
                    animationDuration={300}
                />
                <Line
                    yAxisId="2"
                    type="natural"
                    dataKey="impression"
                    stroke="#82ca9d"
                    animationDuration={300}
                />
            </LineChart>
        </div>
    );
};

export default ChartComponent;