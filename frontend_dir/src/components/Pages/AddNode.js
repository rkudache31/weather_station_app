import React, { useContext, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import NodeContext from "../../context/nodesContext";
import classNames from "classnames";
import Topbar from "../Content/Topbar";
import SideBar from "../Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";

const AddNodes = (props) => {
  const auth = localStorage.getItem("user");
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const context = useContext(NodeContext);
  const { addNodes } = context;
  const role = localStorage.getItem("user");
  const [uid, setUid] = useState("");
  const [user, setUser] = useState(role);
  const [location, setLocation] = useState("");
  const [sublocation, setSublocation] = useState("");
  const [temperatureMin, setTemperatureMin] = useState("");
  const [temperatureMax, setTemperatureMax] = useState("");
  const [humidityMin, setHumidityMin] = useState("");
  const [humidityMax, setHumidityMax] = useState("");
  const [windSpeedMin, setWindSpeedMin] = useState("");
  const [windSpeedMax, setWindSpeedMax] = useState("");
  const [barometricMin, setBarometricMin] = useState("");
  const [barometricMax, setBarometricMax] = useState("");
  const [globalRadiationMin, setGlobalRadiationMin] = useState("");
  const [globalRadiationMax, setGlobalRadiationMax] = useState("");
  const [rainMin, setRainMin] = useState("");
  const [rainMax, setRainMax] = useState("");

  // const navigate = useNavigate();
  const handleClick = (e) => {
    e.preventDefault();
    try {
      addNodes(
        uid,
        user,
        location,
        sublocation,
        temperatureMin,
        temperatureMax,
        humidityMin,
        humidityMax,
        windSpeedMin,
        windSpeedMax,
        barometricMin,
        barometricMax,
        globalRadiationMin,
        globalRadiationMax,
        rainMin,
        rainMax
      );
      toast.success("Add Node Successfuly", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setUid("");
      setUser("");
      setSublocation("");
      setLocation("");
      setTemperatureMin("");
      setTemperatureMax("");
      setHumidityMin("");
      setHumidityMax("");
      setGlobalRadiationMin("");
      setGlobalRadiationMax("");
      setBarometricMin("");
      setBarometricMax("");
      setWindSpeedMin("");
      setWindSpeedMax("");
      setRainMin("");
      setRainMax("");
    } catch (error) {
      toast("Something Waint Wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  return (
    <div className="App wrapper">
      <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} to="" />
      <Container fluid className={classNames({ "is-open": sidebarIsOpen })}>
        <Topbar toggleSidebar={toggleSidebar} />
        <h3 className="text-center mb-3">Add Nodes</h3>
        <ToastContainer />
        <Row>
          <Col className="col-12 col-sm-10 mx-auto addUser">
            <Form>
              <Row>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formUid">
                    <Form.Label>Enter Uid</Form.Label>
                    <Form.Control
                      type="text"
                      name="uid"
                      value={uid}
                      onChange={(e) => setUid(e.target.value)}
                      placeholder="Enter Uid"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formLocation">
                    <Form.Label>Enter Location</Form.Label>
                    <Form.Control
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Enter Location"
                    />
                  </Form.Group>
                </Col>
                <Col lg={6}>
                  <Form.Group className="mb-3" controlId="formSubLocation">
                    <Form.Label>Enter Sub Location</Form.Label>
                    <Form.Control
                      type="text"
                      value={sublocation}
                      onChange={(e) => setSublocation(e.target.value)}
                      placeholder="Enter Sub Location"
                    />
                  </Form.Group>
                </Col>
                <Row>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formTemperature">
                      <Form.Label>Enter Temperature Min</Form.Label>
                      <Form.Control
                        type="number"
                        value={temperatureMin}
                        onChange={(e) => setTemperatureMin(e.target.value)}
                        placeholder="Enter Temperature Min"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formTemperature">
                      <Form.Label>Enter Temperature Max</Form.Label>
                      <Form.Control
                        type="number"
                        value={temperatureMax}
                        onChange={(e) => setTemperatureMax(e.target.value)}
                        placeholder="Enter Temperature Max"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formHumidity">
                      <Form.Label>Enter Humidity Min</Form.Label>
                      <Form.Control
                        type="number"
                        value={humidityMin}
                        onChange={(e) => setHumidityMin(e.target.value)}
                        placeholder="Enter Humidity Min"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formHumidity">
                      <Form.Label>Enter Humidity Max</Form.Label>
                      <Form.Control
                        type="number"
                        value={humidityMax}
                        onChange={(e) => setHumidityMax(e.target.value)}
                        placeholder="Enter Humidity Max"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formwindSpeed">
                      <Form.Label>Enter Wind Speed Min</Form.Label>
                      <Form.Control
                        type="number"
                        value={windSpeedMin}
                        onChange={(e) => setWindSpeedMin(e.target.value)}
                        placeholder="Enter Wind Speed Min"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formwindSpeed">
                      <Form.Label>Enter Wind Speed Max</Form.Label>
                      <Form.Control
                        type="number"
                        value={windSpeedMax}
                        onChange={(e) => setWindSpeedMax(e.target.value)}
                        placeholder="Enter Wind Speed Max"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formBarometric">
                      <Form.Label>Enter Barometric Min</Form.Label>
                      <Form.Control
                        type="number"
                        value={barometricMin}
                        onChange={(e) => setBarometricMin(e.target.value)}
                        placeholder="Enter Barometric Min"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formBarometric">
                      <Form.Label>Enter Barometric Max</Form.Label>
                      <Form.Control
                        type="number"
                        value={barometricMax}
                        onChange={(e) => setBarometricMax(e.target.value)}
                        placeholder="Enter Barometric Min"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formGlobalRadiation"
                    >
                      <Form.Label>Enter Global Radiation Min</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Global Radiation"
                        value={globalRadiationMin}
                        onChange={(e) => setGlobalRadiationMin(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group
                      className="mb-3"
                      controlId="formGlobalRadiation"
                    >
                      <Form.Label>Enter Global Radiation Max</Form.Label>
                      <Form.Control
                        type="number"
                        placeholder="Enter Global Radiation Max"
                        value={globalRadiationMax}
                        onChange={(e) => setGlobalRadiationMax(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formRain">
                      <Form.Label>Enter Rain Min</Form.Label>
                      <Form.Control
                        type="number"
                        value={rainMin}
                        onChange={(e) => setRainMin(e.target.value)}
                        placeholder="Enter Rain Min"
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={6}>
                    <Form.Group className="mb-3" controlId="formRain">
                      <Form.Label>Enter Rain Max</Form.Label>
                      <Form.Control
                        type="number"
                        value={rainMax}
                        onChange={(e) => setRainMax(e.target.value)}
                        placeholder="Enter Rain Max"
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Row>

              <Button variant="primary" onClick={handleClick} type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddNodes;
