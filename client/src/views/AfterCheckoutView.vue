<template>
    <Header/>
</template>

<script>
import addr from "../../../addresses"
import Header from "@/components/HeaderComponent.vue"
import { useRoute } from "vue-router"

export default {
    name: "SuccessView",
    components: {
        Header
    },
    data() {
        return {
            route: useRoute()
        }
    },
    async mounted() {
        const orderId = this.route.params.orderId
        const response = await fetch(`${addr.SERVER_ADDRESS}/order/process`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({orderId: orderId})
        })

        const orderInformation = await response.json();

        if (orderInformation._id)
            console.log(orderInformation)
    }
}
</script>