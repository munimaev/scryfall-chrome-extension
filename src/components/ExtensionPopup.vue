<script setup lang="ts">
import { ref, computed } from "vue";
import Threshold from "./Threshold.vue";
import { enhance }  from "../enhancements/enhance.ts"

// defineProps<{ msg: string }>();

const error = ref("");
const isItScryfall = ref(true);
const expensive = ref(10);
const tabId = ref<number | undefined>(undefined)
const cheap = computed(() => {
  return Math.floor(expensive.value * 0.33);
});
const moderate = computed(() => {
  return Math.floor(expensive.value * 0.66);
});

const click = async () => {
  let [tab] = await chrome.tabs.query({ active: true });
  if (!tab.url?.includes("https://scryfall.com")) {
    isItScryfall.value = false;
    error.value = "This is not Scryfall.com";
  } else {
    tabId.value = tab.id;
    // chrome.scripting.executeScript({
    //   target: { tabId: Number(tab.id) },
    //   files: ['enhancements/enhance.js'],
    // });
    enhance( tab.id, cheap.value, moderate.value, expensive.value)
  }
};
</script>

<template>
  <div v-if="isItScryfall">
    <div class="expensivness">
      <Threshold class="category" label="Cheap" :value="cheap"></Threshold>
      <Threshold class="category" label="Moderate" :value="moderate" />
      <Threshold class="category" label="Expensive" :value="expensive" />
      <lv-range-slider
        sliderColor="#673AB7"
        trackColor="#9C27B0"
        :max="21"
        :main="3"
        :step="1"
        :showValue="true"
        class="slider"
        v-model="expensive"
      />
      <lv-button
        label="Calculate total"
        type="button"
        size="s" 
        outlined
        class="calculate lv--plain"
        @click="click"
      />
    </div>
  </div>
  <div v-else class="error">
    {{ error }}
  </div>
</template>

<style scoped>
.expensivness {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto auto auto;
  gap: 10px;
  width: 100%;
}
.category {
  grid-area: span 1;
}
.slider {
  grid-area: 2 / 1 / 3 / 4;
  padding-bottom: 1.5em;
}
.calculate {
  grid-area: 3 / 1 / 4 / 4;
}
.error {
  color: #f44336;
}
</style>
