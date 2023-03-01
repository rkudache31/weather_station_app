import { React, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Charts = (props) => {
  const { node } = props;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });
  useEffect(() => {
    lineChart();
  }, [chartData]);
  const lineChart = () => {
    const temps = node.data.map((reading) => {
      return reading.temperature;
    });
    const humiditys = node.data.map((reading) => {
      return reading.humidity;
    });
    const windSpeeds = node.data.map((reading) => {
      return reading.windSpeed;
    });
    const barometrics = node.data.map((reading) => {
      return reading.barometric;
    });
    const globalRadiations = node.data.map((reading) => {
      return reading.globalRadiation;
    });
    const rains = node.data.map((reading) => {
      return reading.rain;
    });
    const labels = node.data.map((reading) => {
      return `Dates - ${reading.Date}`;
    });
    const dataSource = {
      labels,
      datasets: [
        {
          label: "Node By Temperature",
          data: temps,
          backgroundColor: "rgba(255, 0, 0, 1)",
          borderColor: "rgba(255, 0, 0, 1)",
        },
        {
          label: "Node By Humidity",
          data: humiditys,
          backgroundColor: "rgba(25, 0, 0, 2)",
          borderColor: "rgba(25, 0, 0, 2)",
        },
        {
          label: "Node By WindSpeed",
          data: windSpeeds,
          backgroundColor: "rgba(150, 200, 0, 2)",
          borderColor: "rgba(150, 200, 0, 2)",
        },
        {
          label: "Node By barometrics",
          data: barometrics,
          backgroundColor: "rgba(10, 100, 0, 2)",
          borderColor: "rgba(10, 100, 0, 2)",
        },
        {
          label: "Node By globalRadiations",
          data: globalRadiations,
          backgroundColor: "rgb(255, 255, 0)",
          borderColor: "rgb(255, 255, 0)",
        },
        {
          label: "Node By rains",
          data: rains,
          backgroundColor: "rgb(255, 18, 146)",
          borderColor: "rgb(255, 18, 146)",
        },
      ],
    };
    setChartData(dataSource);
  };

  const options = {
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };
  return (
    <>
      <Card>
        <h5>Bar Chart</h5>
        <Line options={options} data={chartData} />
      </Card>
    </>
  );
};
export default Charts;
