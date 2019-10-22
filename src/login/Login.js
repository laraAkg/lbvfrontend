import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Register from "../register/Register";
import { Link } from "react-router-dom";
import  { Redirect } from 'react-router-dom'
import { validateLogin }  from "../helper/Validator"
import "./Login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.formDefaults = {
    email: {value:'', isValid: true, message: 'Invalid Email'},
    password: {value:'', isValid: true, message: 'Invalid password'},
    }

    this.state = {
    ...this.formDefaults
    };
  }

handleChange = e => {
    this.setState({
      [e.target.name]:{...this.state[e.target.name],
      value:e.target.value}

    });
  }
 handleSubmit= e => {

 const obj = {
    val: "try"
 }

fetch("http://localhost:8080/ok",
     {
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
         method: "POST",
         body: JSON.stringify(this.state.email.value),
         mode: 'no-cors'
     })
     .then(function(res){ console.log(res) })
          .catch(function(res){ console.log(res) })
         console.log(this.state);
     /*
      .then(response => {
        if(response.ok) return response.json();
        throw new Error('Request failed.');
      })
      .then(data => {
       // this.setState({value: this.state.email.value,);
      })
      .catch(error => {
        console.log(error);
      });
      */
      }

  render() {
    return (
      <div id="login">
        <div id="textInCenter">
          <h1>Login</h1>
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
              value={this.state.email.value}
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
              value={this.state.password.value}
              onChange={this.handleChange}
            />
          </div>

          <div className="container">
            <div className="row">
              <div className="col" id="buttonLayoutLeft">
                <Button variant="primary" onClick={this.redirectRegister}>
                  Register{" "}
                </Button>
              </div>
            </div>
            <div className="col" id="buttonLayoutRight">
             <Button variant="primary" onClick={this.handleSubmit}>
                              Login{" "}
                            </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
