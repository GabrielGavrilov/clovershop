<template>
    <HeaderComponent/>
    <form v-on:submit.prevent="createOrder()">
        <input v-model="checkout.customerEmail" type="email" placeholder="Email" required>
        <br>
        <input v-model="checkout.customerFirstName" type="text" placeholder="First name" required>
        <br>
        <input v-model="checkout.customerLastName" type="text" placeholder="Last name" required>
        <br>
        <input v-model="checkout.customerAddress" type="text" placeholder="Address" required>
        <br>
        <input v-model="checkout.customerCity" type="text" placeholder="City" required>
        <br>
        <input v-model="checkout.customerProvince" type="text" placeholder="Province" required>
        <br>
        <input v-model="checkout.customerPostalCode" type="text" placeholder="Postal code" required>
        <br>
        <button>Continue to payment</button>
    </form>
</template>

<script>
import { reactive } from "vue"
import { useRouter } from "vue-router";
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
    name: "CheckoutView",
    components: {
        HeaderComponent
    },
    data() {
        return {
            checkout: reactive({
                customerEmail: "",
                customerFirstName: "",
                customerLastName: "",
                customerAddress: "",
                customerCity: "",
                customerProvince: "",
                customerPostalCode: ""
            })
        }
    },
    methods: {
        async createOrder() {
            const response = await fetch("http://localhost:3000/order/create", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.checkout)
            })

            const createdOrder = await response.json()
            window.location = `http://localhost:3000/order/checkout/${createdOrder._id}`
        }
    }
}
</script>