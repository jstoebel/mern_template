import Login from '../ui/Login';
import {connect} from 'react-redux';
import {loginUser} from '../../actions';

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, {loginUser})(Login);
