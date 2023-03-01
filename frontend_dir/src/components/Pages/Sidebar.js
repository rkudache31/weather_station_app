import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Col from "react-bootstrap/Col";
const Sidebar = ({ openClass }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = localStorage.getItem("user");
  console.log(userType);
  return (
    <Col xs lg="2" style={{ backgroundColor: "#e9ecef" }}>
      {(() => {
        switch (userType) {
          case "admin":
            return (
              <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li className="nav-item mb-2 mt-3">
                  <a className="nav-link text-secondary" href="#">
                    <h5>Admin Nejam</h5>
                  </a>
                </li>
                <li className="nav-item mb-2 ">
                  <a className="nav-link text-secondary" href="#">
                    <i className="fas fa-user font-weight-bold"></i>{" "}
                    <span className="ml-3">
                      <Link to="/admin/createuser">Create User</Link>
                    </span>
                  </a>
                </li>
                <li className="nav-item mb-2 ">
                  <a className="nav-link text-secondary" href="#">
                    <i className="fas fa-user font-weight-bold"></i>{" "}
                    <span className="ml-3">
                      <Link to="/addnodes">Add Nodes</Link>
                    </span>
                  </a>
                </li>
                <li className="nav-item mb-2 ">
                  <a className="nav-link text-secondary" href="#">
                    <i className="fas fa-user font-weight-bold"></i>{" "}
                    <span className="ml-3">
                      <Link to="/getnodes">Get Nodes</Link>
                    </span>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a
                    className="nav-link text-secondary"
                    href="#submenu1"
                    data-toggle="collapse"
                    data-target="#submenu1"
                  >
                    <i class="far fa-file-word font-weight-bold"></i>
                    <Link to="/reports">Reports</Link>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link text-secondary" href="#">
                    <i className="far fa-chart-bar font-weight-bold"></i>{" "}
                    <span className="ml-3">
                      <Link to="/analytics">Analytics</Link>
                    </span>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link text-secondary" href="#">
                    <i className="fas fa-file-export font-weight-bold"></i>
                    <span className="ml-3">Export</span>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link text-secondary" href="#">
                    <i className="fas fa-tablet-alt font-weight-bold"></i>
                    <span className="ml-3">Snippets</span>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link text-secondary" href="#">
                    <i className="fas fa-atom font-weight-bold"></i>{" "}
                    <span className="ml-3">Flex</span>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link text-secondary" href="#">
                    <i className="far fa-folder font-weight-bold"></i>{" "}
                    <span className="ml-3">Layouts</span>
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link text-secondary" href="#">
                    Templates
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a className="nav-link text-secondary" href="#">
                    Themes
                  </a>
                </li>
              </ul>
            );
          case "user":
            return (
              <ul className="nav flex-column sticky-top pl-0 pt-5 p-3 mt-3 ">
                <li className="nav-item mb-2 mt-3">
                  <a className="nav-link text-secondary" href="#">
                    <h5>user Dashbord</h5>
                  </a>
                </li>
                <li className="nav-item mb-2 ">
                  <a className="nav-link text-secondary" href="#">
                    <i class="fas fa-user font-weight-bold"></i>{" "}
                    <span className="ml-3">
                      <Link to="/addnodes">Add Nodes</Link>
                    </span>
                  </a>
                </li>
                <li className="nav-item mb-2 ">
                  <a className="nav-link text-secondary" href="#">
                    <i class="fas fa-user font-weight-bold"></i>{" "}
                    <span className="ml-3">
                      <Link to="/getnodes">Get Nodes</Link>
                    </span>
                  </a>
                </li>
                <li class="nav-item mb-2">
                  <a
                    class="nav-link text-secondary"
                    href="#submenu1"
                    data-toggle="collapse"
                    data-target="#submenu1"
                  >
                    <i class="far fa-file-word font-weight-bold"></i>
                    <Link to="/reports">Reports</Link>
                  </a>
                  <ul
                    class="list-unstyled flex-column pl-3 collapse"
                    id="submenu1"
                    aria-expanded="false"
                  >
                    <li class="nav-item mb-2 ">
                      <a class="nav-link text-secondary" href="">
                        <i class="fas fa-book-reader"></i> Data Report{" "}
                      </a>
                    </li>
                    <li class="nav-item mb-2 ">
                      <a class="nav-link text-secondary" href="">
                        {" "}
                        <i class="fas fa-book-medical"></i> File Report{" "}
                      </a>
                    </li>
                  </ul>
                </li>
                <li class="nav-item mb-2">
                  <a class="nav-link text-secondary" href="#">
                    <i class="far fa-chart-bar font-weight-bold"></i>{" "}
                    <Link to="/analytics">Analytics</Link>
                  </a>
                </li>
                <li class="nav-item mb-2">
                  <a class="nav-link text-secondary" href="#">
                    <i class="fas fa-file-export font-weight-bold"></i>
                    <span className="ml-3">Export</span>
                  </a>
                </li>
                <li class="nav-item mb-2">
                  <a class="nav-link text-secondary" href="#">
                    <i class="fas fa-tablet-alt font-weight-bold"></i>
                    <span className="ml-3">Snippets</span>
                  </a>
                </li>
                <li class="nav-item mb-2">
                  <a class="nav-link text-secondary" href="#">
                    <i class="fas fa-atom font-weight-bold"></i>{" "}
                    <span className="ml-3">Flex</span>
                  </a>
                </li>
                <li class="nav-item mb-2">
                  <a class="nav-link text-secondary" href="#">
                    <i class="far fa-folder font-weight-bold"></i>{" "}
                    <span className="ml-3">Layouts</span>
                  </a>
                </li>
                <li class="nav-item mb-2">
                  <a class="nav-link text-secondary" href="#">
                    Templates
                  </a>
                </li>
                <li class="nav-item mb-2">
                  <a class="nav-link text-secondary" href="#">
                    Themes
                  </a>
                </li>
              </ul>
            );
          default:
            return <div>You are a User.</div>;
        }
      })()}
    </Col>
  );
};

export default Sidebar;
