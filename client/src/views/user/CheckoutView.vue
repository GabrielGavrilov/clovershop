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
import { credentialFetchRequestToServerWithBody } from "@/modules/FetchModule";
import { reactive } from "vue"
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
            })
        }
    },
    methods: {
        async createStripePaymentLink(orderId) {
            const stripePaymentLink = await credentialFetchRequestToServerWithBody("POST", "/order/stripe", {orderId: orderId})
            window.location = stripePaymentLink.data.url
        },
        async createOrder() {
            const createdOrder = await credentialFetchRequestToServerWithBody("POST", "/order/create", this.checkout)

            // Add status message
            if (createdOrder.status == 200)
                await this.createStripePaymentLink(createdOrder._id)
            else 
                console.log(createdOrder.message)
        }
    }
}
</script>