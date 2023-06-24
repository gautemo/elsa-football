<script setup lang="ts">
const props = defineProps<{score: number, level: 'easy' | 'medium' | 'hard'}>()
const emits = defineEmits(['again'])

const key = `best-${props.level}`

let best = Number(localStorage.getItem(key) ?? '0')
if(props.score > best) {
  best = props.score
  localStorage.setItem(key, best.toString())
}
</script>

<template>
  <h1>Score: {{ props.score }}</h1>
  <h1>Best: {{ best }}</h1>
  <button @click="emits('again')">Play again?</button>
</template>

<style scoped>
h1 {
  font-size: 3rem;
  margin: 0.5rem;
}
</style>