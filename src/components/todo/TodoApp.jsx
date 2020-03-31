import React, {Component} from 'react'
import './TodoApp.css'
import '../../bootstrap.css'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import LoginComponent from "./LoginComponent";
import WelcomeComponent from './WelcomeComponent'
import ListTodosComponent from './ListTodosComponent'
import ContactComponent from './ContactComponent'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <div>
                        <HeaderComponent/>
                        <Switch>
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/welcome/:name" component={WelcomeComponent}/>
                            <Route path="/contacts/:id" component={ContactComponent}/>
                            <Route path="/contacts" component={ListTodosComponent}/>
                        </Switch>
                        <FooterComponent/>
                    </div>
                </Router>
                {/* <LoginComponent></LoginComponent> */}
            </div>
        )
    }
}

class HeaderComponent extends Component{
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="http://ahambho.ga" className="navbar-brand">aham bhoga</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/welcome">Home</Link></li>
                        <li><Link className="nav-link" to="/contacts">Contacts</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li><Link  className="nav-link" to="/login">Login</Link></li>
                        <li><Link  className="nav-link" to="/login">Logout</Link></li>
                    </ul>
                </nav>
            </header>
        )
    }
}

class FooterComponent extends Component{
    render() {
        return (
            <footer className="footer">
                <span className="text-muted">All Rights Reserved 2019 @sbusa.org</span>
            </footer>
        )
    }
}

export default TodoApp