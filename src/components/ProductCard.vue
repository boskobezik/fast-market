<template>
  <div>
    <b-card
      v-bind:title="product.Name"
      v-bind:img-src="product.Image"
      v-bind:img-alt="product.Name"
      img-top
      tag="article"
      style="max-width: 20rem;"
      class="mb-2"
    >
      <b-card-text> {{ product.Description }} </b-card-text>

      <div class="right">
        <strong class="price">{{ product.Price }} KM </strong>
        <b-button squared variant="outline-info" v-on:click="addToCart"
          >Dodaj u korpu</b-button
        >
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: Object
  },
  methods: {
    addToCart: function() {}
  }
};
</script>

<style scoped>
.right {
  display: flex;
  justify-content: space-between;
}
.price {
  margin-top: 0.5em;
}
</style>
