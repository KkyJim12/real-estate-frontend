<script setup lang="ts">
// Redirect to projects page
definePageMeta({
  middleware: 'auth'
});

onMounted(() => {
  navigateTo('/admin/projects');
});
</script>

<template>
  <div></div>
</template>
