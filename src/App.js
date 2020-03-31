import React, { Component } from 'react';
// import FirstComponent from './components/learning-examples/FirstComponent';
// import SecondComponent from './components/learning-examples/SecondComponent';
// import Counter from './components/counter/Counter';
// import logo from './logo.svg';
import './App.css';
import './bootstrap.css'
import TodoApp from './components/todo/TodoApp';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <Counter></Counter> */}
        <TodoApp></TodoApp>
      </div>
    );
  }
}

export default App;

// class LearningComponents extends Component {
//   render() {
//     return (
//       <div className="LearningComponents">
//         My Hello World!
//         <FirstComponent></FirstComponent>
//         <SecondComponent></SecondComponent>
//       </div>
//     );
//   }
// }
