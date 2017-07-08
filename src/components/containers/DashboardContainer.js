import {connect} from 'react-redux';
import * as actions from '../../actions';
import Dashboard from '../ui/Dashboard';

const mapStateToProps = (state) => {
  return ({
    content: state.auth.content,
  });
};

/* 
  this function ensures that any props passed into the container
  (i.e. <LoginContainer spam={eggs}) will override anything mapped out
  in mapStateToProps or mapDispatchToProps. This lets us pass spys into the
  container that are then passed into the component
*/

const mergeProps = (stateProps, dispatchProps, ownProps) =>
	Object.assign({}, stateProps, dispatchProps, ownProps)


export default connect(mapStateToProps, actions, mergeProps)(Dashboard);
