import React from 'react';
import NavLink from './NavLink';
import NavigationContainer from '../containers/NavigationContainer';

export default React.createClass({
  render() {
    return (
      <div>
        <h1>MERN template</h1>
        <NavigationContainer />
        <span> Router content borrowed from
          <a href="https://github.com/reactjs/react-router-tutorial">
            https://github.com/reactjs/react-router-tutorial
          </a>
        </span>
        <ul role="nav">
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/repos">Repos</NavLink></li>
        </ul>
        {this.props.children}
      </div>
    );
  },
});
