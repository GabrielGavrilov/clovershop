import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/user/Home.vue"
import Category from "@/views/user/Category"
import Product from "@/views/user/Product"
import Cart from "@/views/user/Cart"
import Checkout from "@/views/user/Checkout"
import AfterCheckout from "@/views/user/AfterCheckout.vue"

import AdminLogin from "@/views/admin/AdminLogin"
import AdminDashboard from "@/views/admin/AdminDashboard"
import AdminCategories from "@/views/admin/AdminCategories"
import AdminSubcategories from "@/views/admin/AdminSubcategories"
import AdminProducts from "@/views/admin/AdminProducts"
import AdminNewCategory from "@/views/admin/AdminNewCategory"
import AdminNewSubcategory from "@/views/admin/AdminNewSubcategory"
import AdminNewProduct from "@/views/admin/AdminNewProduct"
import AdminUpdateCategory from "@/views/admin/AdminUpdateCategory"
import AdminUpdateSubcategory from "@/views/admin/AdminUpdateSubcategory"
import AdminUpdateProduct from "@/views/admin/AdminUpdateProduct"
import AdminOrders from "@/views/admin/AdminOrders"
import AdminOrderInformation from "@/views/admin/AdminOrderInformation"

import PageNotFound from "@/views/user/PageNotFound"

const routes = [
    
    /**
     * User routes
     */
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/:category",
        name: "Category",
        component: Category
    },
    {
        path: "/:category/:product",
        name: "Product",
        component: Product
    },
    {
        path: "/cart",
        name: "Cart",
        component: Cart
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: Checkout
    },
    {
        path: "/checkout/:orderId",
        name: "After checkout",
        component: AfterCheckout
    },

    /**
     * Admin routes
     */

    {
        path: "/admin/login",
        name: "Log in",
        component: AdminLogin
    },
    {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: AdminDashboard
    },
    {
        path: "/admin/categories",
        name: "Categories",
        component: AdminCategories
    },
    {
        path: "/admin/categories/new",
        name: "New category",
        component: AdminNewCategory
    },
    {
        path: "/admin/category/:categoryId",
        name: "Update category",
        component: AdminUpdateCategory
    },
    {
        path: "/admin/subcategories",
        name: "Subcategories",
        component: AdminSubcategories 
    },
    {
        path: "/admin/subcategories/new",
        name: "New subcategory",
        component: AdminNewSubcategory
    },
    {
        path: "/admin/subcategory/:subcategoryId",
        name: "Update subcategory",
        component: AdminUpdateSubcategory
    },
    {
        path: "/admin/products",
        name: "Products",
        component: AdminProducts
    },
    {
        path: "/admin/products/new",
        name: "New product",
        component: AdminNewProduct
    },
    {
        path: "/admin/product/:productId",
        name: "Update product",
        component: AdminUpdateProduct
    },
    {
        path: "/admin/orders",
        name: "Orders",
        component: AdminOrders
    },
    {
        path: "/admin/order/:orderId",
        name: "Order information",
        component: AdminOrderInformation
    },

    // 404 route

    {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: PageNotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router