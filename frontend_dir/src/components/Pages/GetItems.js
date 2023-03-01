import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import NoteContext from "../../context/nodesContext";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
const GetItems = (props) => {
  const [modal, setmodal] = useState(false);
  const { node } = props;
  const context = useContext(NoteContext);
  const { deleteTempNode, editNodes } = context;
  const [id, setid] = useState(node._id);
  const [uid, setUid] = useState(node.uid);
  const [location, setLocation] = useState(node.location);
  const [sublocation, setSubLocation] = useState(node.sublocation);
  const [templow, setTemplow] = useState(node.templow);
  const [temphigh, setTemphigh] = useState(node.temphigh);
  const [humilow, setHumilow] = useState(node.humilow);
  const [humihigh, setHumihigh] = useState(node.humihigh);
  const [windlow, setWindlow] = useState(node.windlow);
  const [windhigh, setWindhigh] = useState(node.windhigh);
  const [baromelow, setBaromelow] = useState(node.baromelow);
  const [baromehigh, setBaromehigh] = useState(node.baromehigh);
  const [globallow, setGloballow] = useState(node.globallow);
  const [globalhigh, setGlobalhigh] = useState(node.globalhigh);
  const [rainlow, setRainlow] = useState(node.rainlow);
  const [rainhigh, setRainhigh] = useState(node.rainhigh);
  const handleDelete = () => {
    setTimeout(() => {
      try {
        toast.success("Delete Node", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        deleteTempNode(node._id);
      } catch (error) {
        toast.error("Something Went Wrong", {
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
    }, 50);
  };
  const handleEdit = (e) => {
    e.preventDefault();
    editNodes(
      id,
      uid,
      location,
      sublocation,
      templow,
      temphigh,
      humilow,
      humihigh,
      windlow,
      windhigh,
      baromelow,
      baromehigh,
      globallow,
      globalhigh,
      rainlow,
      rainhigh
    );
    setmodal(false);
  };
  return (
    <>
      <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
        <ModalHeader toggle={() => setmodal(!modal)}>Update Nodes</ModalHeader>
        <ModalBody>
          <form>
            <Row>
              <Col lg={12}>
                <div>
                  <label hidden htmlFor="uid">
                    id
                  </label>
                  <input
                    hidden
                    type="text"
                    className="form-control"
                    placeholder="Enter Uid"
                    value={id}
                    onChange={(e) => setid(e.target.value)}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="uid">Uid</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Uid"
                    value={uid}
                    onChange={(e) => setUid(e.target.value)}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="sublocation">Sub Location</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Sub Location"
                    value={sublocation}
                    onChange={(e) => setSubLocation(e.target.value)}
                  />
                </div>
              </Col>
              <Row>
                <Col lg={6}>
                  <div>
                    <label htmlFor="mintemp">Min Temperature</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Min Temperature"
                      value={templow}
                      onChange={(e) => setTemplow(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="maxtemp">Max Temperature</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Max Temperature"
                      value={temphigh}
                      onChange={(e) => setTemphigh(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="minhum">Min Humidity</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Min Humidity"
                      value={humilow}
                      onChange={(e) => setHumilow(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="maxhum">Max Humidity</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Max Humidity"
                      value={humihigh}
                      onChange={(e) => setHumihigh(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="minwindspeed">Min Wind Speed</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Min Wind Speed"
                      value={windlow}
                      onChange={(e) => setWindlow(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="maxwindspeed">Max Wind Speed</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Max Wind Speed"
                      value={windhigh}
                      onChange={(e) => setWindhigh(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="minbaro">Min Barometric </label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Min Barometric"
                      value={baromelow}
                      onChange={(e) => setBaromelow(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="maxbaro">Max Barometric </label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Max Barometric"
                      value={baromehigh}
                      onChange={(e) => setBaromehigh(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="minglobal">Min Global Radiation</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Min Global Radiation"
                      value={globallow}
                      onChange={(e) => setGloballow(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="maxglobal">Max Global Radiation</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Max Global Radiation"
                      value={globalhigh}
                      onChange={(e) => setGlobalhigh(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="minrain">Min Rain</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Min Rain"
                      value={rainlow}
                      onChange={(e) => setRainlow(e.target.value)}
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <label htmlFor="maxrain">Max Rain</label>
                    <input
                      type="Number"
                      className="form-control"
                      placeholder="Max Rain"
                      value={rainhigh}
                      onChange={(e) => setRainhigh(e.target.value)}
                    />
                  </div>
                </Col>
              </Row>
            </Row>
            <button
              className="btn mt-3"
              style={{ background: "#0b3629", color: "white" }}
              onClick={handleEdit}
            >
              Submit
            </button>
          </form>
        </ModalBody>
      </Modal>
      <div class="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3" id="thumb">
        <ToastContainer />
        <div class="thumbBox">
          <h4>{node.uid}</h4>
          <p>
            Users:-<span className="spans">{node.user}</span>
          </p>
          <p>
            Location:-<span className="spans">{node.location}</span>
          </p>
          <p>
            Sublocation:-<span className="spans">{node.sublocation}</span>
          </p>
          {node.data.slice(-1).map((index, items) => {
            const temperatureData =
              index.temperature >= node.templow &&
              index.temperature <= node.temphigh;
            const humidityData =
              index.humidity >= node.humilow && index.humidity <= node.humihigh;
            const windSpeedData =
              index.windSpeed >= node.windlow &&
              index.windSpeed <= node.windhigh;
            const barometricData =
              index.barometric >= node.baromelow &&
              index.barometric <= node.baromehigh;
            const globalRadiationData =
              index.globalRadiation >= node.globallow &&
              index.globalRadiation <= node.globalhigh;
            const rainData =
              index.rain >= node.rainlow && index.rain <= node.rainhigh;

            return (
              <div key={items} class="sudData">
                <p>
                  Temperature:-
                  <span className="spans">{index.temperature}</span>
                </p>
                <p>
                  Humidity:-<span className="spans">{index.humidity}</span>
                </p>
                <p>
                  Wind Speed:-<span className="spans">{index.windSpeed}</span>
                </p>
                <p>
                  Barometric:-<span className="spans">{index.barometric}</span>
                </p>
                <p>
                  GlobalRadiation:-
                  <span className="spans">{index.globalRadiation}</span>
                </p>
                <p>
                  Rain:-<span className="spans">{index.rain}</span>
                </p>
                <p>
                  Last Update Date
                  <span className="spans">
                    {new Date(index.Date).toLocaleString()}
                  </span>
                </p>
                <h1>
                  {temperatureData &&
                  humidityData &&
                  windSpeedData &&
                  barometricData &&
                  globalRadiationData &&
                  rainData
                    ? "Health"
                    : "Unhealth"}
                </h1>
                <button className="btns editbtn" onClick={() => setmodal(true)}>
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                </button>
                <button
                  className="btns deletebtn"
                  onClick={() => {
                    handleDelete();
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} className="mr-2" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default GetItems;
