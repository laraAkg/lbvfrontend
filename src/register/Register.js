import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import validator from "validator";
import "../helper/GeneralStyle.css";
import { Link, withRouter } from "react-router-dom";
import authentication from "../helper/authentication";

/**
 * Register page for user
 * @author Lara Akgün
 * @author Enma Ronquillo
 * @version 08.11.2019
 */
class Register extends React.Component {
  constructor(props) {
    super(props);

    this.formDefaults = {
      email: { value: "", message: "Invalid Email" },
      password: { value: "", message: "Password too short" },
      confPassword: { value: "", message: "Password not same" },
      age: { value: "", message: "Age is empty" },
      gender: { value: "", message: "Please select your gender" },
      country: { value: "switzerland", message: "Invalid option" }
    };

    this.state = {
      errors: {
        email: true,
        password: true,
        age: true,
        confPassword: true,
        gender: true
      },
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

  //Checks if passwords are equal
  checkConfirmPassword = value => {
    return value === this.state.password.value && value.length >= 6;
  };

  //Checks if gender is selected
  checkIfGenderNull = value => {
    return value;
  };

  //Checks if age is written
  checkIfAgeIsNull = value => {
    return !value == "";
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: { ...this.state[e.target.name], value: e.target.value }
    });
  };

  //Get Triggered when user click on register button
  handleSubmit = e => {
    const isEmailValid = this.checkEmail(this.state.email.value);
    const isPasswordValid = this.checkPassword(this.state.password.value);
    const isAgeValid = this.checkIfAgeIsNull(this.state.age.value);
    const isConfPasswordValid = this.checkConfirmPassword(
      this.state.confPassword.value
    );
    const isGenderSelected = this.checkIfGenderNull(this.state.gender.value);
    const isError =
      !isEmailValid ||
      !isPasswordValid ||
      !isAgeValid ||
      !isConfPasswordValid ||
      !isGenderSelected;
    this.setState({
      errors: {
        email: isEmailValid,
        password: isPasswordValid,
        confPassword: isConfPasswordValid,
        age: isAgeValid,
        gender: isGenderSelected
      }
    });
    //Request and Response from backend

    if (!isError) {
      let that = this;
      fetch("http://localhost:8080/register", {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          username: this.state.email.value,
          password: this.state.password.value,
          age: this.state.age.value,
          gender: this.state.gender.value,
          state: this.state.country.value
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

    //Error for invalid conf password
    let errorConfPassword;
    if (!this.state.errors.confPassword) {
      errorConfPassword = (
        <span className="error">{this.state.confPassword.message}</span>
      );
    }

    //Error for invalid age
    let errorAge;
    if (!this.state.errors.age) {
      errorAge = <span className="error">{this.state.age.message}</span>;
    }

    //Error for invalid gender
    let errorGender;
    if (!this.state.errors.gender) {
      errorGender = <span className="error">{this.state.gender.message}</span>;
    }

    return (
      <div class="backgroundSquare">
        <div class="textInCenter">
          <h1>Register</h1>
        </div>

        <form onSubmit={this.handleSubmit} className="FormFields">
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

          <div className="form-group">
            <label className="FormField__Label" htmlFor="password">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control FormField__Input"
              placeholder="Confirm your password"
              name="confPassword"
              value={this.state.confPassword.value}
              onChange={this.handleChange}
            />
            {errorConfPassword}
          </div>

          <div className="form-group">
            <label className="FormField__Label" htmlFor="number">
              Age
            </label>
            <input
              type="number"
              className="form-control FormField__Input"
              placeholder="Age"
              name="age"
              value={this.state.age.value}
              onChange={this.handleChange}
            />
            {errorAge}
          </div>

          <div>
            <div
              className="form-check form-check-inline"
              onChange={this.handleChange}
            >
              <input type="radio" id="male" value="male" name="gender" />
              <label htmlFor="male">Male</label>
            </div>
            <div
              className="form-check form-check-inline"
              onChange={this.handleChange}
            >
              <input type="radio" id="female" value="female" name="gender" />
              <label htmlFor="female">Female</label>
            </div>
          </div>
          {errorGender}

          <div className="form-group">
            <select
              name="country"
              value={this.state.country.value}
              onChange={this.handleChange}
            >
              <option value="switzerland">Switzerland</option>
              <option value="germany">Germany</option>
              <option value="austria">Austria</option>
            </select>
          </div>

          <div className="btn-group">
            <Button
              className="btn btn-primary"
              variant="primary"
              onClick={this.handleSubmit}
            >
              Register{" "}
            </Button>
            <div class="divider" />

            <Link to="login" className="btn btn-default">
              Login
            </Link>
          </div>
        </form>
        {errorResponse}
      </div>
    );
  }
}
export default withRouter(Register);
