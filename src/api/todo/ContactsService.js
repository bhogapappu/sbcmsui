import axios from 'axios'

class ContactsService {
    getContacts() {
        return fetch('https://sbcms.herokuapp.com/customers')
    }
    executeGetContactsService() {
        return axios.get('https://sbcms.herokuapp.com/customers');
    }

    getContact(id) {
        return fetch(`https://sbcms.herokuapp.com/customers/${id}`)
    }
    executeGetContactService(id) {
        return axios.get(`https://sbcms.herokuapp.com/customers/${id}`)
    }

    updateContact(id, contact) {
        console.log(contact)
        return fetch(`https://sbcms.herokuapp.com/customers/${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(contact)
        })
    }
    executeUpdateContactService(id, contact) {
        return axios.put(`https://sbcms.herokuapp.com/customers/${id}`, contact)
    }

    createContact(contact) {
        return axios.post('https://sbcms.herokuapp.com/customers', contact);
    }
}

export default new ContactsService()