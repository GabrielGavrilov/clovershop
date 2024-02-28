<template>
    <div v-if="product !== undefined">
        <div>
            <img v-bind:src="require(`@/assets/${product.productPicture}`)">
        </div>
        <div>
            <p>{{ product.productName }}</p>
        </div>
        <div>
            <p>{{ product.productPrice }}</p>
        </div>
        <div>
            <p>{{ product.productQuantity }}</p>
        </div>
        <div>
            <AddToCardComponent v-bind:productId="product._id"/>
        </div>
        <div>
            <p>{{ product.productDescription }}</p>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
import AddToCardComponent from "@/components/AddToCardComponent.vue"

export default {
    name: "ProductComponent",
    props: ["categoryName", "productName"],
    components: {
        AddToCardComponent
    },
    data() {
        return {
            product: undefined
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/api/product", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                categoryName: this.categoryName,
                productName: this.productName
            })
        })
        
        this.product = await response.json()
    }
}
</script>