import React, { Component } from 'react';

class LoginComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: 'bpappu',
            password: '',
            loginError: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
        // this.handleUsernameChange = this.handleUsernameChange.bind(this);
        // this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleChange(event) {
        this.setState(
            {[event.target.name]:event.target.value}
        )
    }

    loginClicked(event) {
        if (this.state.username==='bpappu' && this.state.password==='bpappu') {
            this.setState({loginError:''})
            // this.props.history.push(`/todos`)
            this.props.history.push(`/welcome/${this.state.username}`)
        } else {
            this.setState({loginError:'Invalid credentials!!!'})
        }
    }
    render() {
        return (
            <div className="container">
                <span className="loginError">{this.state.loginError}</span><br/>
                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/><br/>
                Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/><br/>
                <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
            </div>
        )
    }

    // handleUsernameChange(event) {
    //     console.log(event.target.value);
    //     this.setState({username: event.target.value});
    // }

    // handlePasswordChange(event) {
    //     console.log(event.target.value);
    //     this.setState({password:event.target.value});
    // }
}

export default LoginComponent