import React from 'react';

class Background extends React.Component {

  componentWillMount() {
    this.getUser();
  }

  getUser() {
    fetch('https://randomuser.me/api/')
    .then(response => {
      if(response.ok) return response.json();
      throw new Error('Request failed.');
    })
    .then(data => {
      this.setState({name: data.results[0].name);
    })
    .catch(error => {
      console.log(error);
    });
  }
export default Background;