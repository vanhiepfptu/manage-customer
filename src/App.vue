<template>
  <section>
    <header>
      <div v-if="isLoggedIn">
        <p style="color: white;">Welcome, {{ user.name }}!</p>
      </div>
      <nav>
        <h1>
          <router-link to="/">Home</router-link> |
        </h1>
        <ul>
          <li>
            <router-link to="/add-customer">Add Customer</router-link> |
          </li>
          <li>
            <router-link to="/customers">List</router-link>
          </li>
        </ul>
      </nav>
    </header>
    <router-view />
  </section>
</template>
<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.getters.getUser;
    }
  },
  created() {
    const user = localStorage.getItem('user');
    if (user) {
      this.$store.commit('SET_USER', JSON.parse(user));
    }
  }
}
</script>
<style scoped>
header {
  display: flex;
  height: 5rem;
  background-color: #3d008d;
  width: 100%;
  align-items: center;
}
header a {
  text-decoration: none;
  color: white;
  display: inline-block;
  padding: 0.75rem 1.5rem;
  border: 1px solid transparent;
  cursor: pointer;
}
header nav {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
