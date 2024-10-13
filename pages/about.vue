<script setup>
const getRoute = useRoute();
</script>
<template>
  <h1>this is about page!</h1>
  <h2>{{ getRoute }}</h2>
  <AppAlert> This is an auto-imported component. </AppAlert>
</template>
<style></style>
