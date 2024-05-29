<template>
    <ul class="dashboard-navbar">
        <p class="dashboard-navbar-title">Catalog</p>
        <li>
            <div class="dashboard-button">
                <button>Categories</button>
            </div>
        </li>
        <li>
            <div class="dashboard-button">
                <button>Subcategories</button>
            </div>
        </li>
        <p class="dashboard-navbar-title">Products</p>
        <li>
            <div class="dashboard-button">
                <button>Products</button>
            </div>
        </li>
        <p class="dashboard-navbar-title">Customers</p>
        <li>
            <div class="dashboard-button">
                <button>Orders</button>
            </div>
        </li>
    </ul>
</template>

<script>
import AdminDashboardStyle from "@/assets/styles/AdminDashboard.css"

export default {
    name: "AdminSideMenuComponent"
}
</script>