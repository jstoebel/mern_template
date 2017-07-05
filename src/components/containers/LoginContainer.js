import Login from '../ui/Login';
import {connect} from 'react-redux';
import {loginUser, clearErrors} from '../../actions';
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

export default connect(
                  mapStateToProps, {loginUser, clearErrors}
                )(loginContainer);
