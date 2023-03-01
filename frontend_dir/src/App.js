import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./components/css/bootstrap.css";
import NodesState from "./context/NodesState";
import Home from "./components/Pages/Home";
import Login from "./components/Pages/Login";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./components/Admin/AdminDashboard";
import UserDashboard from "./components/Users/UserDashboard";
import RoleAccess from "./Auth/RoleAccess";

import { APP_ROUTES } from "././utils/filepaths";

import Reports from "./components/Pages/Reports";
import GetNode from "./components/Pages/GetNode";
import AddNodes from "./components/Pages/AddNode";
import CreateUser from "./components/Admin/CreateUser";
import Analytics from "./components/Pages/Analytics";
import EditNode from "./components/Pages/EditNode";
import Verify from "./components/Admin/Verify";
import Root from "./Root";
import GetNodesUser from "./components/Users/GetNodesUser";
import GetRestoring from "./components/Admin/GetRestoring";
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route  path="/signin" element={<Login />} />
        <Route element={<RoleAccess roles={["admin"]} />}>
          <Route
            path={APP_ROUTES.ADMINDASHBOARD}
            element={<AdminDashboard />}
          />
          <Route path={APP_ROUTES.GETUSERNODE} element={<GetNode />} />
          <Route path={APP_ROUTES.Verify} element={<Verify />} />
          <Route path={APP_ROUTES.CREATEUSER} element={<CreateUser />} />
          <Route path={APP_ROUTES.Analytics} element={<Analytics />} />
          <Route path={APP_ROUTES.Edit} element={<EditNode />} />
          <Route path={APP_ROUTES.Restoring} element={<GetRestoring />} />
        </Route>
        <Route element={<RoleAccess roles={["user"]} />}>
          <Route path={APP_ROUTES.USERDASHBOARD} element={<UserDashboard />} />
          <Route path={APP_ROUTES.UserGetNode} element={<GetNodesUser />} />
        </Route>
        <Route element={<RoleAccess roles={["user", "admin"]} />}>
          <Route path={APP_ROUTES.REPORTS} element={<Reports />} />
          <Route path={APP_ROUTES.ADDNODES} element={<AddNodes />} />
          <Route path={APP_ROUTES.Analytics} element={<Analytics />} />
        </Route>
      </Route>
    )
  );
  return (
    <NodesState>
      <RouterProvider router={router} />
    </NodesState>
  );
};
export default App;
