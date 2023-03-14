const API_URL = "http://back-svc:3001";
export const API_ROUTES = {
  SIGN_UP: `${API_URL}/api/v1/users/signup`,
  SIGN_IN: `${API_URL}/api/v1/users/login`,
  ADD_NODES: `${API_URL}/api/v1/nodes`,
  GET_NODES: `${API_URL}/api/v1/nodes`,
};

export const APP_ROUTES = {
  SIGN_UP: "/signup",
  SIGN_IN: "/signin",
  CREATEUSER: "/admin/createuser",
  Analytics: "/analytics",
  USERDASHBOARD: "/user/dashboard",
  ADMINDASHBOARD: "/admin/dashboard",
  ADDNODES: "/addnodes",
  DISPLAYNODES: "/admin/displaynodes",
  USERADDNODES: "/user/addnodes",
  GETUSERNODE: "/getnodes",
  UserGetNode: "/user/getnodes",
  NODEEDIT: "/user/editnodes",
  REPORTS: "/reports",
  Edit: "/edit",
  Verify: "/verify",
  Restoring:"/admin/restoring"
};
