<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { gun_shop } from "@/stores/usePinia.js";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Thumbs } from "swiper/modules";

import "swiper/css";
import "swiper/css/thumbs";

import Rating from "primevue/rating";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import TabPanel from "primevue/tabpanel";

const thumbsSwiper = ref(null);
const currentThumbIndex = ref(0);
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};
const onSlideChange = (swiper) => {
  currentThumbIndex.value = swiper.activeIndex; // 獲取當前活動的縮略圖索引
};

const get_route = useRoute();
const gunshop = gun_shop();
const { airsoft_datas, real_datas, all_ShoppingCart_products } =
  storeToRefs(gunshop);

const choose_data =
  get_route.params.message === "airsoft" ? airsoft_datas : real_datas;
const select_data = choose_data.value.find(
  (product) => product.p_id === get_route.params.product_id
);

function add_product_to_Cart(product) {
  gunshop.add_products(product);
  localStorage.setItem(
    "all_shopping_cart_products",
    JSON.stringify(all_ShoppingCart_products.value)
  );
  console.log(all_ShoppingCart_products.value);
}
</script>

<template>
  <div class="container-md my-2">
    <template v-if="select_data != undefined">
      <div class="row mb-3">
        <div class="col-12 col-lg-7 p-0 m-0">
          <swiper
            :modules="[Thumbs]"
            :thumbs="{ swiper: thumbsSwiper }"
            @slide-Change="onSlideChange"
          >
            <swiper-slide
              v-for="(product, index) in select_data.p_other_pics"
              :key="index"
              class="d-flex justify-content-center"
            >
              <img
                :src="product"
                style="object-fit: contain; cursor: pointer; width: 70%"
                alt="Product image "
              />
            </swiper-slide>
          </swiper>

          <swiper
            class="mt-2 px-3"
            @swiper="setThumbsSwiper"
            :slides-per-view="5"
            :space-between="10"
            :watch-slides-progress="true"
          >
            <swiper-slide
              v-for="(product, index) in select_data.p_other_pics"
              :key="index"
            >
              <img
                :src="product"
                style="object-fit: cover; cursor: pointer; border-radius: 15px"
                class="w-100 thumbs-img"
                :class="{ 'active-thumb': currentThumbIndex === index }"
                alt="Product image"
              />
            </swiper-slide>
          </swiper>
        </div>

        <div class="col-12 col-lg-4 offset-lg-1 py-4">
          <h5 class="mb-2 fw-bold" style="color: rgba(150, 150, 150)">
            {{ select_data.p_son_kind }} {{ select_data.p_brand }}
          </h5>
          <h1 class="fw-bold mb-4">{{ select_data.p_name }}</h1>
          <h4 class="fw-bold mb-4">NT. {{ select_data.p_price }}</h4>
          <h4 class="fw-bold mb-4">庫存數量 : {{ select_data.p_stock }}</h4>
          <div class="d-flex">
            <Rating
              class="mb-4"
              v-model="select_data.p_stock"
              :active-color="'#ffffff'"
            />
            <span class="ms-2">目前{{ select_data.p_stock }}人評論</span>
          </div>

          <!-- <div style="width: 100%" class="btn btn-info mb-3">
            <button>-</button>
            <input style="border: none" />
            <button>+</button>
          </div> -->

          <button
            @click="add_product_to_Cart(select_data)"
            class="btn btn-lg btn-secondary w-100 rounded-pill fw-bold"
          >
            <i class="bi bi-cart3 pe-2"></i>
            加入購物車
          </button>
          <hr />
          <div>
            <div class="fw-bold my-1">分享此商品</div>
            <div>
              <a href="#">
                <img
                  src="@/assets/icon/IG.png"
                  width="40rem"
                  class="rounded-pill me-3 mt-2"
                  alt=""
                />
              </a>
              <a href="#">
                <img
                  src="@/assets/icon/thread.png"
                  width="40rem"
                  class="rounded-pill me-3 mt-2"
                  alt=""
                />
              </a>
              <a href="#">
                <img
                  src="@/assets/icon/FB.avif"
                  width="40rem"
                  class="rounded-pill mt-2"
                  alt=""
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <Tabs value="0">
            <TabList>
              <Tab value="0" style="font-size: 20px">商品詳圖</Tab>
              <Tab value="1" style="font-size: 20px">商品描述</Tab>
              <Tab value="2" style="font-size: 20px">購物須知</Tab>
            </TabList>
            <TabPanels>
              <TabPanel value="0">
                <div class="d-flex flex-column align-items-center">
                  <img
                    v-for="(pic, index) in select_data.p_other_pics"
                    :key="index"
                    class="mb-3"
                    :src="pic"
                    alt="pic"
                    width="70%"
                  />
                </div>
              </TabPanel>
              <TabPanel value="1">
                {{ select_data.p_describtion }}
              </TabPanel>
              <TabPanel value="2" class="p-3 fw-bold">
                <h5 class="my-2 fw-bold">商品購物須知</h5>
                <div>
                  我們提供各式生存遊戲商品，包括但不限於玩具槍、戰術背心、防護裝備、配件等。所有產品均為合法的娛樂用途，僅限18歲以上成人購買。
                </div>
                <div>
                  所有生存遊戲商品僅供戶外或專業場地使用，禁止在公共場所、學校等敏感區域使用，以避免引發不必要的誤會或法律問題。
                </div>
                <div>
                  請勿修改玩具槍的外觀或功能，這可能導致產品不符合安全標準，並有可能違反當地法律。
                </div>
                <h5 class="my-2 fw-bold">退貨政策</h5>
                <div>
                  根據產品狀況，若因商品瑕疵或運送過程中的損壞，我們將提供換貨或退貨服務。
                </div>
                <div>
                  若因個人原因不滿意商品，請確保商品未使用且包裝完整，在購買7天內提出申請，我們將根據具體情況處理退換貨事宜。
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
    </template>
    <template v-else>Product was not found!!</template>
  </div>
</template>

<style scoped>
.active-thumb {
  opacity: 1; /* 活動縮略圖不透明 */
}

.thumbs-img {
  transition: 0.3s;
}

.thumbs-img:not(.active-thumb) {
  opacity: 0.5; /* 非活動縮略圖半透明 */
}

.thumbs-img:not(.active-thumb):hover {
  transition: 0.2s;
  opacity: 0.8;
}
</style>
