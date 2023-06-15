<template>
    <div class="container">
        <div v-if="isLoggedIn">
            <base-card>
                <h1>Welcome, {{ user.name }}!</h1>
                <button @click="Logout()">Logout</button>
            </base-card>
        </div>
        <div v-else>
            <base-card>
                <h2>Login</h2>
                <form @submit="submitForm">
                    <input v-model="username.val" type="text" placeholder="Username" />
                    <p class="errorMess" v-if="!username.isValid">Username must not be empty</p>
                    <input v-model="password.val" type="password" placeholder="Password" />
                    <p class="errorMess" v-if="!password.isValid">Password must not be empty</p>
                    <p class="errorMess" v-if="!loginIsValid">Tài khoản hoặc mật khẩu không đúng</p>
                    <button type="submit">Login</button>
                </form>
            </base-card>
            <base-card>
                <h2>You don't have account ? Register here</h2>
                <register-form></register-form>
            </base-card>
        </div>
    </div>
</template>

<script>
import BaseCard from '../UI/BaseCard.vue';
import RegisterForm from './RegisterForm.vue';
export default {
    components: {
        BaseCard,
        RegisterForm,
    },
    computed: {
        isLoggedIn() {
            return this.$store.getters.isLoggedIn;
        },
        user() {
            return this.$store.getters.getUser;
        },
    },
    data() {
        return {
            username: {
                val: '',
                isValid: true,
            },
            password: {
                val: '',
                isValid: true,
            },
            loginIsValid: true,
        };
    },
    methods: {
        validationLogin() {
            this.loginIsValid = true;
            if (this.username === '') {
                this.username.isValid = false;
                this.loginIsValid = false;
            }
            if (this.password === '') {
                this.password.isValid = false;
                this.loginIsValid = false;
            }
        },
        async submitForm(event) {
            event.preventDefault();
            this.validationLogin();
            if (!this.loginIsValid) {
                return;
            }
            const success = await this.$store.dispatch('login', {
                username: this.username.val,
                password: this.password.val,
            });
            if (success) {
                // Đăng nhập thành công, chuyển hướng đến trang CustomerList
                this.$router.replace('/home');
            } else {
                // Đăng nhập thất bại, hiển thị thông báo lỗi
                // alert('Tài khoản hoặc mật khẩu không đúng');
                this.loginIsValid = false;
                console.error('Failed to login.');
            }
        },
        Logout() {
            this.$store.commit('logout');
            this.$router.replace('/login'); // Chuyển hướng đến trang đăng nhập
        },
    },
};
</script>
<style scoped>
form {
    border: 3px solid #f1f1f1;
}

.errorMess {
    color: red
}

/* Full-width inputs */
input[type="text"],
input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
}

input:focus {
    background-color: #f0e6fd;
    outline: none;
    border-color: #04aa6d;
}

/* Set a style for all buttons */
button {
    background-color: #04aa6d;
    color: white;
    margin: 0 auto;
    border: none;
    cursor: pointer;
    width: 50%;
}

button:hover {
    opacity: 0.8;
}

.container {
    padding: 16px;
    margin: 0 auto;
}

@media screen and (max-width: 300px) {
    span.psw {
        display: block;
        float: none;
    }

    .cancelbtn {
        width: 100%;
    }
}
</style>