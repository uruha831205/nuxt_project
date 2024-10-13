<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Loading from "@/components/Loading.vue";
import { storeToRefs } from "pinia";
import { gun_shop } from "@/stores/usePinia.js";

axios.defaults.baseURL = "http://apachema.mahorsedomain.online/";

const gunshop = gun_shop();
const { x } = storeToRefs(gunshop);

const result = ref();
const loadingStatus = ref(false);

async function get_kind_name() {
  loadingStatus.value = true;
  result.value = await gunshop.get_kindName_fromDB();
  result.value = result.value.data.map((item) => item.p_kind_name);
  console.log(result.value, "kind");
  loadingStatus.value = false;
  return result.value;
}

async function get_son_kind_name() {
  const kinds = ref(await get_kind_name());
  console.log(kinds.value, "son_kind");
  loadingStatus.value = true;
  result.value = await gunshop.get_son_kindName_fromDB(kinds.value);
  loadingStatus.value = false;
}
</script>
<template>
  <Loading :loadingStatus="loadingStatus"></Loading>
  <button @click="get_kind_name">get_kind_name</button>
  <button @click="get_son_kind_name">get_son_kind_name</button>

  <template v-if="result != undefined">
    <div v-for="item in result.value">{{ item }}</div>
  </template>
</template>
<style></style>
