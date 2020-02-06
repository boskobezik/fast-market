import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      User_id: -1,
      Full_name: "",
      Paypal_email: "",
      Username: "",
      Password: ""
    },
    cart: [
      {
        Product_id: 2,
        Product_name: "test",
        Picture_url: "testURL",
        Price: 54,
        User_Owner_id: 24
      }
    ]
  },
  mutations: {
    /* USERS */
    addUser(state, user) {
      state.user = user;
    },
    deleteUser(state) {
      state.user = null;
    },

    /* PRODUCTS */
    addProductToCart(state, product) {
      state.cart.push(product);
    },
    deleteProductFromCart(state, product) {
      state.cart.filter(p => p !== product);
    },
    clearCart(state) {
      state.cart = [];
    }
  },
  actions: {
    addUser(context, user) {
      context.commit("addUser", user);
    },
    deleteUser(context) {
      context.commit("deleteUser");
    }
  },
  modules: {},
  getters: {
    isLogged: state => {
      return state.user.User_id !== -1;
    },
    loggedUser: state => {
      return state.user;
    }
  }
});
