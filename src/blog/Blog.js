import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "../helper/GeneralStyle.css";
import "./Blog.css";

/**
 * Blog page with React informations and image
 * @author Lara Akgün
 * @author Enma Ronquillo
 * @version 08.11.2019
 */
class Blog extends React.Component {
  //get triggered if user clicks on logout
  logout = e => {
    localStorage.clear();
    window.location.href = "/login";
  };

  render() {
    return (
      <div>
        <div id="buttonTopRight">
          <Button variant="primary" onClick={this.logout}>
            Logout{" "}
          </Button>
        </div>
        <div class="backgroundSquare">
          <div class="textInCenter">
            <img src={require("../logo.svg")} alt="React Logo" />
          </div>
          <p>
            React (also known as React.js or ReactJS) is a JavaScript library
            for building user interfaces. It is maintained by Facebook and a
            community of individual developers and companies.
          </p>

          <p>
            React can be used as a base in the development of single-page or
            mobile applications, as it is optimal for fetching rapidly changing
            data that needs to be recorded. However, fetching data is only the
            beginning of what happens on a web page, which is why complex React
            applications usually require the use of additional libraries for
            state management, routing, and interaction with an API: Redux, React
            Router and axios are examples of such libraries.
          </p>
        </div>
      </div>
    );
  }
}

export default Blog;
