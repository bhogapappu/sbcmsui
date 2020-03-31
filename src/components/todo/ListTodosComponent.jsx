import React, { Component } from "react";
import ContactsService from "../../api/todo/ContactsService.js";

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            contacts :
              [
                //   {customerId: 1, customerFirstName:'Bhoga', customerLastName:'Pappu', customerEmail: 'bpappu@gmail.com', customerPhone:'9512850083'},
                //   {customerId: 2, customerFirstName:'Usha', customerLastName:'Pappu', customerEmail: 'ushapappu@gmail.com', customerPhone:'9514288777'},
                //   {customerId: 3, customerFirstName:'Kumar', customerLastName:'Valiveti', customerEmail: 'valivetikumar@gmail.com', customerPhone:'1234567890'},
              ]
        }
        this.retrieveContacts = this.retrieveContacts.bind(this);
        this.handleSuccessfulResponse = this.handleSuccessfulResponse.bind(this);
        this.updateContact = this.updateContact.bind(this)
    }

    componentDidMount() {
        this.retrieveContacts();
    }

    retrieveContacts() {
        ContactsService.executeGetContactsService()
        // ContactsService.getContacts()
        .then(
            response => {
                this.setState({contacts : response.data})
            }
        )
        // .catch()
    }

    handleSuccessfulResponse(response) {
        console.log(response.data)
        this.setState({contacts: response.data})
    }

    render() {
        return (
            <div>
                <h1>Samskrita Bharati Atlanta Contacts</h1>
                {/* <div class="container"> */}
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>FirstName</th>
                                <th>LastName</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.contacts.map (
                                    contact =>
                                    (<tr key={contact.customerId}>
                                        <td>{contact.customerId}</td>
                                        <td>{contact.customerFirstName}</td>
                                        <td>{contact.customerLastName}</td>
                                        <td>{contact.customerEmail}</td>
                                        <td>{contact.customerPhone}</td>
                                        <td><button type="button" name="update" className="btn btn-success" onClick={() => this.updateContact(contact)}>Update</button></td>
                                    </tr>)
                                )
                            }
                        </tbody>
                    </table>
                {/* </div> */}
                <button type="button" name="createButton" onClick={() => this.newContact()} className="btn btn-success">New Contact</button>
                {/* <button type="button" name="refresh" onClick={this.retrieveContacts} className="btn btn-success">Refresh</button> */}
            </div>
        )
    }

    updateContact(contact) {
        this.props.history.push(`/contacts/${contact.customerId}`)
    }

    newContact() {
        this.props.history.push('/contacts/0')
    }
}

class NewContact extends Component {
    constructor(props) {
        super(props);
        this.validator = new this.validator();
        this.onCancel = this.onCancel.bind(this);
        this.onsubmit = this.onsubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            streetAddress: '',
            city: '',
            State: '',
            zip: ''
        };
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    onCancel() {
        this.props.onCancel();
    }

    onSubmit() {
        if (this.validator.validateInputs(this.state)) {
            this.props.onSubmit(this.state);
        }
    }

    render() {
        return (
            <div className="input-panel">
                <span className="form-caption">New Contact:</span>
                <div>
                    <label className="field-name">First Name:
                        <input value={this.state.firstName} name="firstName" maxLength="40" required="true"/>
                    </label>
                </div>
                <br/>
                <button onClick={() => this.onCancel()}>Cancel</button>
                <button onClick={() => this.onSubmit()}>Create</button>
            </div>
        );
    }
}

class Validator {
    validateInputs(inputData) {
        let errorMsg = "";
        if (!inputData.firstName) {
            errorMsg += "Please enter First name of this contact.\n"
        }
        if (!inputData.lastName) {
            errorMsg += "Please enter Last name of this contact.\n"
        }
        if (!inputData.email) {
            errorMsg += "Please enter proper email address of this contact.\n"
        }
        if (!inputData.phone) {
            errorMsg += "Please enter Phone number of this contact.\n"
        }
        if (errorMsg.length === 0) {
            return true;
        } else {
            alert(errorMsg);
            return false;
        }
    }
}

export default ListTodosComponent