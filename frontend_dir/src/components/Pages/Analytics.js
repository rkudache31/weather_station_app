import React, { useContext, useState } from "react";
import Sidebar from "../Pages/Sidebar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NodeContext from "../../context/nodesContext";
import Charts from "../Pages/Charts";
import { Card } from "react-bootstrap";
import classNames from "classnames";
import Container from "react-bootstrap/Container";
import Topbar from "../Content/Topbar";
import SideBar from "../Sidebar/Sidebar";

function Analytics(props) {
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
    setUid("");
    setStartDate("");
    setEndDate("");
  };
  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} to="" />
      <Container fluid className={classNames({ "is-open": sidebarIsOpen })}>
        <Topbar toggleSidebar={toggleSidebar} />
        <Row>
          <Col className="col-12 col-sm-10 mx-auto addUser">
            <Card class="">
              <h5>Analytics Chats</h5>
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
            </Card>
          </Col>
          <Row>
            <Col>
              <Form>
                <Form.Label>Uid Info :{uid}</Form.Label>
                <Form.Label>Start Date :{startdate}</Form.Label>
                <Form.Label>End Date :{enddate}</Form.Label>
              </Form>
            </Col>
          </Row>
          <Col className="col-12 col-sm-10 mx-auto chart-data">
            {nodeDate.length === 0 && "No Nodes to display.."}
            {nodeDate.map((node) => {
              return <Charts key={node._id} node={node} />;
            })}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
export default Analytics;
