import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import HelloWorldService from '../../api/todo/HelloWorld.js'

class WelcomeComponent extends Component {

    constructor(props) {
        super(props);
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.state = {
            retrievedMessage: []
        }
    }

    render() {
        return (
            <div>
                <div>
                Welcome {this.props.match.params.name}.
                you can manage the contacts <Link to="/contacts">here</Link>
                </div>
                <div className="container">
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
                <div className="container">
                    {this.state.retrievedMessage}
                </div>
            </div>
        )
    }

    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldService()
        .then(response => this.handleSuccessfulResponse(response))
        // .catch()
    }

    handleSuccessfulResponse(response) {
        console.log(response.data)
        this.setState({retrievedMessage: response.data})
    }
}

export default WelcomeComponent