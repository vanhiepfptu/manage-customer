export default {
    getCustomers: state => {
        return state.customers;
    },
    getSelectedCustomer: state => { return state.selectedCustomer },
    getUser: state => state.user,
    isLoggedIn: state => state.user !== null,
    getUserLogin: state => state.auth.user,
};
