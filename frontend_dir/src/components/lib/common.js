export function storeTokenInLocalStorage(token) {
  localStorage.setItem("token", token);
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem("token");
}

export function storeRoleInLocalStorage(role) {
  localStorage.setItem("role", role);
}
export function getRoleFromLocalStorage() {
  return localStorage.setItem("role");
}
