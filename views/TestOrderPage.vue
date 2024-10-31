<script setup>
import { storeToRefs } from "pinia";
const gunshop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunshop);
const totalCost = ref(0);
const allProductName = ref("");

function reduce_quantuty(product) {
  if (product.quantity != 1) {
    product.quantity -= 1;
  } else if (product.quantity == 1) {
    let answer = confirm("是否確認移除商品?");
    if (answer) {
      cancel_product(product.id);
    }
  }
  triggerRef(all_ShoppingCart_products);
  save_all_ShoppingCart_products_in_localStorage();
}

function add_quantuty(product) {
  if (product.quantity != 999) {
    product.quantity += 1;
  }
  triggerRef(all_ShoppingCart_products);
  save_all_ShoppingCart_products_in_localStorage();
}

function cancel_product(Index) {
  const index = all_ShoppingCart_products.value.findIndex(
    (product_in_cart) => product_in_cart.id == Index
  );
  all_ShoppingCart_products.value.splice(index, 1);
  triggerRef(all_ShoppingCart_products); //此行必加，因 splice 無法讓 watch 觸發
  save_all_ShoppingCart_products_in_localStorage();
}

function save_all_ShoppingCart_products_in_localStorage() {
  localStorage.setItem(
    "all_shopping_cart_products",
    JSON.stringify(all_ShoppingCart_products.value)
  );
}

watch(
  () => all_ShoppingCart_products.value,
  (newValue) => {
    if (newValue && newValue.length >= 0) {
      totalCost.value = 0;
      allProductName.value = "";
      all_ShoppingCart_products.value.forEach((item) => {
        totalCost.value += item.p_price * item.quantity;
        allProductName.value += `${item.p_name} * ${item.quantity}#`;
      });
    }
  },
  {
    immediate: true, // 一進入該網頁，立即觸發監聽
    deep: true,
  }
);
</script>
<template>
  <div style="background-color: rgb(230, 230, 230); flex: 1" class="py-3">
    <main class="container">
      <table class="w-100 mb-2">
        <thead class="bg-white">
          <tr class="row p-2">
            <th class="col-6 ps-4 fs-5" colspan="2">商品</th>
            <th class="col-1 text-center fs-5">商品單價</th>
            <th class="col-2 text-center fs-5">商品數量</th>
            <th class="col-1 text-center fs-5">商品總價</th>
            <th class="col-2 text-center fs-5">商品操作</th>
          </tr>
        </thead>
      </table>

      <table class="mb-2">
        <tbody class="bg-white">
          <tr
            v-for="(product, index) in all_ShoppingCart_products"
            :key="index"
            class="row p-2"
          >
            <td class="col-1 text-center">
              <img :src="product.p_pic" alt="商品圖" class="w-100 h-100" />
            </td>
            <td
              class="col-5 text-center fw-bold d-flex align-items-center justify-content-center"
            >
              {{ product.p_name }}
            </td>
            <td
              class="col-1 text-center fw-bold d-flex align-items-center justify-content-center"
            >
              {{ product.p_price }}
            </td>
            <td
              class="col-2 text-center fw-bold d-flex align-items-center justify-content-evenly"
            >
              <span class="quantity-btn fs-4" @click="reduce_quantuty(product)"
                >-</span
              >
              {{ product.quantity }}
              <span class="quantity-btn fs-4" @click="add_quantuty(product)"
                >+</span
              >
            </td>
            <td
              class="col-1 text-center fw-bold d-flex align-items-center justify-content-center"
            >
              {{ product.quantity * product.p_price }}
            </td>
            <td
              class="col-2 fs-5 d-flex align-items-center justify-content-center"
              style="cursor: pointer"
              @click="cancel_product(product.id)"
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
                class="p-2 d-flex justify-content-end"
              >
                <input
                  type="text"
                  name="product_name"
                  :value="allProductName"
                />
                <input type="text" name="product_price" :value="totalCost" />
                <section>
                  <div>
                    <div class="d-flex">
                      <h4>總計 : {{ totalCost }}</h4>
                    </div>
                    <button class="btn btn-secondary w-100 fs-5" type="submit">
                      訂單送出
                    </button>
                  </div>
                </section>
              </form>
            </td>
          </tr>
        </tfoot>
      </table>
    </main>
  </div>
</template>
<style scoped>
input {
  visibility: hidden;
  width: 0;
}

.quantity-btn {
  cursor: pointer;
  user-select: none;
}
</style>
