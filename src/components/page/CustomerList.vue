<template>
  <div>
    <base-card>
      <input v-model="searchKeyword" type="text" placeholder="Search keyword" />
      <button @click="searchCustomers">Search</button>
      <h2>Customer List</h2>
      <div>
        <button @click="sortByName">Sort by Name</button>
        <button @click="sortByAge">Sort by Age</button>
      </div>
      <ul>
        <li v-for="customer in filteredCustomers" :key="customer.id">
          <base-card>
            <span>Tên khách hàng:
              <strong>
                {{ customer.name }}
              </strong>
            </span>
            <span>Tuổi: <strong>{{ customer.age }}</strong></span>
          </base-card>
          <button @click="deleteCustomer(customer.id)">Delete</button>
          <button @click="viewDetail(customer.id)">View Detail</button>
        </li>
      </ul>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchKeyword: '', // Từ khóa tìm kiếm
      filteredCustomers: [], // Danh sách khách hàng được lọc
    };
  },
  computed: {
    customers() {
      return this.$store.getters.getCustomers;
    },
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.getUser;
    },
  },
  methods: {
    deleteCustomer(customerId) {
      this.$store.dispatch('deleteCustomer', customerId);
    },
    viewDetail(customerId) {
      this.$store.dispatch(`fetchCustomer`,customerId);
      this.$router.push(`/customer/${customerId}`);
    },
    searchCustomers() {
      const keyword = this.searchKeyword.toLowerCase();
      this.filteredCustomers = this.customers.filter(
        (customer) =>
          customer.name.toLowerCase().includes(keyword) ||
          customer.age.toString().includes(keyword)
      );
    },
    sortByName() {
      this.filteredCustomers.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    },
    sortByAge() {
      this.filteredCustomers.sort((a, b) => a.age - b.age);
    },
  },
  watch: {
    searchKeyword: function (newKeyword) {
      this.searchCustomers(newKeyword);
    },
  },
  created() {
    this.$store.dispatch('fetchCustomers');
  },
  mounted() {
    // Khi component được tải, hiển thị tất cả khách hàng ban đầu
    this.filteredCustomers = this.customers;
  }
};
</script>
<style scoped>
ul {
  display: block;
  justify-content: space-between;
  align-items: center;
  list-style: none;
  padding: 0;
}

li {
  margin-bottom: 20px;
}

span {
  margin: 3px;
}

button {
  margin: 3px;
  padding: 5px 10px;
  border: none;
  background-color: #4caf50;
  color: #fff;
  cursor: pointer;
}
</style>