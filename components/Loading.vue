<script setup>
const Props = defineProps(["loadingStatus"]);
</script>
<template>
  <div v-if="Props.loadingStatus" class="loading">
    <!-- <div class="spinner-border text-secondary"></div> -->
    <h2>Loading</h2>
  </div>
</template>
<style>
.loading {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 6666;
}

h2 {
  animation: load 2000ms infinite;
}

@keyframes load {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
