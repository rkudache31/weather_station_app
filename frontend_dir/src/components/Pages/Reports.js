import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classNames from "classnames";
import Topbar from "../Content/Topbar";
import SideBar from "../Sidebar/Sidebar";
import NodeContext from "../../context/nodesContext";
import Tables from "../Pages/Tables";
function Reports(props) {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const context = useContext(NodeContext);
  const { nodeDate, GetUidAndDate } = context;
  const [uid, setUid] = useState("");
  const [startdate, setStartDate] = useState("");
  const [enddate, setEndDate] = useState("");
  const handleClick = (e) => {
    e.preventDefault();
    GetUidAndDate(uid, startdate, enddate);
  };
  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} to="" />
      <Container fluid className={classNames({ "is-open": sidebarIsOpen })}>
        <Topbar toggleSidebar={toggleSidebar} />
        <h1>Report</h1>
        <Col>
          <Row>
            <Col>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicUid">
                  <Form.Label>Enter UID</Form.Label>
                  <Form.Control
                    type="text"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                    placeholder="Enter name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUid">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Control
                    value={startdate}
                    onChange={(e) => setStartDate(e.target.value)}
                    type="datetime-local"
                    placeholder="Enter name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicUid">
                  <Form.Label>End Date</Form.Label>
                  <Form.Control
                    value={enddate}
                    onChange={(e) => setEndDate(e.target.value)}
                    type="datetime-local"
                    placeholder="Enter name"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" onClick={handleClick}>
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <Row></Row>
          <Row>
            <Col>
              {nodeDate.length === 0 && "No Nodes to display.."}
              {nodeDate.map((node) => {
                return (
                  <Tables
                    key={node._id}
                    node={node}
                    user={uid}
                    start={startdate}
                    end={enddate}
                  />
                );
              })}
            </Col>
          </Row>
        </Col>
      </Container>
    </div>
  );
}
export default Reports;
