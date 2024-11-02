<script setup>
import { storeToRefs } from "pinia";
const gunshop = gun_shop();
const { all_ShoppingCart_products } = storeToRefs(gunshop);
const get_router = useRouter();
const ID = ref();

function check_ID() {
  localStorage.setItem("ID", "uruha831205");
  ID.value = localStorage.getItem("ID");
  return ID;
}

async function get_data() {
  await $fetch("https://apachema.mahorsedomain.online/api/insert_products", {
    method: "post",
    body: { data: all_ShoppingCart_products.value },
  });
}

async function get_latest_tradeNo(ID) {
  const latest_tradNo = await $fetch(
    "https://apachema.mahorsedomain.online/api/get_latest_tradeNo",
    { method: "post", query: { ID: ID } }
  );
  return latest_tradNo;
}

async function check_tradNo(tradNo) {
  const result = await $fetch(
    "https://apachema.mahorsedomain.online/api/check_tradeNo_in_orderitems",
    { method: "post", query: { trade_no: tradNo } }
  );
  return result;
}

watch(
  () => ID.value,
  async (ID) => {
    console.log("in to watch!!");
    console.log(ID);
    const { order_id } = await get_latest_tradeNo(ID);
    const result = await check_tradNo(order_id);
    console.log(result);

    if (ID == "" || result) {
      console.log("check??");
      get_router.push({ name: "default" });
    } else {
      console.log("into else!!");
      console.log(all_ShoppingCart_products.value.length);
      if (all_ShoppingCart_products.value.length > 0) {
        console.log("check!!");
        await get_data();
        get_router.push({
          name: "testorderresult",
        });
      }
    }
  }
);

onMounted(() => {
  check_ID();
});

// watch(
//   () => all_ShoppingCart_products.value,
//   async (newValue) => {
//     //執行區塊
//     await check_ID();
//     const ID = localStorage.getItem("ID");
//     console.log(ID);
//     console.log(newValue, "?");
//     if (newValue.length > 0) {
//       await get_data();
//       get_router.push({
//         name: "testorderresult",
//       });
//     }
//   }
//   //,{ immediate:true,deep: true } // 立即觸發監聽
// );
</script>
<template>
  <div>跳轉中...請稍等!!</div>
</template>
<style scoped></style>
