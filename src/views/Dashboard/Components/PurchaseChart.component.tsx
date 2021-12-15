import { ReactElement } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

interface ChartData {
  year: number;
  purchasesAttempted: number;
  purchasesCompleted: number;
}

const data: ChartData[] = [];

for (let i = 0; i < 7; i += 1) {
  const d = {
    year: 2000 + i,
    purchasesAttempted: Math.round(Math.random() * (300 + 50) + 100),
    purchasesCompleted: Math.round(Math.random() * (800 + 50) + 100),
  };

  data.push(d);
}

export const PurchaseChart = (): ReactElement => (
  <ResponsiveContainer width="100%" height={250}>
    <LineChart width={500} height={300} data={data}>
      <Line type="monotone" dataKey="purchasesAttempted" stroke="#077dff" dot={false} />
      <Line type="monotone" dataKey="purchasesCompleted" stroke="#00b0a7" dot={false} />
      <XAxis dataKey="year" />
      <YAxis />
      <Tooltip />
      <CartesianGrid vertical={false} strokeDasharray="6 6" />
    </LineChart>
  </ResponsiveContainer>
);
