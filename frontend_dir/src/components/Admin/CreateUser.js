import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/filepaths";
import { getTokenFromLocalStorage } from "./../lib/common";
import classNames from "classnames";
import Container from "react-bootstrap/Container";
import Topbar from "../Content/Topbar";
import SideBar from "../Sidebar/Sidebar";
import { Button, Form, Col, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
function CreateUser() {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  // console.log(name, email, password, passwordConfirm, role);
  const token = getTokenFromLocalStorage();
  const SingUp = async (e) => {
    e.preventDefault();
    try {
      if (
        name === "" ||
        email === "" ||
        password === "" ||
        passwordConfirm === "" ||
        role === ""
      ) {
        toast.error("All The Feailds Empty", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (password.length < 6 || passwordConfirm.length < 6) {
        toast.error("password must be 6 char!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const response = await fetch(
          "http://20.207.204.225:3001/api/v1/users/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              name,
              email,
              password,
              passwordConfirm,
              role,
            }),
          }
        );
        const res = await response.json();
        localStorage.setItem("UserID", res.userID);
        toast.success("Please Check Email to Verification", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate(APP_ROUTES.Verify);
      }
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
        <ToastContainer />
        <Row>
          <Col className="mx-auto col-10 col-md-8 col-lg-6">
            <h2>Create User</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email </Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={passwordConfirm}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Select Role</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="role "
                  onChange={(e) => setRole(e.target.value)}
                  value={role}
                />
              </Form.Group>
              <Button variant="primary" onClick={SingUp} type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CreateUser;
