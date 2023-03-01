import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faBookAtlas,
  faChartLine,
  faUser,
  faTrash,
  faServer,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../utils/filepaths";
const SideBar = ({ isOpen, toggle }) => {
  const navigate = useNavigate();
  const userType = localStorage.getItem("user");
  console.log(userType);
  return (
    <div>
      {(() => {
        switch (userType) {
          case "admin":
            return (
              <div className={classNames("sidebar", { "is-open": isOpen })}>
                <div className="sidebar-header">
                  <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                    &times;
                  </span>
                  <h3>Admin Dashboard</h3>
                </div>
                <div className="side-menu">
                  <Nav vertical className="list-unstyled pb-3">
                    <NavItem>
                      <NavLink
                        style={{ color: "white" }}
                        className="nav-links"
                        tag={Link}
                        to={APP_ROUTES.ADMINDASHBOARD}
                      >
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="icon-right"
                        />
                        Admin Dashboard
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-links"
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.CREATEUSER}
                      >
                        <FontAwesomeIcon icon={faUser} className="icon-right" />
                        Create Users
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-links"
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.ADDNODES}
                      >
                        <FontAwesomeIcon
                          icon={faImage}
                          className="icon-right"
                        />
                        Create Nodes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-links"
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.GETUSERNODE}
                      >
                        <FontAwesomeIcon icon={faServer} className="mr-2" />
                        Get Nodes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-links"
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.REPORTS}
                      >
                        <FontAwesomeIcon icon={faBookAtlas} className="mr-2" />
                        Reports
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-links"
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.Analytics}
                      >
                        <FontAwesomeIcon icon={faChartLine} className="mr-2" />
                        Analytics
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-links"
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.Restoring}
                      >
                        <FontAwesomeIcon icon={faTrash} className="mr-2" />
                        Restoring Nodes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-links"
                        style={{ color: "white" }}
                        onClick={() => {
                          localStorage.clear();
                          navigate("/signin");
                          window.location.reload();
                        }}
                        to={"/contact"}
                      >
                        <FontAwesomeIcon
                          icon={faArrowRightFromBracket}
                          className="mr-2"
                        />
                        Sign Out
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
            );
          case "user":
            return (
              <div className={classNames("sidebar", { "is-open": isOpen })}>
                <div className="sidebar-header">
                  <span color="info" onClick={toggle} style={{ color: "#fff" }}>
                    &times;
                  </span>
                  <h3>User Dashboard</h3>
                </div>
                <div className="side-menu">
                  <Nav vertical className="list-unstyled pb-3">
                    {/* <p>Dummy Heading</p> */}
                    <NavItem>
                      <NavLink
                        style={{ color: "white" }}
                        className="nav-links"
                        tag={Link}
                        to={APP_ROUTES.USERDASHBOARD}
                      >
                        <FontAwesomeIcon
                          icon={faBriefcase}
                          className="icon-right"
                        />
                        User Dashboard
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        className="nav-links"
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.ADDNODES}
                      >
                        <FontAwesomeIcon
                          icon={faImage}
                          className="icon-right"
                        />
                        Create Nodes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.UserGetNode}
                      >
                        <FontAwesomeIcon icon={faQuestion} className="mr-2" />
                        Get Nodes
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.REPORTS}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Reports
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ color: "white" }}
                        tag={Link}
                        to={APP_ROUTES.Analytics}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Analytics
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        style={{ color: "white" }}
                        onClick={() => {
                          localStorage.clear();
                          navigate("/signin");
                          window.location.reload();
                        }}
                        to={"/contact"}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                        Sign Out
                      </NavLink>
                    </NavItem>
                  </Nav>
                </div>
              </div>
            );
          default:
            return <div>You are a User.</div>;
        }
      })()}
    </div>
  );
};

export default SideBar;
