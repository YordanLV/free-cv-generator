import React from "react";
import { Chart } from "react-google-charts";

function DonutChart() {
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7], // CSS-style declaration
  ];

  const options = {
    title: "My Daily Activities",
    pieHole: 5,
    is3D: true,
    backgroundColor: "transparent",
  };
  return (
    <Chart
      chartType="PieChart"
      width="100%"
      height="400px"
      data={data}
      options={options}
    />
  );
}
function Pie() {
  const options = {
    is3D: true,
    backgroundColor: "transparent",
  };
  const data = [
    ["Task", "Hours per Day"],
    ["Work", 11],
    ["Eat", 2],
  ];
  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"200px"}
    />
  );
}

export default function Skills() {
  return (
    <div>
      <Pie />
      <DonutChart />
    </div>
  );
}
