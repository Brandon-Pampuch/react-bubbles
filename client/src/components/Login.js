import React from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

class Login extends React.Component {
  state = {
    credentials: {
      username: "",
      password: ""
    }
  };

  handleChange = e => {
    this.setState({
      credentials: {
        ...this.state.credentials,
        [e.target.name]: e.target.value
      }
    });
  };

  login = e => {
    e.preventDefault();
    // axiosWithAuth ==> ?? an axios instance; .post() ==> ?? promise
    axiosWithAuth()
      .post("/login", this.state.credentials)
      .then(res => {
        console.log('clicked', res)
        localStorage.setItem("token", res.data.payload);
        // redirect to the apps main page?
        this.props.history.push("/bubblespage");
      })
      .catch(err => console.log(err));
  };
  logout = () => {
    localStorage.clear()
    this.props.history.push("/login");

  }

  render() {
    return (
      <div>

        <form onSubmit={this.login}>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={this.state.credentials.username}
            onChange={this.handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={this.state.credentials.password}
            onChange={this.handleChange}
          />
          <button>Log in</button>
          <button onClick={this.logout}>Log out</button>
        </form>
        <p>username and password are 'a'</p>
      </div>
    );
  }
}

export default Login;
