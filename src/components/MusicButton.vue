<template>
  <svg version="1.1"
       xmlns="http://www.w3.org/2000/svg"
       viewBox="0 0 100 100"
       :class="$style.button"
       @click.stop="toggleMusic">
    <defs>
      <linearGradient id="linear-gradient">
        <stop offset="0%" stop-color="rgb(241,209,152)"/>
        <stop offset="22%" stop-color="rgb(249,228,195)"/>
        <stop offset="55%" stop-color="rgb(211,164,92)"/>
        <stop offset="70%" stop-color="rgb(183,134,60)"/>
        <stop offset="100%" stop-color="rgb(231,185,113)"/>
      </linearGradient>
    </defs>
    <g fill="url(#linear-gradient)">
      <!-- eslint-disable-next-line max-len -->
      <path d="m93.161 0.071c-33.501-1.114-60.941 11.243-60.941 11.243l-0.02 62.709c-3.411-1.354-7.559-1.675-11.772-0.651-9.083 2.207-15.031 9.82-13.285 17.007s10.524 11.225 19.606 9.019c8.564-2.081 14.338-8.969 13.507-15.772v-46.855s19.404-6.784 44.573-8.485v34.849c-3.374-1.292-7.443-1.585-11.579-0.58-9.083 2.206-15.031 9.819-13.285 17.007 1.745 7.187 10.523 11.224 19.606 9.018 7.931-1.927 13.471-7.977 13.587-14.264l0.003 0.004v-74.249z"/>
      <path v-if="isMusicDisabled"
            d="M7,10L96,99L99,96L10,7z"/>
    </g>
  </svg>
</template>

<script lang="ts">
import { injectStore } from '@/store';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MusicButton',
  setup () {
    const { toggleMusic, isMusicDisabled } = injectStore();

    return {
      toggleMusic,
      isMusicDisabled
    };
  }
});
</script>

<style lang="scss" module>
.button {
  cursor: pointer;
  width: 4rem;
  height: 4rem;
  filter: drop-shadow(.2rem .2rem .2rem rgba(0 0 0 / 60%));
  transition: transform .3s ease;
}

.button:hover {
  transform: scale(1.2);
}
</style>
