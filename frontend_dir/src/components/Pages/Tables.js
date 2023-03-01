import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
const Tables = (props) => {
  const { node, user, start, end } = props;
  const [mean, setMean] = useState();
  const [variance, setvariance] = useState();
  const [standardDeviation, setstandardDeviation] = useState();
  useEffect(() => {
    calculateStandardDeviation();
  }, []);
  const handlePrint = () => {
    window.print();
  };
  const calculateStandardDeviation = () => {
    const temperatureData = node.data.map((d) => d.temperature);
    const n = temperatureData.length;
    const mean = temperatureData.reduce((acc, d) => acc + d, 0) / n;
    const variance =
      temperatureData.reduce((acc, d) => acc + (d - mean) ** 2, 0) / n;
    const standardDeviation = Math.sqrt(variance);
    setMean(mean);
    setvariance(variance);
    setstandardDeviation(standardDeviation);
  };
  return (
    <>
      <Button onClick={handlePrint}>PRINT</Button>
      <h3>Node Id:-{user}</h3>
      <h3>Starting Date:-{start}</h3>
      <h3>Ending Date:-{end}</h3>
      <h3>Mean:-{mean}</h3>
      <h3>variance:-{variance}</h3>
      <h3>standardDeviation:{standardDeviation}</h3>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Temp</th>
            <th>Humi</th>
            <th>Wind</th>
            <th>Bio</th>
            <th>Golaba</th>
            <th>Rain</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {node.data.map((reading, index) => {
            return (
              <tr key={node._id + index}>
                <td>{index + 1}</td>
                <td>{reading.temperature}</td>
                <td>{reading.humidity}</td>
                <td>{reading.windSpeed}</td>
                <td>{reading.barometric}</td>
                <td>{reading.globalRadiation}</td>
                <td>{reading.rain}</td>
                <td>{new Date(reading.Date).toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};
export default Tables;
