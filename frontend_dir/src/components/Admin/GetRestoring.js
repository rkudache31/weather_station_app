import NoteContext from "../../context/nodesContext";
import React, { useContext, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import classNames from "classnames";
import Topbar from "../Content/Topbar";
import SideBar from "../Sidebar/Sidebar";
import Restoring from "./Restoring";

const GetRestoring = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const context = useContext(NoteContext);
  const { nodes, getNodesRestore } = context;
  useEffect(() => {
    getNodesRestore();
  }, []);
  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} to="" />
      <Container fluid className={classNames({ "is-open": sidebarIsOpen })}>
        <Topbar toggleSidebar={toggleSidebar} />
        <h2>Get All Nodes</h2>
        <Row>
          <Col>
            <Row>
              {nodes.length === 0 && "No notes to display.."}
              {nodes.map((node, i) => {
                return <Restoring key={i} node={node} />;
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default GetRestoring;
