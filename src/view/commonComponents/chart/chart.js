import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// const data = [
//     { name: 'Page A', pv: 1  },
// ];
const DummyChart = ({ data, width, height }) => {

  return (<LineChart width={width} height={height} data={data}
    margin={{ top: 0, right: 30, left: 20, bottom: 5 }}>
    <XAxis dataKey="month" />
    <YAxis />
    <CartesianGrid strokeDasharray="3 3" />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
  </LineChart>)
}
export default DummyChart;