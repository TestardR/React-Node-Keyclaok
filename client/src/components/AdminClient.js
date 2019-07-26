import React, { Component } from "react";
import axios from "axios";

export default class AdminClient extends Component {
  state = {
    message: ""
  };

  componentDidMount() {
    axios
      .get("http://localhost:5000/client")
      .then(res => this.setState({ message: res.data.message }))
      .catch(err => console.log(err));
  }

  render() {
    return <div>{this.state.message}</div>;
  }
}
