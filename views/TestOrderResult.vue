<script setup>
import { storeToRefs } from "pinia";
const gunshop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunshop);
all_ShoppingCart_products.value = [];
</script>
<template>
  <div>success!!</div>
</template>
<style></style>
