import React from "react";
// import Home from "../home/home";
// import Services from "../services/service";

// import LineChart from "../charts/lineChart";
// import PieChart from "../charts/charts";
// import Search from "../search/search";
// import Adddata from "../CurdTable/addData";

//import DoughnutjsonChart from "../charts/doughnutNew";
//import Contact from "../form/contact";

import {
  Route,
  Link,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";

import SideNav, {
  Toggle,
  Nav,
  NavItem,
  NavIcon,
  NavText,
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "../../index.css";

function LeftNav() {
  return (
    <Router>
      <Route
        render={({ location, history }) => (
          <React.Fragment>
            <SideNav
              onSelect={(selected) => {
                const to = "/" + selected;
                if (location.pathname !== to) {
                  history.push(to);
                }
              }}
            >
              <SideNav.Toggle />
              <SideNav.Nav defaultSelected="home">
                <NavItem eventKey="home">
                  <NavIcon>{/* <img src={homeicon} /> */}</NavIcon>
                  <NavText>Home</NavText>
                </NavItem>
                <NavItem eventKey="Services">
                  <NavIcon>{/* <img src={serviceicon} /> */}</NavIcon>
                  <NavText>Charts</NavText>
                  <NavItem eventKey="LineChart">
                    <NavText>Line Chart</NavText>
                  </NavItem>
                  <NavItem eventKey="PieChart">
                    <NavText>Pie Chart</NavText>
                  </NavItem>
                </NavItem>

                <NavItem eventKey="#">
                  <NavIcon>{/* <img src={assisticon} /> */}</NavIcon>
                  <NavText>Form</NavText>
                </NavItem>
                <NavItem eventKey="Search">
                  <NavIcon>{/* <img src={searchicon} /> */}</NavIcon>
                  <NavText>Search</NavText>
                </NavItem>
                <NavItem eventKey="Adddata">
                  <NavIcon>{/* <img src={addUsericon} /> */}</NavIcon>
                  <NavText>Adddata</NavText>
                </NavItem>
              </SideNav.Nav>
            </SideNav>

            <main class="mainWrap">
              {/* <Route path="/" exact component={(props) => <Home />} />
              <Route path="/home" component={(props) => <Home />} />
              <Route path="/Services" component={(props) => <Services />} />
              <Route path="/LineChart" component={(props) => <LineChart />} />
              <Route path="/PieChart" component={(props) => <PieChart />} />

              <Route path="/Search" component={(props) => <Search />} />
              <Route path="/Adddata" component={(props) => <Adddata />} /> */}
            </main>
          </React.Fragment>
        )}
      />
    </Router>
  );
}

export default LeftNav;
