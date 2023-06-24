<script setup lang="ts">
import { ref } from 'vue';
import Play from './components/Play.vue';

const level = ref<'easy' | 'medium' | 'hard'>()
</script>

<template>
  <main>
    <Play v-if="level" :level="level"/>
    <section v-else>
      <button @click="level = 'easy'">⚽</button>
      <button @click="level = 'medium'">⚽⚽</button>
      <button @click="level = 'hard'">⚽⚽⚽</button>
    </section>
  </main>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap');

:root {
  --pink: rgb(238, 105, 127);
}

html, body {
  margin: 0;
}

main {
  font-family: 'Cinzel', serif;
  color: var(--pink);
  height: 100vh;
  width: 100vw;
  background-image: url('/bg.jpg');
  background-repeat: round;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  background: none;
  border: 3px solid var(--pink);
  border-radius: 5px;
  font-size: 3rem;
  margin: 5px;
  font-family: inherit;
  color: inherit;
  box-shadow: -2px 2px 2px #333;
  text-shadow: -2px 2px 2px #333;
}

h1 {
  text-shadow: -2px 2px 2px #333;
}
</style>
