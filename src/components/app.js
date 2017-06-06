import React, {Component} from 'react';
import {Link} from 'react-router';

class App extends Component {
    render(){
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#">Home</a>
                        </div>
                    </div>
                </nav>
                <div>
                    It works!
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default App
