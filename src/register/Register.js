import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import validator from "validator";
import "./register.css";
import { Link,withRouter } from 'react-router-dom';
import authentication from '../helper/authentication'

/**
 * Author: Lara Akgün
 * Datum: 05.11.2019
 * Diese JS Klasse handlet das Registrieren
 */
class Register extends React.Component {
  constructor(props) {
    super(props);

    this.formDefaults = {
      email: { value: "", message: "Invalid Email" },
      password: { value: "", message: "Password too short" },
      confPassword: { value: "", message: "Password not same" },
      age: { value: "", message: "Age is empty" },
      sex: { value: "", message: "Please select your sex" },
      country: { value: "switzerland", message: "Invalid option" }
    };

    this.state = {
      errors: {
        email: true,
        password: true,
        age: true,
        confPassword: true,
        sex: true,
      },
       responseError: '',

      ...this.formDefaults
    };
  }

//Checkt ab ob die eingegebene Email valid ist
  checkEmail = value => {
    return validator.isEmail(value);
  };

//Checkt ab ob das Passwort 10 Zeichen lang ist
  checkPassword = value => {
    return value.length >= 10;
  };

//Checkt ab ob die eingegebenen Passwörter gleich sind
  checkConfirmPassword = value => {
    return value === this.state.password.value && value.length >= 6;
  };

//Checkt ab ob der User etwas ausgewählt hat
  checkIfSexNull = value => {
    return value
  };

//Checkt ab ob der User etwas eingegeben hat
  checkIfAgeIsNull = value => {
    return !value == "";
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: { ...this.state[e.target.name], value: e.target.value }
    });
  };

//Wird beim anklicken ausgeführt
  handleSubmit = e => {
    const isEmailValid = this.checkEmail(this.state.email.value);
    const isPasswordValid = this.checkPassword(this.state.password.value);
    const isAgeValid = this.checkIfAgeIsNull(this.state.age.value);
    const isConfPasswordValid = this.checkConfirmPassword(this.state.confPassword.value);
    const isSexSelected = this.checkIfSexNull(this.state.sex.value);
    const isError = !isEmailValid || !isPasswordValid || !isAgeValid || !isConfPasswordValid || !isSexSelected;
    this.setState({
      errors: {
        email: isEmailValid,
        password: isPasswordValid,
        confPassword: isConfPasswordValid,
        age: isAgeValid,
        sex: isSexSelected
      }
    });

    if (!isError) {
      let that = this;
      fetch("http://localhost:8080/register", {
        headers: {
          Accept: "text/plain",
          "Content-Type": "application/json"
        },
        method: "POST",
        body:
        JSON.stringify({
              username: this.state.email.value,
              password: this.state.password.value,
              age: this.state.age.value,
              gender: this.state.sex.value,
              state: this.state.country.value
        })
      })
        .then(function(res) {
          res.text().then(value => {
          if(value == 1){
            authentication.login();
            that.props.history.push('/blog')
          }else{
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
  //Zeigt Error-Meldung an
    let errorEmail;
    if (!this.state.errors.email) {
      errorEmail = <span className="error">{this.state.email.message}</span>;
    }

//Zeigt Error-Meldung an
    let errorPassword;
    if (!this.state.errors.password) {
      errorPassword = (
        <span className="error">{this.state.password.message}</span>
      );
    }

//Zeigt Error-Meldung an
    let errorConfPassword;
    if (!this.state.errors.confPassword) {
      errorConfPassword = (
        <span className="error">{this.state.confPassword.message}</span>
      );
    }

//Zeigt Error-Meldung an
    let errorAge;
    if (!this.state.errors.age) {
      errorAge = <span className="error">{this.state.age.message}</span>;
    }

//Zeigt Error-Meldung an
    let errorSex;
    if (!this.state.errors.sex) {
      errorSex = <span className="error">{this.state.sex.message}</span>;
    }
//Zeigt Error-Meldung an
    let errorResponse;
    if (this.state.responseError) {
      errorResponse = <span className="error">{this.state.responseError}</span>;
      console.log(this.state.responseError)
    }



    return (
      <div id="register">
        <div id="textInCenter">
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
              className="form-control"
              className="FormField__Input"
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
              className="form-control"
              className="FormField__Input"
              placeholder="Age"
              name="age"
              value={this.state.age.value}
              onChange={this.handleChange}
            />
            {errorAge}
          </div>

          <div>
            <div className="form-check form-check-inline" onChange={this.handleChange}>
              <input type="radio" id="male" value="male" name="sex"/>
              <label htmlFor="male">Male</label>
            </div>
            <div className="form-check form-check-inline" onChange={this.handleChange}>
                          <input type="radio" id="female" value="female" name="sex" />
                          <label htmlFor="female">Female</label>
            </div>
            {errorSex}
          </div>

          <select
            name="country"
            value={this.state.country.value}
            onChange={this.handleChange}
          >
            <option value="switzerland">Switzerland</option>
            <option value="germany">Germany</option>
            <option value="austria">Austria</option>
          </select>

          <div className="container">
            <div className="row">
              <div className="col" id="buttonLayoutLeft">
                <Button variant="primary" onClick={this.handleSubmit}>
                  Register{" "}
                </Button>
              </div>
            </div>
            <div className="col" id="buttonLayoutRight">
            <Link to='login'>Login</Link><br/>
            </div>
          </div>
        </form>
                    {errorResponse}

      </div>
    );
  }
}
export default withRouter(Register);
