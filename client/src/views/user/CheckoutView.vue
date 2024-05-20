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
import config from "../../../../config/index.js"
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
                customerPostalCode: "",
                server: `${config.SERVER_PROTCOL}:${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
            })
        }
    },
    methods: {
        async createStripePaymentLink(orderId) {
            const response = await fetch(`${this.server}/order/stripe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({orderId: orderId})
            })

            const stripePaymentLink = await response.json()
            window.location = stripePaymentLink.url
        },

        async createOrder() {
            const response = await fetch(`${this.server}/order/create`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
                body: JSON.stringify(this.checkout)
            })

            const createdOrder = await response.json()

            if (createdOrder._id)
                await this.createStripePaymentLink(createdOrder._id)
            else 
                console.log(createdOrder.message)
        }
    }
}
</script>