<template>
    <ul>
        <li>
            <router-link to="/admin/categories">Categories</router-link>
        </li>
        <li>
            <router-link to="/admin/subcategories">Subcategories</router-link>
        </li>
        <li>
            <router-link to="/admin/products">Products</router-link>
        </li>
        <li>
            <router-link to="/admin/orders">Orders</router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "DashboardHeaderComponent"
}
</script>