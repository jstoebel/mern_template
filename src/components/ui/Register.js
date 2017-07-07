import React, {Component} from 'react';
import {Field} from 'redux-form';
import {Alert} from 'react-bootstrap';

const renderField = (field) => {
  if (field.meta.touched && field.meta.error) {
    const style = {
      color: 'red',
      fontWeight: 'bold',
    }
    return (
        <div>
          <input className="form-control" {...field.input}/>
          <div style={style} className="error">{field.meta.error}</div>
        </div>
    )
  } else {
    return (
      <div>
        <input className="form-control" {...field.input}/>
      </div>
    )
  }
}

class Register extends Component {
  
  constructor() {
    super()
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  
  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
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
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
      {this.renderAlert()}
      <div className="row">
        <div className="col-md-6">
          <label>First Name</label>
          <Field
            name="firstName"
            className="form-control"
            component={renderField}
            type="text"
          />
        </div>
        <div className="col-md-6">
          <label>Last Name</label>
          <Field
            name="lastName"
            className="form-control"
            component={renderField}
            type="text"
          />
        </div>
      </div>
        <div className="row">
          <div className="col-md-12">
            <label>Email</label>
            <Field
              name="email"
              className="form-control"
              component={renderField}
              type="text"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <label>Password</label>
            <Field
              name="password"
              className="form-control"
              component={renderField}
              type="password"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
    );
  }
}

export default Register;
