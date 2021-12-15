import { ReactElement } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChartData {
  day: number;
  activeSessions: number;
}

const data: ChartData[] = [];

for (let i = 1; i <= 7; i += 1) {
  const d = {
    day: i,
    activeSessions: Math.round(Math.random() * (300 + 50) + 100),
  };

  data.push(d);
}

export const ActiveSessionsChart = (): ReactElement => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart data={data}>
      <Line type="monotone" dataKey="activeSessions" stroke="#00b0a7" dot />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <CartesianGrid vertical={false} strokeDasharray="6 6" />
    </LineChart>
  </ResponsiveContainer>
);
