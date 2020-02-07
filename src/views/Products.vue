<template>
  <div></div>
</template>

<script>
import httpService from "../services/httpService";
import * as Global from "../Global";
export default {
  name: "Products",
  data: function() {
    return {
      products: []
    };
  },
  mounted: function() {
    httpService
      .get(`${Global.apiurl}api/products/get`)
      .then(res => {
        this.products = res.data;
      })
      .catch(err => console.log(err.response));
  }
};
</script>

<style scoped></style>
