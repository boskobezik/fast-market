<template>
  <div class="row row-centered mt-5">
    <b-form @submit="onSubmit" @reset="onReset">
      <!-- PRODUCT_NAME -->
      <b-form-group
        id="product_name_group"
        label="Product name:"
        label-for="product_name"
      >
        <b-form-input
          id="product_name"
          v-model="form.product_name"
          required
          placeholder="Enter product name"
        ></b-form-input>
      </b-form-group>

      <!-- PRODUCT_OWNER -->
      <b-form-group
        id="product_owner_id_group"
        label="Product owner:"
        label-for="product_owner_id"
      >
        <b-form-input
          id="product_owner_id"
          v-model="form.product_owner_id"
          required
          placeholder="Enter owner ID"
        ></b-form-input>
      </b-form-group>

      <!-- PRODUCT_PRICE -->
      <b-form-group
        id="product_price_group"
        label="Product price:"
        label-for="product_price"
      >
        <b-form-input
          id="product_price"
          v-model="form.product_price"
          required
          placeholder="Enter price"
        ></b-form-input>
      </b-form-group>

      <!-- PRODUCT_IMAGE_URL -->
      <b-form-group
        id="product_url_group"
        label="Product URL:"
        label-for="product_url"
      >
        <b-form-input
          id="product_url"
          v-model="form.product_url"
          required
          placeholder="Enter product URL"
        ></b-form-input>
        <b-img
          :src="form.product_url"
          fluid
          alt="Product image"
          class="pb-2 pt-2"
        ></b-img>
      </b-form-group>

      <b-button type="submit" variant="primary" style="margin-right:5px;"
        >Submit</b-button
      >
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
  </div>
</template>

<script>
import httpService from "../services/httpService";
import * as Global from "../Global";

export default {
  data() {
    return {
      form: {
        product_id: null,
        product_name: "",
        product_owner_id: "",
        product_url: "https://picsum.photos/300/150",
        product_price: ""
      }
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      let payload = {
        Product_id: 0,
        User_Owner_id: 25,
        Product_name: this.form.product_name,
        Price: this.form.product_price,
        Picture_url: this.form.product_url
      };
      console.warn("SENDING PAYLOAD", payload);
      httpService
        .post(`${Global.apiurl}api/products/add`, payload)
        .then(res => console.log(res))
        .catch(err => console.error(err));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.product_name = "";
      this.form.product_owner = "";
      this.form.product_url = "";
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>
