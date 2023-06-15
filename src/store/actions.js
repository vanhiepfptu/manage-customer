import axios from 'axios';

const url = 'https://6454c520f803f3457630c34c.mockapi.io';
export default {
    async login({ commit }, { username, password }) {
        try {
            const response = await axios.get(`${url}/users?username=${username}&password=${password}`);
            const users = response.data;

            if (users.length > 0) {
                const user = users[0];
                commit('SET_USER', user);
                localStorage.setItem('user', JSON.stringify(user));
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error(error);
            return false;
        }
    },

    async register({ commit }, userData) {
        try {
            if (!userData.name.isValid || !userData.age.isValid || !userData.username.isValid || !userData.password.isValid) {
                throw new Error('Please provide name and age.');
            }
            const response = await axios.post(`${url}/users`, {
                username: userData.username.value,
                password: userData.password.value,
                name: userData.name.value,
                age: userData.age.value
            });
            const newUser = response.data;
            commit('SET_USER', newUser);
            return true; // Đăng ký thành công
        } catch (error) {
            console.error(error);
            return false; // Đăng ký thất bại
        }
    },
    async addCustomer({ commit }, customer) {
        try {
            // const response = await axios.post(url, customer);
            const response = await axios.post(`${url}/customers`, customer);
            const newCustomer = {
                id: response.data.id,
                ...customer,
            };
            commit('ADD_CUSTOMER', newCustomer);
        } catch (error) {
            console.error(error);
        }
    },

    async deleteCustomer({ commit }, customerId) {
        try {
            await axios.delete(`${url}/customers/${customerId}`);
            commit('DELETE_CUSTOMER', customerId);
        } catch (error) {
            console.error(error);
        }
    },

    async updateCustomer({ commit }, customer) {
        try {
            const updatedCustomer = { ...customer };
            delete updatedCustomer.id;
            await axios.put(`${url}/customers/${customer.id}`, updatedCustomer);
            commit('UPDATE_CUSTOMER', customer);
        } catch (error) {
            console.error(error);
        }
    },

    async fetchCustomers({ commit }) {
        try {
            const response = await axios.get(`${url}/customers`);
            const customers = response.data;
            commit('SET_CUSTOMERS', customers);
        } catch (error) {
            console.error(error);
        }
    },

    async fetchCustomer({ commit }, customerId) {
        try {
            console.log(customerId);
            const response = await axios.get(`${url}/customers/${customerId}`);
            const customer = response.data;
            console.log(customer)
            commit('SET_SELECTED_CUSTOMER', customer);
        } catch (error) {
            console.error(error);
        }
    },
};
