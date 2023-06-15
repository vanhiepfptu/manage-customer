<template>
    <div>
        <div v-if="isLoggedIn">
            <p>You are already registered and logged in.</p>
        </div>
        <div v-else>
            <form @submit.prevent="register">
                <input v-model="userData.username.value" type="text" placeholder="Username" />
                <p v-if="!userData.username.isValid">Username must not be empty</p>
                <input v-model.number="userData.password.value" type="password" placeholder="Password" />
                <p v-if="!userData.password.isValid">Password must not be empty</p>
                <input v-model.number="confirmPassword.value" type="password" placeholder="ConfirmPassword" />
                <p v-if="!confirmPassword.isValid">Confirm password does not match to password</p>
                <input v-model="userData.name.value" type="text" placeholder="Name" />
                <p v-if="!userData.name.isValid">Name must not be empty</p>
                <input v-model.number="userData.age.value" type="number" placeholder="Age" />
                <p v-if="!userData.age.isValid">Age must not be greater than 0 and not be empty</p>
                <button type="submit">Register</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
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
            userData: {
                username: {
                    value: '',
                    isValid: true,
                },
                password: {
                    value: '',
                    isValid: true,
                },
                name: {
                    value: '',
                    isValid: true,
                },
                age: {
                    value: null,
                    isValid: true,
                },

            },
            formIsValid: false,
            confirmPassword: {
                value: '',
                isValid: true,
            }
        };
    },
    methods: {
        async register(event) {
            event.preventDefault();
            this.registerValidation();
            if (!this.formIsValid) {
                return;
            }
            const success = await this.$store.dispatch('register',
                this.userData
            );
            if (success) {
                // Đăng ký thành công, thực hiện các hành động sau đăng ký
                alert('Đăng kí thành công');
                console.log('register successfully');
                this.$router.push('/login');
            } else {
                console.log({
                    username: this.userData.username.value,
                    password: this.userData.password.value,
                    name: this.userData.name.value,
                    age: this.userData.age.value
                });
                // Đăng ký thất bại, xử lý thông báo lỗi hoặc các hành động khác
                console.log('register failed');
            }
        },
        registerValidation() {
            this.formIsValid = true;
            if (this.userData.username.value === '') {
                this.userData.username.isValid = false;
                this.formIsValid = false;
            }
            if (this.userData.password.value === '') {
                this.userData.username.isValid = false;
                this.formIsValid = false;
            }
            else if (this.userData.password.value !== this.confirmPassword.value) {
                this.confirmPassword.isValid = false;
                this.formIsValid = false;
            }
            if (this.userData.name.value === '') {
                this.userData.name.isValid = false;
                this.formIsValid = false;
            }
            if (this.userData.age.value === null) {
                this.userData.age.isValid = false;
                this.formIsValid = false;
            }
        },
    },
};
</script>

<style>
form {
    border: 3px solid #f1f1f1;
}

.errorMess {
    color: red
}

/* Full-width inputs */
input[type="text"],
input[type="password"],
input[type="number"] {
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
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
}

button:hover {
    opacity: 0.8;
}

.container {
    padding: 16px;
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
