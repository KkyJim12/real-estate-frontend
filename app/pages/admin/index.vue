<script setup lang="ts">
// Redirect to login page
definePageMeta({
  middleware: 'auth'
});

onMounted(() => {
  navigateTo('/admin/login');
});
</script>

<template>
  <div></div>
</template>
