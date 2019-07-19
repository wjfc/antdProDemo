export function getCurrentUser(str) {
  return JSON.parse(localStorage.getItem('currentUser'));
}
export function setCurrentUser(userObj) {
  return localStorage.setItem('currentUser', JSON.stringify(userObj));
}
