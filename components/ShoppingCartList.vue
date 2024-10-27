<script setup>
import { onMounted, triggerRef } from "vue";
import { storeToRefs } from "pinia";
import { gun_shop } from "@/stores/usePinia.js";

const get_router = useRouter();
const props = defineProps(["setBackColorGray", "position"]);
const isOpen = defineModel();
const left = ref();
const right = ref();

const gunshop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunshop);

if (props.position == "left") {
  left.value = true;
  right.value = false;
} else if (props.position == "right") {
  left.value = false;
  right.value = true;
}

function clear_ShoppingCart() {
  all_ShoppingCart_products.value = [];
  save_all_ShoppingCart_products_in_localStorage();
}

function reduce_quantuty(product) {
  if (product.quantity != 1) {
    product.quantity -= 1;
  } else if (product.quantity == 1) {
    let answer = confirm("是否確認移除商品?");
    if (answer) {
      cancel_product(product.product.p_id);
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
    (item) => item.product.p_id == Index
  );
  all_ShoppingCart_products.value.splice(index, 1);
  triggerRef(all_ShoppingCart_products);
  save_all_ShoppingCart_products_in_localStorage();
}

function save_all_ShoppingCart_products_in_localStorage() {
  localStorage.setItem(
    "all_shopping_cart_products",
    JSON.stringify(all_ShoppingCart_products.value)
  );
}

function go_to_orderpage() {
  get_router.push({
    name: "testorderpage",
  });
  toogleShoppingCart();
}

function toogleShoppingCart() {
  isOpen.value = !isOpen.value;
}
</script>

<template>
  <div
    class="layout shopping-cart"
    :class="{
      'bg-secondary': props.setBackColorGray,
      'shopping-cart-left': left,
      'shopping-cart-right': right,
      show: isOpen,
    }"
  >
    <div class="overflow-auto" style="scrollbar-width: thin">
      <div v-if="all_ShoppingCart_products.length == 0">目前是空的</div>
      <div
        v-for="(product, index) in all_ShoppingCart_products"
        :key="index"
        class="row mb-1 align-items-center m-0"
      >
        <img
          :src="product.product.p_pic"
          alt=""
          class="col-4 col-sm-3 p-1"
          height="90rem"
          style="object-fit: contain"
        />
        <div
          class="col-8 col-sm-9 d-flex flex-column justify-content-around"
          style="height: 100px"
        >
          <div class="col-12 fw-bold">
            {{ product.product.p_name }}
          </div>
          <div class="row">
            <div class="col-5 col-sm-5 fw-bold">
              ${{ product.product.p_price * product.quantity }}
            </div>
            <div class="col-7 col-sm-7 d-flex justify-content-around">
              <button
                class="fw-bold shoppingCartPorduct-btn"
                @click="reduce_quantuty(product)"
              >
                -
              </button>
              <span class="fw-bold">{{ product.quantity }}</span>
              <button
                class="fw-bold shoppingCartPorduct-btn"
                @click="add_quantuty(product)"
                :disabled="product.quantity === 10"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <!-- <div class="col-1">
          <img
            src="@/assets/cancel.svg"
            class="shopping-cart-cancel-btn display-2"
            alt="cancel-btn"
            @click="cancel_product(product.product.p_id)"
          />
        </div> -->
      </div>
    </div>
    <div class="w-100 d-flex fs-5">
      <button
        @click="clear_ShoppingCart"
        class="w-100 p-2 border-2 border-end border-dark shoppingCartList-btn"
      >
        清空商品
      </button>
      <button class="w-100 p-2 shoppingCartList-btn" @click="go_to_orderpage">
        前往結帳
      </button>
    </div>
  </div>

  <!-- 黑背景 -->
  <div
    class="shoppingCart-overlay"
    :class="[{ show: isOpen }]"
    @click.stop="toogleShoppingCart"
  ></div>
</template>
<style>
.layout {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.shopping-cart {
  width: clamp(350px, 25%, 500px);
  position: fixed;
  top: 0%;
  height: 100vh;
  transition: 0.4s;
  z-index: 1041;
}

.shopping-cart-left {
  left: -100%;
}

.shopping-cart-left.show {
  left: 0;
}

.shopping-cart-right {
  right: -100%;
}
.shopping-cart-right.show {
  right: 0;
}

.shoppingCartPorduct-btn {
  user-select: none;
  border-radius: 5px;
  width: 25%;
  cursor: pointer;
  text-align: center;
}

.shoppingCartList-btn {
  user-select: none;
  border: none;
  transition: 0.5s;
  font-weight: bold;
}

.shoppingCartList-btn:hover {
  background-color: rgb(228, 228, 228);
}

.shopping-cart-cancel-btn {
  width: 80%;
  user-select: none;
  cursor: pointer;
}

.shoppingCart-overlay {
  visibility: hidden;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  opacity: 0;
  z-index: 1040;
  transition: 0.3s;
}

.shoppingCart-overlay.show {
  visibility: visible;
  opacity: 0.5;
}
</style>
