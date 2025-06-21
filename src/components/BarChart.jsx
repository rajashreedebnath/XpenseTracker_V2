import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

export default function BarChartComponent({ data }) {
  return (
    <div>
      <h2 className="text-[28px] text-white italic mb-2 text-center sm:text-left">
        Top Expenses
      </h2>

      <div className="bg-white rounded-[10px] px-5 py-1.5">
        <ResponsiveContainer height={320}>
          <BarChart data={data} layout="vertical">
            <XAxis type="number" axisLine={false} hide />
            <YAxis
              type="category"
              width={110}
              dataKey="name"
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="value" fill="#8784D2" barSize={25} radius={[0, 5, 5, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
