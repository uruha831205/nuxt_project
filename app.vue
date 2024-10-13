<script setup>
const number = ref(0);
const route = useRoute();

useHead({
  title: "Hello Nuxt3",
  link: [
    {
      rel: "stylesheet",
      href: "https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css",
    },
  ],
});
</script>

<template>
  <NuxtPage />
</template>

<style scope></style>
