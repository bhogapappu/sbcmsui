import axios from 'axios'

class HelloWorldService {
    executeHelloWorldService() {
        return axios.get('http://localhost:8085/customers');
    }
}

export default new HelloWorldService()