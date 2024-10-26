<script setup lang="ts">

defineProps<{ label: string, value: number }>();

</script>

<template>
  <div class="threshold">
    <p>{{ label }}</p>
    <h2>${{ value }}</h2>
  </div>
</template>

<style scoped>
.threshold {
  text-align: center;
}
</style>
