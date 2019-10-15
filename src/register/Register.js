import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { validateLogin } from "../helper/Validator";
import "./register.css";

class Register extends React.Component {
  constructor() {
    super();

    this.state = {
      email: "",
      password: "",
      confPassword: "",
      male: "",
      option: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 onRadiochange = value => {
    console.log(value);
  };

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    console.log("The form was submitted with the following data:");
    console.log(this.state);
    validateLogin("Hello");
  }

  render() {
    return (
      <div id="register">
        <div id="textInCenter">
          <h1>Register</h1>
        </div>

        <form
          onSubmit={this.handleSubmit}
          className="FormFields"
          onSubmit={this.handleSubmit}
        >
          <div className="form-grou">
            <label className="FormField__Label" htmlFor="email">
              E-Mail Address
            </label>
            <input
              type="email"
              className="form-control"
              className="FormField__Input"
              placeholder="Enter your email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-grou">
            <label className="FormField__Label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              className="FormField__Input"
              placeholder="Enter your password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-grou">
            <label className="FormField__Label" htmlFor="password">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              className="FormField__Input"
              placeholder="Confirm your password"
              name="confPassword"
              value={this.state.confPassword}
              onChange={this.handleChange}
            />
          </div>

          <Form.Group as={Col} controlId="formDropdown">
            <Form.Label>State</Form.Label>
            <Form.Control as="select">
              <option>Switzerland</option>
              <option>Germany</option>
              <option>France</option>
              value={this.state.option}
              onChange={this.handleChange}
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
