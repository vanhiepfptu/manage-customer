export default {
    ADD_CUSTOMER(state, customer) {
        state.customers.push(customer);
    },

    SET_CUSTOMERS(state, customers) {
        state.customers = customers;
    },

    SET_SELECTED_CUSTOMER(state, customer) {
        state.selectedCustomer = customer;
        console.log(customer);
    },

    UPDATE_CUSTOMER(state, updatedCustomer) {
        const index = state.customers.findIndex((c) => c.id === updatedCustomer.id);
        if (index !== -1) {
            state.customers.splice(index, 1, updatedCustomer);
        }
    },
    DELETE_CUSTOMER(state, customerId) {
        state.customers = state.customers.filter((c) => c.id !== customerId);
    },
    // login
    SET_USER(state, user) {
        state.user = user;
    },
    //stay login
    SET_USER_LOGIN(state, user) {
        state.isLoggedIn = true;
        state.user = user;
    },
    logout(state) {
        state.user = null;
        state.isLoggedIn = false;
        localStorage.removeItem('user');
    },
    
};
