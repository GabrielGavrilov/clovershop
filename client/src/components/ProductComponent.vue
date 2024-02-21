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
            <p>{{ product.productDescription }}</p>
        </div>
    </div>
    <div v-else>
        <p>Loading...</p>
    </div>
</template>

<script>
export default {
    name: "ProductComponent",
    props: ["productId"],
    data() {
        return {
            product: undefined
        }
    },
    async mounted() {
        const response = await fetch("http://localhost:3000/category/product", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                productId: this.productId
            })
        })
        
        this.product = await response.json()
        console.log(this.product)
    }
}
</script>