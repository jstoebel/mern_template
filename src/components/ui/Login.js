import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Alert} from 'react-bootstrap';

class Login extends Component {
  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <Alert bsStyle="danger" onDismiss={this.props.handleAlertDismiss}>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </Alert>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {this.renderAlert()}
          <div>
            <label>Email</label>
            <Field
              name="email"
              className="form-control"
              component="input"
              type="text"
            />
          </div>
          <div>
            <label>Password</label>
            <Field
              name="password"
              className="form-control"
              component="input"
              type="password"
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
