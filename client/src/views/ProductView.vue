<template>
    <HeaderComponent/>
    <div>
        <div>
            <!-- <p>{{ product._id }}</p> -->
            <!-- <img v-bind:src="require(`@/assets/${product.productPicture}`)"> -->
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

export default {
    name: "ProductView",
    components: {
        HeaderComponent
    },
    setup() {
        const route = useRoute()
        let product = ref()
        const categoryName = route.params.category
        const productId = route.params.productId

        onMounted(async function() {
            const response = await fetch("http://localhost:3000/category/product", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    categoryName: categoryName,
                    productId: productId
                })
            })

            // console.log(await response.json())

            product.value = await response.json()
            console.log(product)
        })

        return {
            product
        }
    }
}
</script>