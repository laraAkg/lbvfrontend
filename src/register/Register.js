import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import validator from "validator";
import "./register.css";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.formDefaults = {
      email: { value: "", isValid: true, message: "Invalid Email" },
      password: { value: "", isValid: true, message: "Password too short" },
      confPassword: { value: "", isValid: true, message: "Invalid password" },
      option: { value: "", isValid: true, message: "Invalid option" }
    };

    this.state = {
        errors: {email: true, password: true},

      ...this.formDefaults
    };
  }

  checkEmail = value => {
    return validator.isEmail(value);
  };

  checkPassword = value => {
    return value.length >= 6;
  };

  handleChange = e => {

    this.setState({
      [e.target.name]: { ...this.state[e.target.name], value: e.target.value }
    });
  };

  handleSubmit = e => {
    const isEmailValid = this.checkEmail(this.state.email.value);
    const isPasswordValid = this.checkPassword(this.state.password.value);
    this.setState({
      errors: {
        email: isEmailValid,
        password: isPasswordValid
      }
    });

    if(this.state.errors.email && this.state.errors.password) {
      fetch("http://localhost:8080/ok", {
        headers: {
          "Accept": "text/plain",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ val: this.state.password.value })
      })
        .then(function(res) {
          res.json().then(value => console.log(value));
        })
        .catch(function(res) {
          console.log(res);
        });
    }
    console.log(this.state);

  };

  render() {
  let errorEmail;
  if(!this.state.errors.email) {
   errorEmail =    <span class="error">{this.state.email.message}</span>;
  }

  let errorPassword;
  if(!this.state.errors.password) {
   errorPassword =    <span class="error">{this.state.password.message}</span>;
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
              className="form-control"
              className="FormField__Input"
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
              className="form-control"
              className="FormField__Input"
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
          </div>

          <div className="form-group">
            <Form.Group>
              <Form.Check
                name="formHorizontalRadios"
                type="radio"
                label="Male"
              />
              <Form.Check
                name="formHorizontalRadios"
                type="radio"
                label="Female"
              />
            </Form.Group>
          </div>

          <Form.Group as={Col} controlId="formDropdown">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              value={this.state.option.value}
              onChange={this.handleChange}
              name="option"
            >
              <option>Switzerland</option>
              <option>Germany</option>
              <option>France</option>
            </Form.Control>
          </Form.Group>

          <div className="container">
            <div className="row">
              <div className="col" id="buttonLayoutLeft">
                <Button variant="primary" onClick={this.handleSubmit}>
                  Register{" "}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
export default Register;
