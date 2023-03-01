import { React, useState, useEffect, useContext } from "react";
import NoteContext from "../../context/nodesContext";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { Bar } from "react-chartjs-2";
import classNames from "classnames";
import Container from "react-bootstrap/Container";
import Topbar from "../Content/Topbar";
import SideBar from "../Sidebar/Sidebar";
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

function AdminDashboard() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const context = useContext(NoteContext);
  const { nodes, getNodes, userData, getUser } = context;
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    setTimeout(() => {
      getNodes();
      getUser();

      const temps = nodes.map((node) => {
        return node.data.slice(-1).map((tem) => tem.temperature);
      });
      const humi = nodes.map((node) => {
        return node.data.slice(-1).map((tem) => tem.humidity);
      });
      const windSpeed = nodes.map((node) => {
        return node.data.slice(-1).map((tem) => tem.windSpeed);
      });
      const barometric = nodes.map((node) => {
        return node.data.slice(-1).map((tem) => tem.barometric);
      });
      const globalRadiation = nodes.map((node) => {
        return node.data.slice(-1).map((tem) => tem.globalRadiation);
      });
      const rain = nodes.map((node) => {
        return node.data.slice(-1).map((tem) => tem.rain);
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
    }, 5000);
    return () => {
      console.log("Claen up ");
    };
  }, [chartData]);

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
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} to="" />
      <Container fluid className={classNames({ "is-open": sidebarIsOpen })}>
        <Topbar toggleSidebar={toggleSidebar} />
        <Row>
          <div className="col-12 col-sm-6">
            <Card>
              <h5>User List</h5>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Role</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.role}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
        <Row>
          <div className="col-12 col-sm-8">
            <Card>
              <h5>All Node Chart</h5>
              <Bar options={options} data={chartData} />
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
