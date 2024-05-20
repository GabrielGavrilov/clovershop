<template>
    <Header/>
</template>

<script>
import config from "../../../../config/index.js"
import Header from "@/components/HeaderComponent.vue"
import { useRoute } from "vue-router"

export default {
    name: "SuccessView",
    components: {
        Header
    },
    data() {
        return {
            route: useRoute(),
            server: `${config.SERVER_PROTCOL}:${config.SERVER_DOMAIN}:${config.SERVER_PORT}`
        }
    },
    async mounted() {
        const orderId = this.route.params.orderId
        const response = await fetch(`${this.server}/order/process`, {
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