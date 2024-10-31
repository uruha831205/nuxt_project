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
        <th class="col-6 ps-4 fs-5" colspan="2">商品</th>
        <th class="col-2 fs-5">商品單價</th>
        <th class="col-2 fs-5">商品數量</th>
        <th class="col-2 fs-5">商品總價</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="product in Props.showProducts" class="row p-2">
        <td class="col-2">
          <img :src="product.p_pic" alt="商品圖" class="w-100 h-100" />
        </td>
        <td class="col-4">{{ product.name }}</td>
        <td class="col-2">{{ product.price }}</td>
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
