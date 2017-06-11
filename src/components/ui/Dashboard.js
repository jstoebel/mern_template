import React, {Component} from 'react';

class Dashboard extends Component {

  constructor(props) {
    super(props);
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
        {this.renderContent()}
      </div>
    );
  }
}

export default Dashboard;
