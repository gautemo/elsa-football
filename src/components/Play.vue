<script setup lang="ts">
import { useMouse } from '@vueuse/core';
import { computed, reactive, ref } from 'vue';
import Result from './Result.vue';

const props = defineProps<{ level: 'easy' | 'medium' | 'hard' }>()

const score = ref(0)
const playing = ref(true)

let speed = 6
const elsaSpeed = computed(() => {
  if(props.level === 'easy') {
    return 10
  } else if (props.level === 'medium') {
    return 7
  }
  return 5
})
const speedInc = computed(() => {
  if(props.level === 'easy') {
    return 0.15
  } else if (props.level === 'medium') {
    return 0.35
  }
  return 0.6
})

const { x } = useMouse()
const elsaEl = ref<HTMLElement>()
const ballEl = ref<HTMLElement>()
const ball = reactive({
  x: 0,
  y: 0,
  dx: 0,
})
const elsaX = ref(0)

setInterval(() => {
  if (!elsaEl.value || !ballEl.value) return
  const elsaMid = elsaX.value + (elsaEl.value.clientWidth / 2)
  if (x.value > elsaMid + 5) elsaX.value += elsaSpeed.value
  if (x.value < elsaMid - 5) elsaX.value -= elsaSpeed.value
  if(elsaX.value < 0) {
    elsaX.value = 0
  } else if(elsaX.value > document.documentElement.clientWidth - elsaEl.value.clientWidth - 10) {
    elsaX.value = document.documentElement.clientWidth - elsaEl.value.clientWidth
  }

  if (ball.dx === 0) {
    ball.y += speed
  } else {
    ball.y -= speed
    ball.x += ball.dx
    if(ball.x < 0) { 
      ball.x = 0 
    } else if(ball.x > document.documentElement.clientWidth - ballEl.value.clientWidth) {
      ball.x = document.documentElement.clientWidth - ballEl.value.clientWidth
    }
  }
  const midBall = ball.x + (ballEl.value.clientWidth / 2)
  const yBall = ball.y + ballEl.value.clientHeight
  if(yBall > document.documentElement.clientHeight) {
    playing.value = false
  } else if(ball.y < 5) {
    ball.dx = 0
  } else if(
    yBall > elsaEl.value.getBoundingClientRect().y
    && midBall > elsaX.value
    && midBall < elsaX.value + elsaEl.value.clientWidth
  ) {
    speed += speedInc.value
    score.value++
    if(midBall < elsaMid) {
      ball.dx = Math.random() * speed - speed
    } else {
      ball.dx = Math.random() * speed
    }
    if(ball.x < 50) {
      ball.dx = 3
    } else if (ball.x > document.documentElement.clientWidth - ballEl.value.clientWidth - 50) {
      ball.dx = -3
    }
  }
}, 50)

function again() {
  playing.value = true
  score.value = 0
  ball.x = 0
  ball.y = 0
  ball.dx = 0
  elsaX.value = 0
  speed = 5
}
</script>

<template>
  <div v-if="playing">
    <h1>{{ score }}</h1>
    <img src="fotball.png" alt="Ball" class="ball" ref="ballEl">
    <img src="elsa.png" alt="Elsa" class="elsa" ref="elsaEl">
  </div>
  <Result v-else :score="score" @again="again" :level="props.level"/>
</template>

<style scoped>
.ball {
  width: 10vw;
  position: absolute;
  left: calc(v-bind('ball.x') * 1px);
  top: calc(v-bind('ball.y') * 1px);
}

.elsa {
  width: 20vw;
  position: absolute;
  bottom: 0;
  left: calc(v-bind(elsaX) * 1px);
}

h1 {
  text-align: center;
  position: absolute;
  width: 100vw;
  z-index: 2;
  top: 10px;
  left: 0;
  font-size: 3rem;
}
</style>