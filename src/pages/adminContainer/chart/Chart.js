import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import "./chart.css"
export default function Chart({ title, data, dataKey, grid }) {

  return (
    <div className="chart">
      <h3 className="chartTitle">{title}</h3>
      <ResponsiveContainer aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey= "name" stroke="#301934" />
          <Line type="monotone" dataKey={dataKey} stroke="#301934" />
          <Tooltip />
          {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5"/>}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
