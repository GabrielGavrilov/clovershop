<template>
    <div class="sidebar">
        <ul>
            <P class="sidebar-section-title">Quick links </P>
            <li>
                <a href="/admin/categories/new">
                    <div class="sidebar-button">
                        <button>New category</button>
                    </div>
                </a>
            </li>
            <li>
                <a href="/admin/products/new">
                    <div class="sidebar-button">
                        <button>New product</button>
                    </div>
                </a>
            </li>
            <p class="sidebar-section-title">Catalog</p>
            <li>
                <a href="/admin/categories">
                    <div class="sidebar-button">
                        <button>Categories</button>
                    </div>
                </a>
            </li>
            <li>
                <a href="/admin/subcategories">
                    <div class="sidebar-button">
                        <button>Subcategories</button>
                    </div>
                </a>
            </li>
            <li>
                <a href="/admin/products">
                    <div class="sidebar-button">
                        <button>Products</button>
                    </div>
                </a>
            </li>
            <p class="sidebar-section-title">Customers</p>
            <li>
                <a href="/admin/orders">
                    <div class="sidebar-button">
                        <button>Orders</button>
                    </div>
                </a>
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