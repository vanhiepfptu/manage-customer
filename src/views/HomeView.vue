<template>
  <div class="home">
    <login-form></login-form>
  </div>
</template>

<script>
import LoginForm from '@/components/page/LoginForm.vue';
// @ is an alias to /src

export default {
  name: "HomeView",
  components: {
    LoginForm,
  },
};
</script>
