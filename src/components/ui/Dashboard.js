import React, {Component} from 'react';

class Dashboard extends Component {

  constructor(props) {
    // console.log("constructor for Dashboard UI");
    super(props);
    console.log(this.props);
    this.props.protectedTest();
  }

  renderContent() {
    if (this.props.content) {
      return (
        <p>{this.props.content}</p>
      );
    }
  }

  render() {
    return (
      <div>
        Hello from Dashboard!
        {this.renderContent()}
      </div>
    );
  }
}

export default Dashboard;
