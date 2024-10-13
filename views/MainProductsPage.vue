<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import ShoppingCartList from "@/components/ShoppingCartList.vue";

import { storeToRefs } from "pinia";
import { gun_shop } from "@/stores/usePinia.js";
const gunshop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunshop);

function read_ShoppingCart() {
  all_ShoppingCart_products.value =
    JSON.parse(localStorage.getItem("all_shopping_cart_products")) || [];
}

const get_route = useRoute();
const get_router = useRouter();
const route_name = get_route.params.message;
const toogle = ref(false);
const isOpen = ref(false);
const gotTopubttonisShow = ref(false);
const searchContent = ref("");

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

if (!["airsoft", "real", "member"].includes(route_name)) {
  get_router.replace("/404");
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
  <!-- style="display: flex; flex-direction: column; min-height: 100vh; overflow: auto" -->
  <div style="display: flex; flex-direction: column; min-height: 100vh">
    <header class="m-0 p-0">
      <div
        class="container-md py-1 d-flex align-items-center justify-content-between"
      >
        <router-link :to="`/${route_name}`" class="logo text-black"
          ><div>Logo</div></router-link
        >
        <div class="search-area" style="width: 60%">
          <input
            type="text"
            class="search-text px-4"
            style="padding: 0.8rem"
            placeholder="HK416  戰術手套"
            v-model="searchContent"
            @keyup.enter="startSearch"
          />
          <button
            type="submit"
            class="search-btn px-2 bg-gradient"
            @click="startSearch"
          >
            <i class="bi bi-search fs-4"></i>
          </button>
        </div>
        <div class="d-flex" style="position: relative">
          <!-- <router-link
            :to="`/${route_name}/member`"
            class="fw-bloder fs-2 text-black me-4 member"
            ><i class="bi bi-person-circle"></i
          ></router-link> -->
          <span
            v-if="all_ShoppingCart_products.length > 0"
            class="bg-danger rounded"
            style="
              position: absolute;
              top: 15%;
              right: -10%;
              width: 0.8rem;
              height: 0.8rem;
            "
          ></span>
          <i
            class="bi bi-cart fs-2 member"
            style="cursor: pointer"
            @click.stop="toogleShoppingCart"
          ></i>
        </div>
      </div>
    </header>

    <nav class="sticky-top">
      <div class="container-md custom-navbar py-2">
        <div class="link-bar" :class="{ show: toogle }">
          <router-link
            :to="{
              name: 'search_product',
              query: { searchGroup: '長槍短槍', time: Date.now() },
            }"
            @click="clickToogle"
            class="choose fw-bold fs-4"
            replace
            >長槍短槍</router-link
          >
          <router-link
            :to="{
              name: 'search_product',
              query: { searchGroup: '內部零件', time: Date.now() },
            }"
            @click="clickToogle"
            class="choose fw-bold fs-4"
            replace
            >內部零件</router-link
          >
          <router-link
            :to="{
              name: 'search_product',
              query: { searchGroup: '外部配件', time: Date.now() },
            }"
            @click="clickToogle"
            class="choose fw-bold fs-4"
            replace
            >外部配件</router-link
          >
          <router-link
            :to="{
              name: 'search_product',
              query: { searchGroup: '人身裝備', time: Date.now() },
            }"
            @click="clickToogle"
            class="choose fw-bold fs-4"
            replace
            >人身裝備</router-link
          >
        </div>

        <div class="search-bar d-flex">
          <div class="toggle-area me-1 display-3" @click="clickToogle()">
            <i class="bi bi-list"></i>
          </div>
          <div class="search-area w-100">
            <input
              type="text"
              class="search-text px-4"
              placeholder="HK416  戰術手套"
              v-model="searchContent"
            />
            <button
              type="submit"
              class="search-btn px-2 bg-gradient"
              @click="startSearch"
            >
              <i class="bi bi-search fs-4"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="run-horse-bar bg-gradient">
        <section class="run-horse-words">新品即將進貨!!</section>
      </div>
    </nav>

    <div class="router-view-area" style="flex: 1">
      <router-view></router-view>
    </div>

    <footer class="d-flex justify-content-center">
      <main class="container-xl row row-cols-lg-3 row-cols-xs-1">
        <section class="mb-5">
          顧客服務
          <hr class="mt-1 mb-2" />
          <div class="mb-3">
            <a href="#" class="text-decoration-none">會員中心</a>
          </div>
          <div class="mb-3">
            <a href="#" class="text-decoration-none">買貴通報</a>
          </div>
          <div class="mb-3">
            <a href="#" class="text-decoration-none">購物說明</a>
          </div>
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
              src="@/assets/icon/IG.png"
              width="40rem"
              class="rounded-pill me-3 mt-2"
              alt=""
            />Instagram
          </a>
          <br />
          <a href="#" class="text-decoration-none">
            <img
              src="@/assets/icon/FB.avif"
              width="40rem"
              class="rounded-pill me-3 mt-2"
              alt=""
            />FaceBook </a
          ><br />
          <a href="#" class="text-decoration-none">
            <img
              src="@/assets/icon/thread.png"
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
        class="toolButton shoppingCartButton"
        style="position: relative"
        @click="toogleShoppingCart"
      >
        <span
          v-if="all_ShoppingCart_products.length > 0"
          class="bg-danger rounded"
          style="
            position: absolute;
            top: 0%;
            right: 0%;
            width: 0.8rem;
            height: 0.8rem;
          "
        ></span>
        <i class="bi bi-cart text-black"></i>
      </div>
    </section>

    <div class="shopping-cart-list" :class="[{ show: isOpen }]">
      <ShoppingCartList :setBackColorGray="true"></ShoppingCartList>
    </div>

    <div>
      <!-- PC & Mobile 皆會用 -->
      <div
        class="shoppingCart-mobile-overlay"
        :class="[{ show: isOpen }]"
        @click.stop="toogleShoppingCart"
      ></div>
      <div class="shoppingCart-mobile h-100" :class="[{ show: isOpen }]">
        <ShoppingCartList
          :setBackColorGray="true"
          @click.stop
        ></ShoppingCartList>
      </div>
    </div>

    <div class="member_shoppingCart_btn-mobile text-center fw-bold fs-5">
      <router-link
        :to="`/${route_name}/member`"
        class="w-100 p-2 border-2 border-end border-dark text-dark text-decoration-none bg-gradient"
        >會員中心</router-link
      >

      <div class="w-100 p-2 bg-gradient" @click.stop="toogleShoppingCart">
        購物車
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  div,
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
  }
}

@media (prefers-color-scheme: light) {
  header {
    background-color: rgb(240, 240, 240);
  }

  nav {
    background-color: rgb(170, 170, 170); /*rgb(170, 170, 170)*/
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
}

.layout {
  position: relative;
}

.shoppingCart-mobile {
  display: none;
  position: fixed;
  top: 0;
  left: -100%;
  width: 80%;
  height: 100%;
  transition: 0.3s;
  z-index: 1041;
}

.shoppingCart-mobile.show {
  left: 0;
}

.shoppingCart-mobile-overlay {
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

.shoppingCart-mobile-overlay.show {
  visibility: visible;
  opacity: 0.5;
}

.member_shoppingCart_btn-mobile {
  display: none;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: gray;
  z-index: 9;
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

.toolButton:not(:nth-last-child(1)) {
  margin-bottom: 1rem;
}

.shopping-cart-list {
  width: clamp(350px, 25%, 500px);
  position: fixed;
  top: 0%;
  right: -100%;
  color: black;
  height: 100vh;
  transition: 0.4s;
  z-index: 1041;
}

.shopping-cart-list.show {
  right: 0;
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

  .member_shoppingCart_btn-mobile {
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
