import React from 'react';

const PieChart = ({ data, colors, width, height }) => {
  const total = data.reduce((acc, value) => acc + value, 0);
  let startAngle = 0;

  const renderSlice = (value, color, index) => {
    const angle = (value / total) * 360;
    const endAngle = startAngle + angle;
    const largeArcFlag = angle > 180 ? 1 : 0;

    const startX = Math.cos((startAngle * Math.PI) / 180) * width / 2 + width / 2;
    const startY = Math.sin((startAngle * Math.PI) / 180) * height / 2 + height / 2;

    const endX = Math.cos((endAngle * Math.PI) / 180) * width / 2 + width / 2;
    const endY = Math.sin((endAngle * Math.PI) / 180) * height / 2 + height / 2;

    const d = [
      `M ${width / 2} ${height / 2}`,
      `L ${startX} ${startY}`,
      `A ${width / 2} ${height / 2} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      'Z'
    ].join(' ');

    startAngle += angle;

    return <path key={index} d={d} fill={color} />;
  };

  return (
    <div className="w-[50px]">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
        {data.map((value, index) => renderSlice(value, colors[index], index))}
      </svg>
    </div>
  );
};

export default PieChart;
