import React, { Component } from 'react';

class CounterButton extends Component {
  
    render() {
      return (
        <div className="CounterButton">
          <button onClick={() => this.props.incrementMethod(this.props.by)}>+{this.props.by}</button>
          <button onClick={() => this.props.decrementMethod(this.props.by)}>-{this.props.by}</button>
        </div>
      );
    }
  
    // increment() {
    //   //console.log('increment')
    //   //this.state.counter++; //bad practice
    // //   this.setState({
    //     // counter: this.state.counter + this.props.by
    // //   });
  
    //   this.props.incrementMethod(this.props.by);
    // }

    // decrement() {
    //   this.props.decrementMethod(this.props.by);
    // }
  }
    
export default CounterButton