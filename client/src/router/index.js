import { createRouter, createWebHistory } from "vue-router";

import HomeView from "@/views/HomeView.vue"
import CategoryView from "@/views/CategoryView"
import ProductView from "@/views/ProductView"
import CartView from "@/views/CartView"
import CheckoutView from "@/views/CheckoutView"

import AdminLoginView from "@/views/AdminLoginView"
import AdminDashboardView from "@/views/AdminDashboardView"
import AdminCategoriesView from "@/views/AdminCategoriesView"
import AdminSubcategoriesView from "@/views/AdminSubcategoriesView"
import AdminProductsView from "@/views/AdminProductsView"
import AdminNewCategoryView from "@/views/AdminNewCategoryView"
import AdminNewSubcategoryView from "@/views/AdminNewSubcategoryView"
import AdminNewProductView from "@/views/AdminNewProductView"


const routes = [
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
        path: "/admin/subcategories",
        name: "Subcategories",
        component: AdminSubcategoriesView  
    },
    {
        path: "/admin/products",
        name: "Products",
        component: AdminProductsView
    },
    {
        path: "/admin/categories/new",
        name: "New category",
        component: AdminNewCategoryView
    },
    {
        path: "/admin/subcategories/new",
        name: "New subcategory",
        component: AdminNewSubcategoryView
    },
    {
        path: "/admin/products/new",
        name: "New product",
        component: AdminNewProductView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router