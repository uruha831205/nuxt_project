<script setup>
import { storeToRefs } from "pinia";
import ShowProductsList from "@/components/ShowProductsList.vue";
const gunshop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunshop);

function clean_all_ShoppingCart_products() {
  all_ShoppingCart_products.value = [];
}

function save_all_ShoppingCart_products_in_localStorage() {
  localStorage.setItem(
    "all_shopping_cart_products",
    JSON.stringify(all_ShoppingCart_products.value)
  );
}

const { data: orderesult } = await useFetch(
  "https://apachema.mahorsedomain.online/api/get_order_result",
  { method: "POST" }
);

const { data: useFetchResutl } = await useFetch(
  "https://apachema.mahorsedomain.online/api/get_order_result_items",
  { method: "POST", query: { tradeNo: orderesult.value.order_id } }
);

onMounted(() => {
  if (orderesult.value.rtnCode == 1) {
    clean_all_ShoppingCart_products();
    save_all_ShoppingCart_products_in_localStorage();
  }
});
</script>

<template>
  <div class="container center-place my-4">
    <div class="order-list p-3 rounded">
      <h3 v-if="orderesult.rtnCode == 1" class="center-place">
        <i class="bi bi-check2-circle fs-1 fw-bold"></i>
        <div class="text-center">付款成功，感謝您的購買!!</div>
      </h3>
      <h3 v-else class="center-place fs-1 fw-bold">
        <i class="bi bi-exclamation-circle"></i>
        <div class="text-center">付款失敗，請確認信用卡號和信用卡狀態!!</div>
      </h3>
    </div>

    <div v-if="orderesult.rtnCode == 1" class="order-list rounded mt-2">
      <ShowProductsList :showProducts="useFetchResutl"></ShowProductsList>
    </div>

    <!-- <div class="mt-3 d-flex justify-content-center">
      <NuxtLink :to="{ name: 'default' }" class="btn btn-secondary"
        >返回首頁</NuxtLink
      >
    </div> -->
  </div>
</template>

<style scoped>
.center-place {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.order-list {
  background-color: rgb(220, 220, 220);
  width: 70%;
}

@media screen and (max-width: 1000px) {
  .order-list {
    width: 100%;
  }
}
</style>
