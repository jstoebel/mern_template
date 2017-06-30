import Register from '../ui/Register';
import {connect} from 'react-redux';
import {registerUser} from '../../actions';


function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
  };
}

export default connect(mapStateToProps, {registerUser})(Register);
