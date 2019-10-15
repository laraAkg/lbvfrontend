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
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      confPassword: "",
      sex: "",
      option: ""
    };
  }

 onRadiochange = e => {
    console.log(e);
  };

handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit= e => {
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
        >
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
              value={this.state.email}
              onChange={this.handleChange}
            />
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
              value={this.state.password}
              onChange={this.handleChange}
            />
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
              value={this.state.confPassword}
              onChange={this.handleChange}
            />
          </div>

          <div className="form-group">
            <RadioGroup
                         name="sex"
                         value={this.state.male}
                         options={[
                           { label: "Male", value: "male" },
                           { label: "Female", value: "female" }
                         ]}
                         onChange={this.handleChange}
                       />
          </div>


          <Form.Group as={Col} controlId="formDropdown">
            <Form.Label>State</Form.Label>
            <Form.Control as="select"
            value={this.state.option}
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
