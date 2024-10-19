<script setup>
import { storeToRefs } from "pinia";
import { gun_shop } from "@/stores/usePinia.js";
import { ref, shallowRef, watch, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
const get_route = useRoute();

const Props = defineProps([
  "searchGroup",
  "searchContent",
  "getsiderBarSearch",
]);

const gunShop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunShop);

const siderSelected = ref([[], [], [], []]);
const show_items = ref();
const loadingStatus = ref(false);

function add_product_to_Cart(product) {
  gunShop.add_products(product);
  localStorage.setItem(
    "all_shopping_cart_products",
    JSON.stringify(all_ShoppingCart_products.value)
  );
}

async function serachByName(name) {
  const { data } = await useFetch(
    "https://apachema.mahorsedomain.online/api/get_products_by_name",
    {
      method: "POST",
      body: { p_class: get_route.params.message, p_name: name },
    }
  );
  show_items.value = data.value;
}

async function serachByKind(kind) {
  const { data } = await useFetch(
    "https://apachema.mahorsedomain.online/api/get_products_by_kind",
    {
      method: "POST",
      body: { p_class: get_route.params.message, p_kind: kind },
    }
  );
  show_items.value = data.value;
}

async function serachByDetailed() {
  if (siderSelected.value.every((innerArray) => innerArray.length === 0)) {
    checkToSearch();
    return;
  }

  const { data } = await useFetch(
    "https://apachema.mahorsedomain.online/api/get_products_by_detailed",
    {
      method: "Post",
      body: {
        p_class: get_route.params.message,
        p_son_kind: siderSelected.value,
      },
    }
  );
  show_items.value = data.value;
}

function checkToSearch() {
  if (Props.searchContent != undefined) {
    serachByName(Props.searchContent);
  } else if (Props.searchGroup != undefined) {
    serachByKind(Props.searchGroup);
  }
}

function split_sideBar_data() {
  if (Props.getsiderBarSearch != undefined) {
    siderSelected.value = Props.getsiderBarSearch.map((item) =>
      item.split(",") == "" ? [] : item.split(",")
    );
  }
}

watch(
  () => Props.getsiderBarSearch,
  () => {
    if (Props.getsiderBarSearch == undefined) {
      siderSelected.value = [[], [], [], []];
    }
  }
);

watch(
  () => get_route.query.time,
  () => {
    checkToSearch();
  }
);

watch(
  () => Props.getsiderBarSearch,
  () => {
    split_sideBar_data();
  }
);

watch(siderSelected, () => {
  serachByDetailed();
});

checkToSearch();
split_sideBar_data();
serachByDetailed();
</script>

<template>
  <!-- <div>{{ Props }}</div>
  <div v-for="item in siderSelected">{{ item }}</div> -->
  <div class="container">
    <div class="row row-cols-lg-3 row-cols-md-2 row-cols-xs-1">
      <div v-for="(item, index) in show_items" :key="index" class="p-3">
        <div class="product-banner">
          <NuxtLink
            :to="`/${get_route.params.message}/${item.id}`"
            class="product-pic"
          >
            <img
              class="pic w-100 p-1"
              style="height: 250px; object-fit: contain"
              :src="item.p_pic"
              alt="pic"
            />
          </NuxtLink>

          <div class="product-info p-3">
            <div
              class="product-name fs-5 fw-bold d-flex justify-content-between align-items-center"
            >
              <div>{{ item.p_name }}</div>
              <!-- <div class="fs-6 fw-bold">庫存量: {{ item.p_stock }}</div> -->
            </div>
            <div class="d-flex justify-content-between align-items-center mt-2">
              <div class="product-price fw-bold fs-6">${{ item.p_price }}</div>
              <button
                class="btn btn-sm btn-secondary"
                @click="add_product_to_Cart(item)"
              >
                <!--購物車按鈕在上面-->
                <i class="bi bi-cart3 pe-2"></i>加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/*
@media (prefers-color-scheme: dark) {
  .product-banner {
    background-color: #333;
  }
}
*/

.product-banner {
  background-color: #ffffff;
}

:root[class="my-app-dark"] {
  .product-banner {
    background-color: #333;
  }
}

.product-banner {
  width: 100%;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 6px 1px,
    rgba(0, 0, 0, 0.06) 0px -1px 4px -1px;
  border-radius: 6px;
  padding: 5px;
}

.product-info {
  height: calc(100% - 250px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
