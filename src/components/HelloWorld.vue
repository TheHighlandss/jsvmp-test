<script setup>
import { ref } from 'vue'
import { sayHello  } from "./utils";

defineProps({
  msg: String,
})
sayHello()
const count = ref(0)
</script>

<template>
  <h1>{{ msg }}</h1>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
