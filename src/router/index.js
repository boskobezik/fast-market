import Vue from "vue";
import VueRouter from "vue-router";
import AddProduct from "../views/AddProduct.vue";
import Register from "../views/Register.vue";
import Login from "../views/Login.vue";
import AddOrder from "../views/AddOrder.vue";
import Profile from "../views/Profile.vue";
import Products from "../views/Products.vue";
import cookieService from "../services/cookieService";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "register",
    component: Register
  },
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile
  },
  {
    path: "/addproduct",
    name: "addproduct",
    component: AddProduct
  },
  {
    path: "/addorder",
    name: "addorder",
    component: AddOrder
  },
  {
    path: "/",
    name: "products",
    component: Products
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login" || to.path === "/register") {
    if (cookieService.checkCookie("authtoken")) next(from.path);
  }
  next();
});

export default router;
