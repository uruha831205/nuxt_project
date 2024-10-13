<script setup>
import { ref } from "vue";
import axios from "axios";
axios.defaults.baseURL = "http://apachema.mahorsedomain.online/";
import Loading from "@/components/Loading.vue";

const result = ref();
const loadingStatus = ref(false);

const class_picked = ref();
const name = ref();
const brand_name = ref();
const kind_name = ref();
const son_kind_name = ref();
const price = ref();
const stock = ref();
const pic = ref();
const new_date = ref();
const other_pics = ref([""]);
const describtion = ref();

async function test_insert() {
  startLoading();
  const status = await axios.post("/api/test_post_api", {
    p_class: class_picked.value,
    p_name: name.value,
    p_brand_name: brand_name.value,
    p_kind_name: kind_name.value,
    p_son_kind_name: son_kind_name.value,
    p_price: price.value,
    p_stock: stock.value,
    p_pic: pic.value,
    p_new: new_date.value,
    p_other_pic: other_pics.value.join(","),
    p_describtion: describtion.value,
  });

  result.value = status;
}

function addInput() {
  other_pics.value.push("");
}

function reduceInput(index) {
  other_pics.value.splice(index, 1);
}

function startLoading() {
  loadingStatus.value = !loadingStatus.value;
}
</script>
<template>
  <Loading v-model:loadingStatus="loadingStatus"></Loading>
  <main class="m-1">
    <div>this is insert data page!</div>
    <div>
      <label class="me-1">類型 =></label>
      <input type="radio" id="real" value="real" v-model="class_picked" />
      <label for="real" class="mx-2">real</label>
      <input type="radio" id="airsoft" value="airsoft" v-model="class_picked" />
      <label for="airsoft" class="mx-2">airsoft</label>
    </div>
    <div>
      <label>名稱 =></label>
      <input type="text" v-model="name" />
    </div>
    <div>
      <label>品牌 =></label>
      <input type="text" v-model="brand_name" />
    </div>
    <div>
      <label>種類 =></label>
      <input type="text" v-model="kind_name" />
    </div>
    <div>
      <label>子種類 =></label>
      <input type="text" v-model="son_kind_name" />
    </div>
    <div>
      <label>價格 =></label>
      <input type="number" v-model="price" />
    </div>
    <div>
      <label>庫存 =></label>
      <input type="number" v-model="stock" />
    </div>
    <div>
      <label>封面 =></label>
      <input type="text" v-model="pic" />
    </div>
    <div>
      <label>新進時間 =></label>
      <input type="date" v-model="new_date" />
    </div>

    <div>
      <label>其他圖片 =></label>
      <div v-for="(_, index) in other_pics" :key="index">
        <input type="text" v-model="other_pics[index]" />
        <button
          class="add px-1 mx-1"
          @click="addInput"
          :disabled="other_pics.length == 8"
        >
          +
        </button>
        <button
          class="reduce px-1"
          @click="reduceInput(index)"
          :disabled="other_pics.length == 1"
        >
          -
        </button>
      </div>
    </div>
    <div>{{ other_pics }}</div>

    <div>
      <label>描述 =></label>
      <textarea v-model="describtion" />
    </div>

    <button @click="test_insert">insert data</button>
    <button @click="startLoading">start loading</button>
    <button @click="get_kind_name">get_kind_name</button>
    <div>{{ result }}</div>
  </main>
  <!-- <div v-if="loadingStatus" class="loading">
    <h1>loading</h1>
  </div> -->
  <template v-if="result != undefined">
    <div v-if="result.status == 200">Inert success!!</div>
    <div v-else>Something error!!</div>
  </template>
</template>
<style>
input {
  outline: none;
  border-top: none;
  border-left: none;
  border-right: none;
}
</style>
