import {connect} from 'react-redux';
import * as actions from '../../actions';
import Dashboard from '../ui/Dashboard';

const mapStateToProps = (state) => {
  return ({
    content: state.auth.content,
  });
};


export default connect(mapStateToProps, actions)(Dashboard);
