import React, {Component} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import ContactsService from '../../api/todo/ContactsService'
// import moment from 'moment'
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'

class ContactComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id : this.props.match.params.id,
            firstName : '',
            lastName : '',
            email: '',
            phone: '',
            streetAddress: '',
            city: '',
            stateList: [
                {label: 'AL-Alabama', value: 'AL'},
                {label: 'AK-Alaska',value: 'AK'},
                {label: 'AZ-Arizona',value: 'AZ'},
                {label: 'AR - Arkansas',value: 'AR'},
                {label: 'CA-California',value: 'CA'},
                {label: 'CO-Colorado',value: 'CO'},
                {label: 'CT-Connecticut',value: 'CT'},
                {label: 'DE-Delaware',value: 'DE'},
                {label: 'DC-District Of Columbia',value: 'DC'},
                {label: 'FL-Florida',value: 'FL'},
                {label: 'GA-Georgia', value: 'GA'},
                {label: 'GU-Guam',value: 'GU'},
                {label: 'HI-Hawaii',value: 'HI'},
                {label: 'ID-Idaho',value: 'ID'},
                {label: 'IL-Illinois',value: 'IL'},
                {label: 'IN-Indiana',value: 'IN'},
                {label: 'IA-Iowa',value: 'IA'},
                {label: 'KS-Kansas',value: 'KS'},
                {label: 'KY-Kentucky',value: 'KY'},
                {label: 'LA-Louisiana',value: 'LA'},
                {label: 'ME-Maine',value: 'ME'},
                {label: 'MD-Maryland',value: 'MD'},
                {label: 'MA-Massachusetts',value: 'MA'},
                {label: 'MI-Michigan',value: 'MI'},
                {label: 'MN-Minnesota',value: 'MN'},
                {label: 'MS-Mississippi',value: 'MS'},
                {label: 'MO-Missouri',value: 'MO'},
                {label: 'MT-Montana',value: 'MT'},
                {label: 'NE-Nebraska',value: 'NE'},
                {label: 'NV-Nevada',value: 'NV'},
                {label: 'NH-New Hampshire',value: 'NH'},
                {label: 'NJ-New Jersey',value: 'NJ'},
                {label: 'NM-New Mexico',value: 'NM'},
                {label: 'NY-New York',value: 'NY'},
                {label: 'NC-North Carolina',value: 'NC'},
                {label: 'ND-North Dakota',value: 'ND'},
                {label: 'OH-Ohio',value: 'OH'},
                {label: 'OK-Oklahoma',value: 'OK'},
                {label: 'OR-Oregon',value: 'OR'},
                {label: 'PA-Pennsylvania',value: 'PA'},
                {label: 'PR-Puerto Rico',value: 'PR'},
                {label: 'RI-Rhode Island',value: 'RI'},
                {label: 'SC-South Carolina',value: 'SC'},
                {label: 'SD-South Dakota',value: 'SD'},
                {label: 'TN-Tennessee',value: 'TN'},
                {label: 'TX-Texas',value: 'TX'},
                {label: 'UT-Utah',value: 'UT'},
                {label: 'VT-Vermont',value: 'VT'},
                {label: 'VI-Virgin Islands',value: 'VI'},
                {label: 'VA-Virginia',value: 'VA'},
                {label: 'WA-Washington',value: 'WA'},
                {label: 'WV-West Virginia',value: 'WV'},
                {label: 'WI-Wisconsin',value: 'WI'},
                {label: 'WY-Wyoming',value: 'WY'}
                ],
            defaultOption: '',
            state: '',
            zip: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.retrieveContact = this.retrieveContact.bind(this)
        this.onSelect = this.onSelect.bind(this)
    }

    onSelect(option) {
        console.log('selected state is: ', option)
        this.setState({state: option.value})
        this.setState({defaultOption: option})
    }

    componentDidMount() {
        this.setState({
            defaultOption: this.state.stateList[0],
            state: this.state.defaultOption.value
        })
        // this.state.defaultOption = this.state.stateList[0];
        // this.state.state = this.state.defaultOption.value;
        this.retrieveContact(this.props.match.params.id);
    }

    retrieveContact(id) {
        if (id > 0)
        ContactsService.executeGetContactService(id)
        .then(
            response => {
                console.log("retrieveContact :- " + response.data.customerState)
                this.setState({
                    id : response.data.customerId,
                    firstName : response.data.customerFirstName,
                    lastName : response.data.customerLastName,
                    email : response.data.customerEmail,
                    phone : response.data.customerPhone,
                    streetAddress: response.data.customerStreetAddress,
                    city: response.data.customerCity,
                    state: response.data.customerState,
                    zip: response.data.customerZip
                })
                if (this.state.state) { 
                    this.state.stateList.forEach((aState, index) => {
                        if (aState.value === this.state.state) {
                            return (this.setState({defaultOption: this.state.stateList[index]}))
                        }
                    })
                } 
                else { this.setState({defaultOption: this.state.stateList[0]}) }
                    }
        )
        .catch(
            response => {
                console.error("in catch() of retrieveContact() ", response.data)
            }
        )
    }

    onSubmit(values) {
        console.log("on submit()-", values)
        ContactsService.executeUpdateContactService(
            values.id, 
            {
                customerId: values.id,
                customerFirstName: values.firstName,
                customerLastName: values.lastName,
                customerEmail: values.email,
                customerPhone: values.phone,
                customerStreetAddress: values.streetAddress,
                customerCity: values.city,
                customerState: this.state.state,
                customerZip: values.zip
            }
        )
        .then(
            response => {
                this.props.history.push(`/contacts`)
            }
        )
        .catch(
            response => {
                console.log("in catch() of onSubmit()", response.data)
            }
        )
    }

    validate(values) {
        let errors = {}
        if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.phone) {
            errors.phone = 'Required';
          } else if (!/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(values.phone)) {
            errors.phone = 'Invalid phone number';
          }
          return errors
    }

    render() {
        // console.log("in render, the state is: ", this.state.state)
        // console.log("default state is: ", this.state.defaultOption)
        return(
            <div>
                <h1>Contact</h1>
                <div className="container">
                {
                    this.state.id > 0 &&
                    <label>Id: {this.state.id}</label>
                }

                <Formik
                        initialValues={{
                            id: this.state.id,
                            firstName: this.state.firstName,
                            lastName: this.state.lastName,
                            email: this.state.email,
                            phone: this.state.phone,
                            streetAddress: this.state.streetAddress,
                            city: this.state.city,
                            state: this.state.state,
                            zip: this.state.zip
                        }}
                        enableReinitialize={true}
                        onSubmit={this.onSubmit}
                        // validateOnChange={false}
                        // validateOnBlur={false}
                        validate={this.validate}
                    >
                        {
                            (props) => (
                                <Form>
                                    <fieldset className="form-group">
                                        <label>First Name</label> 
                                        <Field className="form-control" type="text" name="firstName"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Last Name</label> 
                                        <Field className="form-control" type="text" name="lastName"/>
                                    </fieldset>
                                    <ErrorMessage name="email" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Email</label> 
                                        <Field className="form-control" type="email" name="email"/>
                                    </fieldset>
                                    <ErrorMessage name="phone" component="div" className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Phone</label> 
                                        <Field className="form-control" type="text" name="phone"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Street Address</label> 
                                        <Field className="form-control" type="text" name="streetAddress"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>City</label> 
                                        <Field className="form-control" type="text" name="city"/>
                                    </fieldset>
                                    {/* {console.log(this.statesList)} */}
                                    <fieldset className="form-group">
                                        <label>State</label> 
                                        <Dropdown options={this.state.stateList} value={this.state.defaultOption} onChange={this.onSelect} placeholder={this.state.defaultOption.label} />
                                        {/* <Field name="state" className="form-control" as="select" placeholder="State">
                                            {this.statesList}
                                        </Field> */}
                                        {/* <Field className="form-control" type="text" name="state"/> */}
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Zipcode</label> 
                                        <Field className="form-control" type="text" name="zip"/>
                                    </fieldset>
                                    <button type="submit" className="btn btn-success">Save</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default ContactComponent