<template>
    <HeaderComponent/>
    <main>
        <div class="product-content">
            <ProductComponent 
                v-bind:categoryName="$route.params.category"
                v-bind:productName="$route.params.product"
            />
        </div>
    </main>
</template>

<script>
import style from '@/assets/css/product.css'
import HeaderComponent from '@/components/HeaderComponent.vue';
import ProductComponent from '@/components/ProductComponent.vue';

export default {
    name: "ProductView",
    components: {
        HeaderComponent,
        ProductComponent
    }
}
</script>