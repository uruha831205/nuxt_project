<script setup>
import { storeToRefs } from "pinia";
const gunshop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunshop);

const get_router = useRouter();
const data = ref();

async function get_data() {
  data.value = await $fetch(
    "https://apachema.mahorsedomain.online/api/get_latestone",
    { method: "post", body: { data: all_ShoppingCart_products.value } }
  );
}

watch(
  () => all_ShoppingCart_products.value,
  async (newValue) => {
    if (newValue.length > 0) {
      await get_data();
      get_router.push({
        name: "testorderresult",
      });
    }
  },
  { immediate: true, deep: true } // 立即觸發監聽
);
</script>
<template>
  <div>跳轉中...請稍等!!</div>
</template>
<style></style>
