import { React, useState, useEffect, useContext } from "react";
import NoteContext from "../../context/nodesContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import classNames from "classnames";
import Topbar from "../Content/Topbar";
import Sidebar from "../Sidebar/Sidebar";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function UserDashboard() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  const context = useContext(NoteContext);
  const { nodes, getNodes } = context;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    getNodes();
    const temps = nodes.map((node) => {
      return node.data.map((tem) => tem.temperature);
    });
    const humi = nodes.map((node) => {
      return node.data.map((tem) => tem.humidity);
    });
    const windSpeed = nodes.map((node) => {
      return node.data.map((tem) => tem.windSpeed);
    });
    const barometric = nodes.map((node) => {
      return node.data.map((tem) => tem.barometric);
    });
    const globalRadiation = nodes.map((node) => {
      return node.data.map((tem) => tem.globalRadiation);
    });
    const rain = nodes.map((node) => {
      return node.data.map((tem) => tem.rain);
    });
    const labels = nodes.map((node) => {
      return `User ID - ${node.uid}`;
    });

    const dataSource = {
      labels,
      datasets: [
        {
          label: "Node By Temperature",
          data: temps,
          backgroundColor: "rgba(255, 0, 0, 1)",
        },
        {
          label: "Node By humidity",
          data: humi,
          backgroundColor: "rgba(96, 40, 145, 0.8)",
        },
        {
          label: "Node By windSpeed",
          data: windSpeed,
          backgroundColor: "rgba(96, 247, 145, 0.8)",
        },
        {
          label: "Node By barometric",
          data: barometric,
          backgroundColor: "rgba(255, 255, 135, 0.8)",
        },
        {
          label: "Node By globalRadiation",
          data: globalRadiation,
          backgroundColor: "rgba(137, 222, 255, 0.8)",
        },
        {
          label: "Node By Rain",
          data: rain,
          backgroundColor: "rgba(7, 16, 20, 0.68)",
        },
      ],
    };
    setChartData(dataSource);
  }, [chartData]);

  // console.log(chartData);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Uid Node",
      },
    },
  };

  return (
    <div className="App wrapper">
      <Sidebar toggle={toggleSidebar} isOpen={sidebarIsOpen} to="" />
      <Container fluid className={classNames({ "is-open": sidebarIsOpen })}>
        <Topbar toggleSidebar={toggleSidebar} />
        <h1>Admin Dashbord</h1>
        <Row>
          <div className="col-12 col-sm-6">
            <Card>
              <h5>Home Pages</h5>
              <Bar options={options} data={chartData} />
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default UserDashboard;
