<script setup>
import { storeToRefs } from "pinia";
const gunshop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunshop);
const totalCost = ref(0);
const allProductName = ref("");

watch(
  () => all_ShoppingCart_products.value,
  (newValue) => {
    if (newValue && newValue.length >= 0) {
      all_ShoppingCart_products.value.forEach((item) => {
        totalCost.value += item.product.p_price;
        allProductName.value += item.product.p_name + "#";
      });
    }
  },
  {
    immediate: true,
  } // 一進入該網頁，立即觸發監聽
);
</script>
<template>
  <div style="background-color: rgb(230, 230, 230)" class="py-3">
    <main class="container">
      <table class="w-100 mb-2">
        <thead class="bg-white">
          <tr class="row p-2">
            <th class="col-6 ms-1" colspan="2">商品</th>
            <th class="col-2 text-center">商品價格</th>
            <th class="col-2 text-center">商品數量</th>
            <th class="col-2 text-center"></th>
          </tr>
        </thead>
      </table>

      <table class="mb-2">
        <tbody class="bg-white">
          <tr v-for="product in all_ShoppingCart_products" class="row p-2">
            <td class="col-1 text-center">
              <img
                :src="product.product.p_pic"
                alt="商品圖"
                class="w-100 h-100"
              />
            </td>
            <td
              class="col-5 text-center d-flex align-items-center justify-content-center"
            >
              {{ product.product.p_name }}
            </td>
            <td
              class="col-2 text-center d-flex align-items-center justify-content-center"
            >
              {{ product.product.p_price }}
            </td>
            <td
              class="col-2 text-center d-flex align-items-center justify-content-center"
            >
              {{ product.quantity }}
            </td>
            <td
              class="col-2 d-flex align-items-center justify-content-center"
              style="cursor: pointer"
            >
              <i class="bi bi-trash"></i>
            </td>
          </tr>
        </tbody>
      </table>

      <table class="w-100">
        <tfoot class="bg-white border-top">
          <tr>
            <td>
              <form
                action="https://apachema.mahorsedomain.online/api/go_to_pay"
                method="POST"
              >
                <input
                  type="text"
                  name="product_name"
                  :value="allProductName"
                />
                <input type="text" name="product_price" :value="totalCost" />
                <div class="d-flex justify-content-end">
                  <div>
                    <div class="d-flex">
                      <label>商品價格 : </label>
                      <div>{{ totalCost }}</div>
                    </div>
                    <button class="btn btn-secondary" type="submit">
                      預設訂單送出
                    </button>
                  </div>
                </div>
              </form>
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  </div>
</template>
<style>
input {
  border: none;
  outline: none;
  visibility: hidden;
  width: 100px;
}
</style>
