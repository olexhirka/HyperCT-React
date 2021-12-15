import { ReactElement } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

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

export const SubscribedChart = (): ReactElement => (
  <ResponsiveContainer width="100%" height={250}>
    <BarChart data={data}>
      <Bar type="monotone" dataKey="activeSessions" fill="#007dff" />
      <XAxis dataKey="day" />
      <YAxis />
      <Tooltip />
      <CartesianGrid vertical={false} strokeDasharray="6 6" />
    </BarChart>
  </ResponsiveContainer>
);
