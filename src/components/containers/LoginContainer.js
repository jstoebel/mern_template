import {connect} from 'react-redux';
import * as userActions from '../../actions/users';
import Login from '../ui/Login';


// Function passed in to `connect` to subscribe to Redux store updates.
// Any time it updates, mapStateToProps is called.
// The second argument "ownProps" contains props passed to the component
const mapStateToProps = (state, ownProps) => {
  let nextPathname = '/';

  try {
nextPathname = ownProps.location.state.nextPathname;
} catch (err) {}

  return {
    user: state.user,
    nextPathname, // this prop passed in by React Router
  };
};

// Connects React component to the redux store
// It does not modify the component class passed to it
// Instead, it returns a new, connected component class, for you to use.
export default connect(
  mapStateToProps,
  userActions
)(Login);
