<template>
    <div>
        <h2>Customer Detail</h2>
        <div>
            <p><strong>Name:</strong> {{ selectedCustomer.name }}</p>
            <p><strong>Age:</strong> {{ selectedCustomer.age }}</p>
            <button @click="editCustomer">Update</button>
            <div v-if="isEditMode">
                <input v-model="updatedName" type="text" placeholder="Name" />
                <input v-model.number="updatedAge" type="number" placeholder="Age" />
                <button @click="updateCustomer">Save</button>
                <button @click="cancelEdit">Cancel</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isEditMode: false,
            updatedName: '',
            updatedAge: 0,
        };
    },
    computed: {
        selectedCustomer() {
            return this.$store.getters.getSelectedCustomer;
        },
    },
    methods: {
        editCustomer() {
            this.isEditMode = true;
            this.updatedName = this.selectedCustomer.name;
            this.updatedAge = this.selectedCustomer.age;
        },
        updateCustomer() {
            const updatedCustomer = {
                ...this.selectedCustomer,
                name: this.updatedName,
                age: this.updatedAge,
            };
            this.$store.dispatch('updateCustomer', updatedCustomer)
                .then((success) => {
                    if (success) {
                        this.isEditMode = false;
                    } else {
                        console.error('Failed to update customer.');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        cancelEdit() {
            this.isEditMode = false;
        },
    },
};
</script>
