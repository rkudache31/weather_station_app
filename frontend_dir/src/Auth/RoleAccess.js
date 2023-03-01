import { Navigate, Outlet } from "react-router-dom";
const RoleAccess = ({ roles = [] }) => {
  const user = localStorage.getItem("user");
  return !roles.length || roles.includes(user) ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" replace />
  );
};
export default RoleAccess;
