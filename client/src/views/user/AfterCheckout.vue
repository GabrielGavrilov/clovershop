<template>
    <Header/>
</template>

<script>
import { fetchRequestToServerWithBody } from "@/common/requests.js"
import Header from "@/components/Header.vue"
import { useRoute } from "vue-router"

export default {
    name: "SuccessView",
    components: {
        Header
    },
    data() {
        return {
            route: useRoute(),
        }
    },
    async mounted() {
        const orderInformation = await fetchRequestToServerWithBody("PUT", "/order/", {orderId: this.route.params.orderId})

        if (orderInformation.data._id)
            console.log(orderInformation)
    }
}
</script>