"use client";
import { Card } from "@radix-ui/themes";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import React from "react";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
  const data = [
    { label: "Open", value: open },
    { label: "In Progress", value: inProgress },
    { label: "Closed", value: closed },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="label"></XAxis>
          <YAxis />
          <Bar dataKey="value" barSize={60} fill="var(--blue-10)" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
