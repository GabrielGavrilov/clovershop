<template>
    <Header/>
</template>

<script>
import { fetchRequestToServerWithBody } from "@/common/fetch.js"
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
        const orderInformation = await fetchRequestToServerWithBody("POST", "/order/process", {orderId: this.route.params.orderId})

        if (orderInformation.data._id)
            console.log(orderInformation)
    }
}
</script>