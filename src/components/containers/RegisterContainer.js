import Register from '../ui/Register';
import {connect} from 'react-redux';
import {registerUser} from '../../actions';
import {reduxForm} from 'redux-form';

const registerContainer = reduxForm({
  form: 'register',
  validate,
})(Register);

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
  };
}

/*
  this function ensures that any props passed into the container
  (i.e. <RegisterContainer spam={eggs}) will override anything mapped out
  in mapStateToProps or mapDispatchToProps. This lets us pass spys into the
  container that are then passed into the component
*/


const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, stateProps, dispatchProps, ownProps);
};


export default connect(
                mapStateToProps, {registerUser}, mergeProps
              )(registerContainer);
