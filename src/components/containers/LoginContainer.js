import Login from '../ui/Login';
import {connect} from 'react-redux';
import {clearErrors, loginUser} from '../../actions';
import {reduxForm} from 'redux-form';

const loginContainer = reduxForm({
  form: 'login',
})(Login);

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
  };
}

/*
  this function ensures that any props passed into the container
  (i.e. <LoginContainer spam={eggs}) will override anything mapped out
  in mapStateToProps or mapDispatchToProps. This lets us pass spys into the
  container that are then passed into the component
*/

const mergeProps = (stateProps, dispatchProps, ownProps) =>
	Object.assign({}, stateProps, dispatchProps, ownProps);

export default connect(
                  mapStateToProps, {loginUser, clearErrors}, mergeProps
                )(loginContainer);
