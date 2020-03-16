import axios from "axios";


export default {
    //Gets all Campaign names
    login: function (data) {
        return axios.post('/api/auth', data);
    },
    createAccount: function (data) {
        return axios.post('/api/auth/create', data);
    },
    getUser: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/user/getUser', data, {headers: {
            'x-access-token': token
        }})
    },
    updateUser: function(data){
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/user/updateUser', data, {headers: {
            'x-access-token':token
        }})
    },
    updateUserEmail: function(data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profilemanagement/updateUserEmail', data, {headers: {
                'x-access-token': token
            }});
    },
    getShippingAddressesByUser: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profilemanagement/getShippingAddressesByUser', data, {headers: {
            'x-access-token': token
        }});
    },
    addShippingAddress: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profilemanagement/addShippingAddress', data, {headers: {
                'x-access-token': token
            }});
    },
    deleteShippingAddress: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profilemanagement/deleteShippingAddress', data, {headers: {
                'x-access-token': token
            }});
    },
    updateShippingAddress: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profilemanagement/updateShippingAddress', data, {headers: {
                'x-access-token': token
            }});
    },
    removeCreditCard: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profilemanagement/removeCreditCard', data, {headers: {
                'x-access-token': token
            }});
    },
    addCreditCard: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profilemanagement/addCreditCard', data, {headers: {
                'x-access-token': token
            }});
    },
    getCreditCardsByUser: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profilemanagement/getCreditCardsByUser', data, {headers: {
                'x-access-token': token
            }});
    },
    updateCreditCard: function (data) {
        let token = localStorage.getItem("auth_token");
        return axios.post('/api/profilemanagement/updateCreditCard', data, {headers: {
                'x-access-token': token
            }});
    },
    getAllBooks: function(data){
        return axios.post('/api/search/getAllBooks', data)
    },
    add: function(data) {
        return axios.post('/api/ShoppingCart/add', data);
    },
    delete: function(data) {
        return axios.post('/api/ShoppingCart/delete', data);
    },
    displayAll: function(data) {
        return axios.post('/api/ShoppingCart/displayAll', data);
    },
    componentDidMount: function(data) {
        console.log("I reached componentDidMount");
        return axios.get('/api/ShoppingCart', data);
    },
};