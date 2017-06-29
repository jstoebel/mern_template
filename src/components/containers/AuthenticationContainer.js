import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router';

import {loginRequest} from '../../actions';
console.log("auth container");

export default function(ComposedComponent) {
  class Authentication extends Component {

    render() {
      if (!this.props.authenticated) {
        // push an error message to auth.message
        loginRequest();
        return <Redirect to='/login'/>;
      } else {
        return <ComposedComponent {...this.props} />;
      }
    }
  }

  function mapStateToProps(state) {
    return {authenticated: state.auth.authenticated};
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      addLoginRequest() {
        dispatch(
          loginRequest()
        )
      }
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Authentication);
}
