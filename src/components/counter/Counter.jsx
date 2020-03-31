import React, { Component } from 'react';
import CounterButton from './CounterButton';
import './Counter.css'

class Counter extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    }
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
   }

   increment(by) {
    // console.log(`increment from parent - ${by}`)
    //this.state.counter++; //bad practice
    this.setState({
      counter: this.state.counter + by
    });
  }

  decrement(by) {
    this.setState(
      {counter: this.state.counter - by}
    );
  }

  reset() {
    this.setState({
      counter: 0
    });
  }
  render() {
    return (
      <div className="Counter">
        <CounterButton by={1} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={5} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <CounterButton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}></CounterButton>
        <span className="count">{this.state.counter}</span>
        <div>
          <button className="reset" onClick={this.reset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default Counter