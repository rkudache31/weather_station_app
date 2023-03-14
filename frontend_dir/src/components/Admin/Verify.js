import React, { useState } from "react";
import Sidebar from "../Pages/Sidebar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Topbar from "../Content/Topbar";
import SideBar from "../Sidebar/Sidebar";
import { ToastContainer, toast } from "react-toastify";
import classNames from "classnames";
function Verify() {
  const Id = localStorage.getItem("UserID");
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const navigate = useNavigate();
  const [userID, setUserId] = useState(Id);
  const [otp, setOtp] = useState("");
  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://${env.BACK_HOST}:3001/api/v1/users/verifyOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userID,
            otp,
          }),
        }
      );
      const res = await response.json();
      // console.log(res);
      toast.success("User Verification Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      // console.log(error);
      toast("Some this Wants Wrong", {
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
        <Row>
          <Col className="mt-5" xs lg="10">
            <h2>Create Users</h2>
            <ToastContainer />
            <Row>
              <Col>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label hidden>Name</Form.Label>
                    <Form.Control hidden
                      type="text"
                      placeholder="Enter Id"
                      value={userID}
                      onChange={(e) => setUserId(Id)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control
                      type="number"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder="Enter OTP"
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={verifyOtp} type="submit">
                    Submit
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Verify;
