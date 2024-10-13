<script setup>
import { useRoute } from "vue-router";
import psidebar from "@/components/SideBar.vue";
import pcontent from "@/components/Content.vue";

const get_route = useRoute();
</script>

<template>
  <div class="custom-layout container-md d-flex p-0">
    <div class="sidebar">
      <psidebar
        :searchGroup="get_route.query.searchGroup"
        :searchContent="get_route.query.searchContent"
        :getsiderBarSearch="get_route.query.getsiderBarSearch"
      ></psidebar>
    </div>
    <div class="section">
      <pcontent
        :searchGroup="get_route.query.searchGroup"
        :searchContent="get_route.query.searchContent"
        :getsiderBarSearch="get_route.query.getsiderBarSearch"
      ></pcontent>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  width: 21%;
}

.section {
  width: 79%;
}

@media screen and (max-width: 780px) {
  .custom-layout {
    flex-direction: column;
  }

  .sidebar,
  .section {
    width: 100%;
    padding-inline: 1rem;
  }
}
</style>
