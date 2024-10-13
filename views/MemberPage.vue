<script setup>
import { ref } from "vue";
import Timeline from "primevue/timeline";
import CustomButton from "../components/Button.vue";
import Selectbar from "@/components/SelectBar.vue";
import axios from "axios";

import { storeToRefs } from "pinia";
import { gun_shop } from "@/stores/usePinia.js";
const gunshop = gun_shop();
const { guns, parts, components, equipments } = storeToRefs(gunshop);
const apiResult = ref();
const tap = ref(false);

const siderSelected = ref([]);

const show_products = [guns, parts, components, equipments];
const select_bar_name = ["長槍短槍", "內部零件", "外部配件", "人身裝備"];

function get_info_from_Laravel() {
  tap.value = !tap.value;
  if (tap.value) {
    get_info();
  } else {
    apiResult.value = "";
  }
}

//laravel API test : Success!!
async function get_info() {
  const result = await axios.get(
    "http://apachema.mahorsedomain.online/api/opps"
  );
  console.log(result.data);
  apiResult.value = result.data;
}
</script>

<template>
  <div class="container py-2">
    <div>This is member page!!</div>
    <Selectbar
      v-model="siderSelected"
      :titleItem="select_bar_name[0]"
      :selectItems="show_products[0]"
    ></Selectbar>

    <div>{{ apiResult }}</div>
    <button @click="get_info_from_Laravel">Get Info From Laravel</button>
  </div>
</template>

<style scoped>
@media (prefers-color-scheme: dark) {
  header {
    background-color: yellow;
  }
  nav {
    background-color: orange;
  }
}
</style>
