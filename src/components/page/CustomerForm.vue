<template>
  <div>
    <base-card>
      <form @submit.prevent="addCustomer">
        <div class="form-control">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required>
        </div>
        <div class="form-control">
          <label for="age">Age:</label>
          <input type="number" id="age" v-model="age" required>
        </div>
        <base-button type="submit">Add Customer</base-button>
      </form>
    </base-card>
    <!-- <h2>Customers</h2>
    <ul>
      <li v-for="customer in customers" :key="customer.id">
        {{ customer.name }} - {{ customer.age }}
      </li>
    </ul> -->
  </div>
</template>

<script>
export default {
  name: 'AddCustomerForm',
  data() {
    return {
      name: '',
      age: null
    };
  },
  computed: {
    customers() {
      return this.$store.getters.getCustomers;
    }
  },
  methods: {
    addCustomer() {
      const customer = {
        name: this.name,
        age: this.age
      };
      this.$store.dispatch('addCustomer', customer);
      alert('Add customer thành công');
      this.name = '';
      this.age = null;
      this.$store.dispatch('fetchCustomers');
    }
  },
  created() {
    this.$store.dispatch('fetchCustomers');
  }
};
</script>


<!-- <template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid: !fullName.isValid}">
      <label>Fullname</label>
      <input
        type="text"
        id="fullname"
        v-model.trim="fullName.val"
        @blur="clearValidity('fullName')"
      />
      <p v-if="!fullName.isValid">Name must not be empty</p>
    </div>
    <div class="form-control" :class="{invalid: !Age.isValid}">
      <label>Age</label>
      <input
        type="text"
        id="age"
        v-model.number="Age.val"
        @blur="clearValidity('Age')"
      />
      <p v-if="!Age.isValid">Age must be greater than 0 and not allowed to be empty</p>
    </div>
    <base-button>Add customer</base-button>
  </form>
</template>

<script>
import BaseButton from '../UI/BaseButton.vue';
export default {
  components: { BaseButton },
  emits: ["save-data"],
  data() {
    return {
      fullName: {
        val: "",
        isValid: true,
      },
      Age: {
        val: 0,
        isValid: true,
      },
      formIsValid: true,
    };
  },
  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },
    validationForm() {
      this.formIsValid = true;
      if (this.fullName.val === "") {
        this.fullName.isValid = false;
        this.formIsValid = false;
      }
      if (this.Age < 0 && this.Age === 0) {
        this.Age.isValid = false;
        this.formIsValid = false;
      }
    },
    submitForm() {
      this.validationForm();
      if (!this.formIsValid) {
        return;
      }
      const formData = {
        name: this.fullName.val,
        age: this.Age.val,
      };

      this.$emit('save-data', formData);
    },
  },
};
</script>
-->
<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"]+label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>