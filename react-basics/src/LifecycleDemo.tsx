import React, { Component } from "react";

interface State {
  count: number;
}

class LifecycleDemo extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      count: 0,
    };

    console.log("Constructor");
  }

  componentDidMount() {
    console.log("Mounted");
  }

  componentDidUpdate() {
    console.log("Updated");
  }

  componentWillUnmount() {
    console.log("Unmounted");
  }

  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    console.log("Render");

    return (
      <div className="p-4 border">
        <h1>Lifecycle</h1>
        <p>Count: {this.state.count}</p>

        <button onClick={this.increment}>
          Increment
        </button>
      </div>
    );
  }
}

export default LifecycleDemo;
