import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import validator from 'validator';
import "./Login.css";
import { Link } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.formDefaults = {
    email: {value:'', isValid: true, message: 'Invalid Email'},
    password: {value:'', isValid: true, message: 'Invalid password'},
    }

    this.state = {
    errors: { email: true },

    ...this.formDefaults
    };
  }

 checkEmail = value => {
    return validator.isEmail(value);
  };


handleChange = e => {

    this.setState({
      [e.target.name]:{...this.state[e.target.name],
      value:e.target.value}

    });
  }
 handleSubmit = e => {
    const isEmailValid = this.checkEmail(this.state.email.value);

    this.setState({
      errors: {
        email: isEmailValid
      }
    });

    if (this.state.errors.email ) {
      fetch("http://localhost:8080/ok", {
        headers: {
          Accept: "text/plain",
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
      if (!this.state.errors.email) {
        errorEmail = <span class="error">{this.state.email.message}</span>;
      }
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
          </div>

          <div className="container">
            <div className="row">
              <div className="col" id="buttonLayoutLeft">
                                         <Link to='register'>Register</Link><br/>

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
