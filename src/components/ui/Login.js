import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// ----------------------------------------------------
const loginMessageStyle = {
  color: 'red',
};

// ----------------------------------------------------
const Login = React.createClass({

  getInitialState: function() {
    return {
      loginMessage: '',
    };
  },

  _onLoginSubmit: function(event) {
    event.preventDefault();
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;

    // Passed in via react-redux. Returns a promise.
    this.props.manualLogin({ // this function is passed in via react-redux
      email,
      password,
    }, this.props.nextPathname) // holds the path to redirect to after login (if any)
    .then((loginMessage) => {
      if (loginMessage) {
        // report to the user is there was a problem during login
        this.setState({
          loginMessage,
        });
      }
    });
  },

  render: function() {
    return (
      <div>
        <h2>Log in</h2>
        <form onSubmit={this._onLoginSubmit}>
          <input type="email" ref="email" placeholder="Email"/><br/>
          <input ref="password" type="password" placeholder="Password" /><br/>
          <input type="submit" value="Login" /> <span style={loginMessageStyle}>{ this.state.loginMessage }</span>
        </form>
      </div>
    );
  },
});

export default Login;
