import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import validator from "validator";
import "../helper/GeneralStyle.css";
import { Link, withRouter } from "react-router-dom";
import authentication from "../helper/authentication";

/**
 * Login page for user
 * @author Lara Akgün
 * @author Enma Ronquillo
 * @version 08.11.2019
 */
class Login extends React.Component {
  constructor(props) {
    super(props);

    this.formDefaults = {
      email: { value: "", message: "Invalid Email" },
      password: { value: "", message: "Invalid password" }
    };

    this.state = {
      errors: { email: true, password: true },
      responseError: "",
      ...this.formDefaults
    };
  }

  //Checks if email is valid
  checkEmail = value => {
    return validator.isEmail(value);
  };

  //Checks if password is more than 10 char long
  checkPassword = value => {
    return value.length >= 10;
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: { ...this.state[e.target.name], value: e.target.value }
    });
  };

  handleSubmit = e => {
    const isEmailValid = this.checkEmail(this.state.email.value);
    const isPasswordValid = this.checkPassword(this.state.password.value);
    const isError = !isEmailValid || !isPasswordValid;

    this.setState({
      errors: {
        email: isEmailValid,
        password: isPasswordValid
      }
    });

    //Request and Response from backend
    if (!isError) {
      let that = this;
      fetch("http://localhost:8080/login", {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          username: this.state.email.value,
          password: this.state.password.value
        })
      })
        .then(function(res) {
          res.text().then(value => {
            if (value == 1) {
              authentication.login();
              that.props.history.push("/blog");
            } else {
              that.setState({
                responseError: value
              });
            }
          });
        })
        .catch(function(res) {
          console.log(res);
        });
    }
    console.log(this.state);
  };

  render() {
    //Error for invalid Response
    let errorResponse;
    if (this.state.responseError) {
      errorResponse = <span className="error">{this.state.responseError}</span>;
      console.log(this.state.responseError);
    }

    //Error for invalid email
    let errorEmail;
    if (!this.state.errors.email) {
      errorEmail = <span className="error">{this.state.email.message}</span>;
    }

    //Error for invalid password
    let errorPassword;
    if (!this.state.errors.password) {
      errorPassword = (
        <span className="error">{this.state.password.message}</span>
      );
    }

    return (
      <div class="backgroundSquare">
        <div id="textInCenter">
          <h1>Login</h1>
        </div>

        <form className="FormFields" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label className="FormField__Label" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              className="form-control FormField__Input"
              placeholder="Enter your email"
              name="email"
              value={this.state.email.value}
              onChange={this.handleChange}
            />
            {errorEmail}
          </div>

          <div className="form-group">
            <label className="FormField__Label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control FormField__Input"
              placeholder="Enter your password"
              name="password"
              value={this.state.password.value}
              onChange={this.handleChange}
            />
            {errorPassword}
          </div>

          <div className="btn-group">
            <Button
              className="btn btn-primary"
              variant="primary"
              onClick={this.handleSubmit}
            >
              Login{" "}
            </Button>
            <div class="divider" />

            <Link to="register" className="btn btn-default">
              Register
            </Link>
          </div>
        </form>
        {errorResponse}
      </div>
    );
  }
}

export default withRouter(Login);
