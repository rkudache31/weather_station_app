import NoteContext from "../../context/nodesContext";
import React, { useContext, useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "react-bootstrap";
import GetItems from "../Pages/GetItems";
import classNames from "classnames";
import Topbar from "../Content/Topbar";
import SideBar from "../Sidebar/Sidebar";
const GetNodesUser = () => {
  const authId = localStorage.getItem("userId");
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const context = useContext(NoteContext);
  const { userNodesValue, getNodesUser, editNodes } = context;
  const [enodes, setenodes] = useState({
    uid: "",
    user: "",
    location: "",
    sublocation: "",
    temperature: "",
    humidity: "",
    windSpeed: "",
    barometric: "",
    globalRadiation: "",
    rain: "",
  });
  const onchange = (e) => {
    setenodes({ ...enodes, [e.target.name]: e.target.value });
  };
  const handleEdit = (e) => {
    e.preventDefault();
    editNodes(
      enodes._id,
      enodes.location,
      enodes.sublocation,
      enodes.temperature,
      enodes.humidity,
      enodes.windSpeed,
      enodes.barometric,
      enodes.globalRadiation,
      enodes.rain
    );
    refclose.current.click();
  };

  useEffect(() => {
    getNodesUser(authId);
  }, []);

  console.log(userNodesValue);
  const ref = useRef(null);
  const refclose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setenodes(currentNote);
  };

  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} to="" />
      <Container fluid className={classNames({ "is-open": sidebarIsOpen })}>
        <Topbar toggleSidebar={toggleSidebar} />
        <h2>Get All Nodes</h2>
        <Row>
          <Col>
            <Row>
              {userNodesValue.length === 0 && "No notes to display.."}
              {userNodesValue.map((node) => {
                return (
                  <GetItems
                    key={node._id}
                    node={node}
                    enodes={enodes}
                    onchange={onchange}
                    handleEdit={handleEdit}
                    updateNote={updateNote}
                  />
                );
              })}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default GetNodesUser;
