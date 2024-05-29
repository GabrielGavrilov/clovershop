<template>
    <div class="sidebar">
        <ul>
            <p class="sidebar-section-title">Catalog</p>
            <li>
                <div class="sidebar-button">
                    <button>Categories</button>
                </div>
            </li>
            <li>
                <div class="sidebar-button">
                    <button>Subcategories</button>
                </div>
            </li>
            <p class="sidebar-section-title">Products</p>
            <li>
                <div class="sidebar-button">
                    <button>Products</button>
                </div>
            </li>
            <p class="sidebar-section-title">Customers</p>
            <li>
                <div class="sidebar-button">
                    <button>Orders</button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import AdminSidebarStyle from "@/assets/styles/AdminSidebar.css"

export default {
    name: "AdminSidebarComponent"
}
</script>