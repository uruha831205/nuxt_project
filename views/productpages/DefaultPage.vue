<script setup>
import { useRoute } from "vue-router";
import { computed, ref } from "vue";
// import { Carousel } from "bootstrap";

import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { storeToRefs } from "pinia";
import { gun_shop } from "@/stores/usePinia.js";

//取得路由資料
const get_route = useRoute();

//取得 pinia資料
const gunshop = gun_shop();
const { airsoft_datas, real_datas } = storeToRefs(gunshop);

const airsoft = [
  new URL("@/assets/img/airsoft_new/airsoft_new_1.jpg", import.meta.url),
  new URL("@/assets/img/airsoft_new/airsoft_new_2.jpg", import.meta.url),
  new URL("@/assets/img/airsoft_new/airsoft_new_3.jpg", import.meta.url),
];
const real = [
  new URL("@/assets/img/real_new/real_new_1.jpg", import.meta.url),
  new URL("@/assets/img/real_new/real_new_2.jpg", import.meta.url),
  new URL("@/assets/img/real_new/real_new_3.jpg", import.meta.url),
];

const currentIndex = ref(0);
const currentList = ref([]);

const onSlideChange = (swiper) => {
  currentIndex.value = swiper.realIndex;
  if (currentList.value.length <= swiper.slides.length) {
    currentList.value.push(currentIndex.value);
  }
};

const choose = computed(() => {
  if (get_route.params.message == "airsoft") {
    return airsoft;
  } else if (get_route.params.message == "real") {
    return real;
  }
  return null;
});

const show_datas = computed(() => {
  if (get_route.params.message == "airsoft") {
    return airsoft_datas.value;
  } else if (get_route.params.message == "real") {
    return real_datas.value;
  }
  return null;
});
</script>

<template>
  <main class="container-md">
    <!-- @slideChange="onSlideChange" -->
    <swiper
      :loop="true"
      :speed="1500"
      :modules="[Navigation, Pagination, Autoplay]"
      :pagination="{ clickable: true }"
      :navigation="{
        prevEl: '.custom-prev',
        nextEl: '.custom-next',
      }"
      :autoplay="{
        delay: 4000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }"
      @slide-change="onSlideChange"
      class="my-2"
    >
      <swiper-slide v-for="(product, index) in choose" :key="index">
        <img
          :src="product"
          style="object-fit: cover; cursor: pointer"
          class="w-100"
          :class="{ 'swiper-img': currentList.includes(index) }"
          alt="Product-image"
        />
      </swiper-slide>
      <div class="custom-prev">
        <img src="@/assets/angle-left-solid.svg" alt="Previous" />
      </div>
      <div class="custom-next">
        <img src="@/assets/angle-right-solid.svg" alt="Next" />
      </div>
    </swiper>

    <div class="new-products my-3">
      <div class="row row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-xs-1">
        <div
          v-for="(data, index) in show_datas"
          :key="index"
          class="new-product-banner"
        >
          <div class="product w-100 h-100">
            <div class="new-tag">新品上市</div>
            <router-link
              :to="`/${get_route.params.message}/${data.p_id}`"
              class="product-pic w-100"
            >
              <img :src="data.p_pic" alt="product_pic" class="pic w-100" />
            </router-link>
            <div class="product-info mt-2 w-100 straight-display">
              <div class="fw-bold fs-5 w-100">{{ data.p_name }}</div>
              <div class="w-100">
                <hr class="mt-1 mb-2" />
                <div>上架時間 : {{ data.p_new }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="hot-products"></div>
  </main>
</template>

<style scoped>
.swiper-img {
  animation: imgshow 5s forwards;
}

@keyframes imgshow {
  to {
    scale: 1.1;
  }
}

@media (prefers-color-scheme: dark) {
  .product {
    background-color: #333;
  }
}

.new-product-banner {
  padding: 10px;
}

.straight-display {
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
}

.product {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 5px 6px 1px,
    rgba(0, 0, 0, 0.06) 0px -1px 4px -1px;
  padding: 1rem;
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
}

.product-info {
  height: calc(100% - 200px);
}

.pic {
  height: 200px;
  object-fit: contain;
}

.new-tag {
  position: absolute;
  top: 0;
  right: 0;
  border-bottom-left-radius: 0.5rem;
  padding: 0.2rem 0.4rem;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 5px 1px;
  z-index: 1;
  background-color: rgb(219, 152, 89); /*184, 115, 51*/
  color: white;
}

.swiper {
  --swiper-pagination-color: black;
  --swiper-pagination-bullet-size: 50px; /* 設定 pagination 的大小 : 目前使用無感 */
  --swiper-pagination-bullet-width: 12px; /* 設定 pagination 的寬度 */
  --swiper-pagination-bullet-height: 12px; /* 設定 pagination 的高度 */
}

:is(.new-products) img {
  transition: 0.5s;
}

:is(.new-products) img:hover {
  scale: 1.03;
}

.custom-prev,
.custom-next {
  position: absolute;
  top: 0%;
  width: 8%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1;
  transition: 0.5s;
}

.custom-prev:hover,
.custom-next:hover {
  background-color: rgba(150, 150, 150, 0.3);
}

.custom-prev {
  left: 0%;
}

.custom-next {
  right: 0%;
}

.custom-prev img,
.custom-next img {
  width: 3rem;
  height: 3rem;
  color: white;
}
</style>
