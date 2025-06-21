
import React from "react";
import { Chart } from "react-google-charts";


export const options = {
  legend: {
    position: "none",
  },
  backgroundColor: '#626262',
  chartArea: {
    width: "80%",
    backgroundColor: {
      stroke: '#626262',
    },
  },
  fontName: "ubuntu",
  colors: ['#A000FF', '#FF9304', '#FDE006'],
};

const PieChart = ({ data }) => {

  const renderCategories = () => {
    return (
      <div className="flex justify-center gap-5 mt-4">
        {data.slice(1).map((item, index) => (
          <div key={index} className="text-center text-white text-sm">
            <div
              style={{
                backgroundColor: options.colors[index],
              }}
              className="w-[30px] h-[10px] mx-auto"
            ></div>
            <span>{item[0]}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[20rem] p-4">
      <div className="relative w-[15rem] h-[15rem]">
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width="100%"
          height="100%"
        />
        {renderCategories()}
      </div>
    </div>
  );
};

export default PieChart;
