import React from 'react';
import PieChart from './PieChart';

const ChartPie = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9C27B0',
          '#FF9800',
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4CAF50',
          '#9C27B0',
          '#FF9800',
        ],
      },
    ],
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <PieChart data={data} />
    </div>
  );
};

export default ChartPie;
