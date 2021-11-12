import React from 'react';
import { Radar as Chart, ChartComponentProps } from 'react-chartjs-2';
import { useTheme } from 'styled-components';

const Radar: React.FC<ChartComponentProps> = ({ ...props }) => {
  const theme = useTheme();

  return (
    <Chart
      options={{
        scale: {
          ticks: {
            display: false,
            max: 6,
            min: 0,
            stepSize: 1
          },
          gridLines: {
            lineWidth: 2,
            color: theme.colors.lightGrey,
          },
          angleLines: {
            lineWidth: 2,
            color: theme.colors.lightGrey,
          },
          pointLabels: {
            fontColor: theme.colors.darkGrey,
            fontFamily: 'Exo 2',
            fontSize: 16,
          },
        },
      }}
      {...props}
    />
  );
};

export default Radar;
