/**
 * Methods for the authentication
 * @author Lara Akgün
 * @author Enma Ronquillo
 * @version 08.11.2019
 */
class Auth {
  constructor() {
    this.authenticated = false;
  }

  //Store if user is logged in
  login() {
    localStorage.setItem("isLoggedIn", true);
  }

  //Store if user is logout
  logout(cb) {
    localStorage.setItem("isLoggedIn", false);
  }

  //Check if user is authenticated
  isAuthenticated() {
    return localStorage.getItem("isLoggedIn");
  }
}

export default new Auth();
