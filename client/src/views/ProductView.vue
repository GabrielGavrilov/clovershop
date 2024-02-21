<template>
    <HeaderComponent/>
    <ProductComponent v-bind:productId="$route.params.productId"/>
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