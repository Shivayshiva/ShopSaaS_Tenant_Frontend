"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 1", revenue: 4000, expense: 2400 },
  { name: "Week 2", revenue: 3000, expense: 1398 },
  { name: "Week 3", revenue: 2000, expense: 9800 },
  { name: "Week 4", revenue: 2780, expense: 3908 },
];

export function RevenueExpenseChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="revenue" fill="#10b981" />
        <Bar dataKey="expense" fill="#ef4444" />
      </BarChart>
    </ResponsiveContainer>
  );
}

