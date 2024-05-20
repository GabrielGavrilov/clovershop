import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/user/HomeView.vue"
import CategoryView from "@/views/user/CategoryView"
import ProductView from "@/views/user/ProductView"
import CartView from "@/views/user/CartView"
import CheckoutView from "@/views/user/CheckoutView"
import AfterCheckoutView from "@/views/user/AfterCheckoutView.vue"

import AdminLoginView from "@/views/admin/AdminLoginView"
import AdminDashboardView from "@/views/admin/AdminDashboardView"
import AdminCategoriesView from "@/views/admin/AdminCategoriesView"
import AdminSubcategoriesView from "@/views/admin/AdminSubcategoriesView"
import AdminProductsView from "@/views/admin/AdminProductsView"
import AdminNewCategoryView from "@/views/admin/AdminNewCategoryView"
import AdminNewSubcategoryView from "@/views/admin/AdminNewSubcategoryView"
import AdminNewProductView from "@/views/admin/AdminNewProductView"
import AdminUpdateCategoryView from "@/views/admin/AdminUpdateCategoryView"
import AdminUpdateSubcategoryView from "@/views/admin/AdminUpdateSubcategoryView"
import AdminUpdateProductView from "@/views/admin/AdminUpdateProductView"
import AdminOrdersView from "@/views/admin/AdminOrdersView"
import AdminOrderInformationView from "@/views/admin/AdminOrderInformationView"

import PageNotFoundView from "@/views/user/PageNotFoundView"

const routes = [
    
    // User routes

    {
        path: "/",
        name: "Home",
        component: HomeView
    },
    {
        path: "/:category",
        name: "Category",
        component: CategoryView
    },
    {
        path: "/:category/:product",
        name: "Product",
        component: ProductView
    },
    {
        path: "/cart",
        name: "Cart",
        component: CartView
    },
    {
        path: "/checkout",
        name: "Checkout",
        component: CheckoutView
    },
    {
        path: "/checkout/:orderId",
        name: "After checkout",
        component: AfterCheckoutView
    },

    // Admin routes

    {
        path: "/admin/login",
        name: "Log in",
        component: AdminLoginView
    },
    {
        path: "/admin/dashboard",
        name: "Dashboard",
        component: AdminDashboardView
    },
    {
        path: "/admin/categories",
        name: "Categories",
        component: AdminCategoriesView
    },
    {
        path: "/admin/categories/new",
        name: "New category",
        component: AdminNewCategoryView
    },
    {
        path: "/admin/category/:categoryId",
        name: "Update category",
        component: AdminUpdateCategoryView
    },
    {
        path: "/admin/subcategories",
        name: "Subcategories",
        component: AdminSubcategoriesView  
    },
    {
        path: "/admin/subcategories/new",
        name: "New subcategory",
        component: AdminNewSubcategoryView
    },
    {
        path: "/admin/subcategory/:subcategoryId",
        name: "Update subcategory",
        component: AdminUpdateSubcategoryView
    },
    {
        path: "/admin/products",
        name: "Products",
        component: AdminProductsView
    },
    {
        path: "/admin/products/new",
        name: "New product",
        component: AdminNewProductView
    },
    {
        path: "/admin/product/:productId",
        name: "Update product",
        component: AdminUpdateProductView
    },
    {
        path: "/admin/orders",
        name: "Orders",
        component: AdminOrdersView
    },
    {
        path: "/admin/order/:orderId",
        name: "Order information",
        component: AdminOrderInformationView
    },

    // 404 route

    {
        path: "/:pathMatch(.*)*",
        name: "404",
        component: PageNotFoundView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router