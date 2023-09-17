<script setup lang="ts">
import { ref,reactive } from "vue";

let count = ref(0);
let input = ref("");

let cards: {data: string, key:number, width: number}[] = reactive([]);

const submit = () => {
  cards.push({data: input.value, key: count.value, width: 32});
  count.value++;
};

</script>

<template>
  <el-input v-model="input" placeholder="Please input" />
  <el-button @click="submit">Submit</el-button>
  <bit-view-card :data="'0x12345678'" :width="32"></bit-view-card>
  <bit-view-card v-for="data in cards" :key="data.key" :data="data.data" :width="data.width"></bit-view-card>
</template>

<style>
.ep-button {
  margin: 4px;
}
.ep-button + .ep-button {
  margin-left: 0;
  margin: 4px;
}
</style>
