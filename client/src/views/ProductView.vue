<template>
    <HeaderComponent/>
    <ProductComponent 
        v-bind:categoryName="$route.params.category"
        v-bind:productName="$route.params.product"
    />
</template>

<script>
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