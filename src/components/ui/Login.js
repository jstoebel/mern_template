import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';


const form = reduxForm({
  form: 'login',
});

class Login extends Component {
  handleFormSubmit(formProps) {
    console.log("submitting login form");
    this.props.loginUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      console.log(`rendering with message: ${this.props.errorMessage}`);
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      );
    }
  }

  render() {
    console.log("rendering Login");
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

export default form(Login);
