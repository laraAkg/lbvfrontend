class Auth {
  constructor() {
    this.authenticated = false;
  }

  login() {
  localStorage.setItem('isLoggedIn', true);
  }

  logout(cb) {
  localStorage.setItem('isLoggedIn', false);
  }

  isAuthenticated() {
    return localStorage.getItem('isLoggedIn');
  }
}

export default new Auth();
