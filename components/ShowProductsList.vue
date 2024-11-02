<script setup>
const Props = defineProps(["showProducts"]);
const totalCost = ref(0);

Props.showProducts.forEach((product) => {
  totalCost.value += product.price * product.quantity;
});
</script>

<template>
  <table>
    <thead>
      <tr class="row p-2">
        <th class="col-8 ps-4" colspan="2">商品</th>
        <th class="col-2">數量</th>
        <th class="col-2">總價</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="product in Props.showProducts" class="row p-3">
        <td class="col-3">
          <img :src="product.p_pic" alt="商品圖" class="w-100 h-100" />
        </td>
        <td class="col-5">{{ product.name }}</td>
        <td class="col-2">{{ product.quantity }}</td>
        <td class="col-2">
          {{ product.quantity * product.price }}
        </td>
      </tr>
    </tbody>
  </table>

  <hr class="mx-2" />

  <table class="px-3 py-1 d-flex justify-content-end">
    <tr>
      <h4>總計 : {{ totalCost }}</h4>
    </tr>
  </table>
</template>

<style scoped>
.center-place,
td,
th {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
