<template>
  <div class="row row-centered mt-5">
    <b-form @submit="onSubmit" @reset="onReset">
      <!-- Product Selection -->
      <b-form-group
        id="product_name_group"
        label="Product name:"
        label-for="product_name"
      >
        <b-form-input
          list="product_selection_id"
          v-on:change="productSelected"
        ></b-form-input>
        <datalist id="product_selection_id">
          <option
            v-for="product in form.productNames"
            v-bind:key="product + Math.floor(Math.random() * 100 + 1)"
            >{{ product }}</option
          >
        </datalist>
      </b-form-group>

      <!-- QUANTITY -->
      <b-form-group
        id="product_quantity_group"
        label="Product quantity:"
        label-for="product_quantity"
      >
        <b-form-input
          id="product_quantity"
          v-model="form.product_quantity_offset"
          required
          placeholder="Enter product name"
        ></b-form-input>
      </b-form-group>

      <!-- ADD TO CART -->
      <b-button
        variant="primary"
        style="margin-right:5px;"
        v-on:click="onAddToCart"
        >Add to cart</b-button
      >
      <b-button type="reset" variant="danger">Reset</b-button>

      <table>
        <thead>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Image</th>
          <th scope="col">Price</th>
          <th scope="col">Owner</th>
          <th scope="col">Quantity</th>
          <th scope="col"></th>
        </thead>
        <tbody v-for="product in this.form.products" :key="product.Product_id">
          <tr>
            <th scope="row">{{ product.Product_id }}</th>
            <th>{{ product.Product_name }}</th>
            <th><img :src="product.Picture_url" width="32" height="32" /></th>
            <th>{{ product.Price }}</th>
            <th>{{ product.User_Owner_id }}</th>
            <th>
              {{ product.quantity == null ? 0 : product.quantity }}
            </th>
            <th><button class="btn-warning">Edit</button></th>
            <th><button class="btn-danger">Delete</button></th>
          </tr>
        </tbody>
      </table>
    </b-form>
  </div>
</template>

<script>
import httpService from "../services/httpService";
import * as Global from "../Global";

export default {
  mounted() {
    // GET SOME PRODUCTS FROM DATABASE
    httpService
      .get(`${Global.apiurl}api/products/get`)
      .then(res => {
        if (res.data.length !== 0) {
          res.data.map(p => {
            this.form.products.push({
              product: p,
              quantity: 0
            });
          });

          //this.$store.commit("addProductsToCart", res.data);
          //this.form.products = res.data;
          // this.form.products.forEach(p => {
          //   this.form.productQuantities.set(p.Product_id, 0);
          // });
          this.form.productNames = this.$store.state.cart.map(
            p => p.Product_name
          );
        } else {
          console.warn("NO PRODUCTS");
        }
      })
      .catch(err => console.log(err));
  },
  data() {
    return {
      form: {
        order_id: null,
        user_id: null,
        selectedProduct: null,
        product_quantity_offset: 0,
        products: [],
        productNames: []
      }
    };
  },
  methods: {
    onDeleteProduct() {},
    onAddToCart() {},
    productSelected(arg) {
      this.form.selectedProduct = this.form.products.find(
        p => p.Product_name === arg
      );
      console.log(
        "line 137 - this.form.selectedProduct: ",
        this.form.selectedProduct
      );
    },
    onSubmit(evt) {
      evt.preventDefault();
      const payload = {
        Order: {
          Order_id: this.form.order_id,
          User_id: this.form.user_id
        },
        ProductViewModel: [
          {
            Product: {
              Product_id: this.form.selectedProduct.Product_id,
              Product_name: this.form.selectedProduct.Product_name,
              Picture_url: this.form.selectedProduct.Picture_url,
              Price: this.form.selectedProduct.Price,
              User_Owner_id: this.form.selectedProduct.User_Owner_id
            },
            Quantity: this.form.product_quantity
          }
        ]
      };

      console.warn(payload);
      httpService
        .post(`${Global.apiurl}api/orders/add`, payload)
        .then(res => console.log(res))
        .catch(err => console.log(err, "Response: ", err.response));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style>
.row-centered {
  display: flex;
  justify-content: center;
  text-align: center;
}
</style>
