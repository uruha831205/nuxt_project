<script setup>
import ShoppingCartList from "@/components/ShoppingCartList.vue";
import Loading from "~/components/Loading.vue";

import { storeToRefs } from "pinia";
import { gun_shop } from "@/stores/usePinia.js";
import { right } from "@popperjs/core";
const gunshop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunshop);

const get_route = useRoute();
const get_router = useRouter();
const route_name = get_route.params.message;
const toogle = ref(false);
const isOpen = ref(false);
const gotTopubttonisShow = ref(false);
const searchContent = ref("");

const get_kind = ref();
const loadingstatus = ref(true);

const toggleStatus = ref(false);

function clickToogle() {
  toogle.value = !toogle.value;
}

function toogleShoppingCart() {
  isOpen.value = !isOpen.value;
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function startSearch() {
  get_router.push({
    name: "search_product",
    query: { searchContent: searchContent.value, time: Date.now() },
  });
}

function handleScroll() {
  gotTopubttonisShow.value = window.scrollY >= 500;
}

function read_ShoppingCart() {
  all_ShoppingCart_products.value =
    JSON.parse(localStorage.getItem("all_shopping_cart_products")) || [];
}

const { data } = await useFetch(
  "https://apachema.mahorsedomain.online/api/get_kind_name"
);
get_kind.value = data.value;
loadingstatus.value = false;

function toggleDarkMode() {
  document.documentElement.classList.toggle("my-app-dark");
  toggleStatus.value = !toggleStatus.value;
}

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  try {
    read_ShoppingCart();
  } catch (err) {
    console.log(err);
  }
});
</script>

<template>
  <Loading :loadingStatus="loadingstatus"></Loading>
  <div style="display: flex; flex-direction: column; min-height: 100vh">
    <header class="m-0 p-0">
      <div
        class="container-md py-1 d-flex align-items-center justify-content-between"
      >
        <NuxtLink :to="`/${route_name}`" class="logo text-black"
          ><div>Logo</div></NuxtLink
        >
        <form
          class="search-area"
          style="width: 60%"
          @submit.prevent="startSearch"
        >
          <input
            type="text"
            class="search-text px-4"
            style="padding: 0.8rem"
            placeholder="HK416  戰術手套"
            v-model="searchContent"
            @keyup.enter="startSearch"
          />
          <button type="submit" class="search-btn px-2 bg-gradient">
            <i class="bi bi-search fs-4"></i>
          </button>
        </form>

        <div class="d-flex align-items-center">
          <!-- 主題燈按鈕 -->
          <button
            @click="toggleDarkMode()"
            class="me-4 fs-5 theme-btn d-flex align-items-center justify-content-center"
          >
            <template v-if="toggleStatus">
              <i class="bi bi-lightbulb-fill"></i>
            </template>
            <template v-else>
              <i class="bi bi-lightbulb"></i>
            </template>
          </button>

          <!-- 購物車按鈕 -->
          <div
            style="position: relative; cursor: pointer"
            @click.stop="toogleShoppingCart"
          >
            <!-- <NuxtLink
              :to="`/${route_name}/member`"
              class="fw-bloder fs-2 text-black me-4 member"
              ><i class="bi bi-person-circle"></i
            ></NuxtLink> -->
            <span
              v-if="all_ShoppingCart_products.length > 0"
              class="rounded-circle shoppingCartButton"
              >{{ all_ShoppingCart_products.length }}</span
            >
            <i class="bi bi-cart fs-2 member"></i>
          </div>
        </div>
      </div>
    </header>

    <nav class="sticky-top">
      <div class="container-md custom-navbar py-2">
        <div class="link-bar" :class="{ show: toogle }">
          <template v-if="get_kind">
            <NuxtLink
              v-for="item in get_kind"
              :to="{
                name: 'search_product',
                query: { searchGroup: `${item.p_kind_name}`, time: Date.now() },
              }"
              @click="clickToogle"
              class="choose fw-bold fs-4"
              replace
              >{{ item.p_kind_name }}</NuxtLink
            >
          </template>
        </div>

        <div class="search-bar d-flex">
          <div class="toggle-area me-1 display-3" @click="clickToogle()">
            <i class="bi bi-list"></i>
          </div>
          <form class="search-area w-100" @submit.prevent="startSearch">
            <input
              type="text"
              class="search-text px-4"
              placeholder="HK416  戰術手套"
              v-model="searchContent"
            />
            <button type="submit" class="search-btn px-2 bg-gradient">
              <i class="bi bi-search fs-4"></i>
            </button>
          </form>
        </div>
      </div>
      <div class="run-horse-bar bg-gradient">
        <section class="run-horse-words">新品即將進貨!!</section>
      </div>
    </nav>

    <!-- 切換內容 -->
    <div class="NuxtPage-area" style="display: flex; flex: 1">
      <NuxtPage></NuxtPage>
    </div>

    <footer class="d-flex justify-content-center">
      <main class="container-xl row row-cols-lg-3 row-cols-xs-1">
        <section class="mb-5">
          顧客服務
          <hr class="mt-1 mb-2" />
          <p class="mb-3">
            <a href="#" class="text-decoration-none">會員中心</a>
          </p>
          <p class="mb-3">
            <a href="#" class="text-decoration-none">買貴通報</a>
          </p>
          <p class="mb-3">
            <a href="#" class="text-decoration-none">購物說明</a>
          </p>
        </section>
        <section class="mb-5">
          門市營業時間
          <hr class="mt-1 mb-2" />
          周二 ~ 周日 : AM. 11:00 ~ PM.9:00 <br />
          周一公休<br />
          線上客服<br />
          周一 ~ 週日 : AM. 12:00 ~ PM.9:00
        </section>
        <section class="mb-5">
          社群媒體
          <hr class="mt-1 mb-2" />
          <a href="#" class="text-decoration-none">
            <img
              src="/icon/IG.png"
              width="40rem"
              class="rounded-pill me-3 mt-2"
              alt=""
            />Instagram
          </a>
          <br />
          <a href="#" class="text-decoration-none">
            <img
              src="/icon/FB.avif"
              width="40rem"
              class="rounded-pill me-3 mt-2"
              alt=""
            />FaceBook </a
          ><br />
          <a href="#" class="text-decoration-none">
            <img
              src="/icon/thread.png"
              width="40rem"
              class="rounded-pill me-3 mt-2"
              alt=""
            />Thread </a
          ><br />
        </section>
      </main>
    </footer>

    <section class="mainPageToolButtons" :class="{ show: gotTopubttonisShow }">
      <div class="toolButton goTopButton" @click="scrollToTop">
        <i class="bi bi-arrow-bar-up text-black"></i>
      </div>
      <div
        class="toolButton"
        style="position: relative"
        @click="toogleShoppingCart"
      >
        <span
          v-if="all_ShoppingCart_products.length > 0"
          class="rounded-circle shoppingCartButton"
          >{{ all_ShoppingCart_products.length }}</span
        >
        <i class="bi bi-cart text-black"></i>
      </div>
    </section>

    <ShoppingCartList
      v-model="isOpen"
      position="right"
      :setBackColorGray="true"
    ></ShoppingCartList>
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  :root {
    color-scheme: light;
  }
  /*div,
  button,
  header,
  :is(header) div {
    background-color: #444;
  }

  nav,
  :is(nav) div,
  footer {
    background-color: #333;
  }

  * {
    color: #fff;
  }*/
}

header {
  background-color: rgb(240, 240, 240);
}

nav {
  background-color: rgb(170, 170, 170);
}

button {
  background-color: white;
}

footer {
  background-color: rgb(170, 170, 170);
}

* {
  color: #000;
}

/*@media (prefers-color-scheme: light) {
  :root {
    --theme-btn-hover-color: rgb(250, 250, 250);
  }

  header {
    background-color: rgb(240, 240, 240);
  }

  nav {
    background-color: rgb(170, 170, 170);
  }

  button {
    background-color: white;
  }

  footer {
    background-color: rgb(170, 170, 170);
  }

  * {
    color: #000;
  }
}*/

:root[class="my-app-dark"] {
  :root {
    --theme-btn-hover-color: rgb(255, 255, 255);
  }

  div,
  button,
  header,
  :is(header) div {
    background-color: #444; /*444*/
  }

  nav,
  :is(nav) div,
  footer {
    background-color: #333;
  }

  .theme-btn:hover {
    background-color: rgb(141, 141, 141);
  }

  * {
    color: #fff;
  }
}

.layout {
  position: relative;
}

.theme-btn {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 2.5rem;
  border: none;
  background-color: white;
  transition: 0.3s;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 6px 3px;
}

.theme-btn:hover {
  background-color: var(--theme-btn-hover-color);
}

.logo {
  font-size: 3rem;
  font-weight: bold;
  text-decoration: none;
}

.member {
  text-decoration: none;
  font-weight: bold;
}

.toggle-area {
  display: none;
}

.search-bar {
  width: 25%;
}

:is(nav) .search-area {
  display: none;
}

.search-area {
  display: flex;
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  margin: 2px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px 1px,
    rgba(0, 0, 0, 0.06) 0px -1px 4px -1px;
}

.search-text {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  transition: 0.2s;
}

.search-btn {
  height: 100%;
  inset: unset;
  position: absolute;
  right: 0;
  border: none;
  width: 15%;
  border-radius: 50px;
}

.choose {
  position: relative;
  text-decoration: none;
  font-style: unset;
  margin-right: 1.5rem;
}

.choose:nth-last-child(1) {
  margin-right: 0;
}

.choose::after {
  position: absolute;
  left: 0;
  bottom: -1px;
  content: "";
  width: 100%;
  height: 2px;
  background-color: rgb(31, 31, 31);
  border-radius: 5px;
  transform: scaleX(0);
  transition: 0.5s;
}

.choose:hover::after {
  transform: scaleX(0.95);
}

.run-horse-bar {
  height: 4vh;
  background-color: rgb(15, 15, 15); /*rgb(49, 49, 49)*/
  color: aliceblue;
  font-size: 1.2rem;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-shadow: 0 0 2px black;
}

.run-horse-words {
  color: white;
  position: absolute;
  animation: slide linear 25s infinite;
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(calc(100vw));
  }
}

@media screen and (max-width: 1024px) {
  .run-horse-words {
    animation-duration: 15s;
  }
}

@media screen and (max-width: 576px) {
  .run-horse-words {
    animation-duration: 10s;
  }
}

.mainPageToolButtons {
  position: fixed;
  right: 3%;
  bottom: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 3;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}

.mainPageToolButtons.show {
  visibility: visible;
  opacity: 1;
}

.toolButton {
  width: 50px;
  aspect-ratio: 1/1;
  font-size: 1.5rem;
  border-radius: 50px;
  background-color: white;
  color: aliceblue;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 0 6px black;
  user-select: none;
  cursor: pointer;
}

.shoppingCartButton {
  background-color: rgb(255, 0, 0);
  display: flex;
  justify-content: center;

  position: absolute;
  top: 0%;
  right: -20%;
  width: 1.2rem;
  height: 1.2rem;
  font-size: 0.9rem;
  font-weight: bold;
}

.toolButton:not(:nth-last-child(1)) {
  margin-bottom: 1rem;
}

footer {
  padding: 5.4rem;
}

@media screen and (max-width: 1000px) {
  .custom-navbar {
    display: flex;
    flex-direction: column;
    padding-inline: 0.5rem;
  }

  .link-bar {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .search-bar {
    width: 100%;
  }

  header {
    padding: 5px;
  }
}

@media screen and (max-width: 600px) {
  .shoppingCart-mobile {
    display: block;
  }

  .shopping-cart,
  .shopping-cart-list {
    display: none;
  }
}

@media screen and (max-width: 700px) {
  :is(nav) .search-area {
    display: block;
  }

  :is(header) .search-area {
    display: none;
  }

  .toggle-area {
    display: block;
  }

  .link-bar {
    flex-direction: column;
    align-items: center;
    transition: 0.5s;
    transform-origin: top;
    max-height: 0;
    overflow: hidden;
  }

  .link-bar.show {
    max-height: 150px;
    margin-top: 0.5rem;
  }

  .choose {
    margin-right: 0;
  }

  .custom-navbar {
    flex-direction: column-reverse;
    padding-bottom: 0;
  }
}
</style>
