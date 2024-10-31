<script setup>
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import Selectbar from "@/components/SelectBar.vue";
const get_router = useRouter();

//const show_products = [guns, parts, components, equipments];
//const select_bar_name = ["長槍短槍", "內部零件", "外部配件", "人身裝備"];

const get_kind_name = ref();
const get_son_kind_name = ref([]);
const siderSelected = ref([[], [], [], []]);

//取得titleName
const { data: get_kind_name_DB } = await useFetch(
  "https://apachema.mahorsedomain.online/api/get_kind_name"
);

get_kind_name.value = get_kind_name_DB.value.map((item) => item.p_kind_name);

//取得selectName
const get_son_kind_name_DB = get_kind_name.value.map(async (kind) => {
  let select_data;
  const { data } = await useFetch(
    "https://apachema.mahorsedomain.online/api/get_son_kind_name",
    {
      method: "POST",
      query: { p_kind: kind },
    }
  );
  select_data = data.value.map((item) => item.p_son_kind_name);
  return select_data;
});

get_son_kind_name.value = await Promise.all(get_son_kind_name_DB);

const Props = defineProps([
  "searchContent",
  "searchGroup",
  "getsiderBarSearch",
]);

function search() {
  get_router.push({
    name: "search_product",
    query: {
      searchContent: Props.searchContent,
      searchGroup: Props.searchGroup,
      getsiderBarSearch: siderSelected.value,
      sideBar_time: Date.now(),
    },
  });
}

watch(
  () => Props.getsiderBarSearch,
  () => {
    if (Props.getsiderBarSearch == undefined) {
      siderSelected.value = [[], [], [], []];
    }
  }
);

onMounted(() => {
  if (Props.getsiderBarSearch != undefined) {
    siderSelected.value = Props.getsiderBarSearch.map((item) =>
      item.split(",") == "" ? [] : item.split(",")
    );
  }
});
</script>

<template>
  <!-- <div>{{ siderSelected }}</div>
  <div>Props {{ Props.getsiderBarSearch }}</div> -->
  <!-- 搜尋引擎 -->
  <form @submit.prevent="search">
    <div
      class="select-bar"
      v-for="(_, index) in get_kind_name.length"
      :key="index"
    >
      <Selectbar
        v-model="siderSelected[index]"
        :titleItem="get_kind_name[index]"
        :selectItems="get_son_kind_name[index]"
      ></Selectbar>
      <hr />
    </div>

    <button type="submit" class="search-btn py-1">搜尋</button>
  </form>
</template>

<style scoped>
hr {
  margin-top: 10px;
}

.select-bar {
  margin-top: 1rem;
}

.search-bar {
  width: 100%;
  position: relative;
  border-radius: 5px;
  border: 1px solid black;
  overflow: hidden;
  margin: 1rem 0px;
}

.search {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  transition: 0.2s;
}

.search:focus {
  box-shadow: inset 0 0 3px black;
}

.search-btn {
  width: 100%;
  border: none;
  border-radius: 20px;
  margin-bottom: 1rem;
  background-color: rgb(85, 85, 85);
  font-size: 1.2rem;
  font-weight: bold;
  color: aliceblue;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 6px 1px;
}
</style>
