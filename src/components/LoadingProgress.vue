<template>
  <div :class="$style.root">
    <div :class="$style.outer"/>
    <div :class="$style.inner">
      <div :class="$style.indicator"
           :style="indicatorStyle"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingProgress',
  props: {
    value: {
      required: true,
      type: Number,
      validator: value => typeof value === 'number' && !isNaN(value)
    }
  },
  setup (props) {
    const indicatorStyle = computed(() => {
      const normalizedValue = Math.max(0.0, Math.min(props.value, 1.0));
      const percentValue = Math.round(100 * normalizedValue);
      return { width: `${percentValue}%` };
    });

    return {
      indicatorStyle
    };
  }
});
</script>

<style lang="scss" module>
.root {
  height: 2rem;
  display: grid;
  grid-template: .2rem 1fr .2rem / .2rem 1fr .2rem;
}

.outer {
  grid-row: 1 / 4;
  grid-column: 1 / 4;
  background: linear-gradient(90deg,
    rgb(241 209 152) 0%,
    rgb(249 228 195) 22%,
    rgb(211 164 92) 55%,
    rgb(183 134 60) 70%,
    rgb(231 185 113) 100%
  );
  border-radius: .5rem;
  box-shadow: .2rem .2rem .3rem 0 rgba(0 0 0 / 60%);
}

.inner {
  background-color: #ce9f54;
  grid-row: 2;
  grid-column: 2;
  border-radius: .3rem;
  box-shadow: .1rem .1rem .2rem 0 rgba(0 0 0 / 60%) inset, -.1rem -.1rem .2rem 0 rgba(0 0 0 / 60%) inset;
  display: grid;
  grid-template: .2rem 1fr .2rem / .2rem 1fr .2rem;
}

.indicator {
  grid-row: 2;
  grid-column: 2;
  background: linear-gradient(0deg,
    rgb(78 70 143) 0%,
    rgb(53 45 119) 30%,
    rgb(169 139 203) 70%,
    rgb(78 70 143) 100%,
    rgb(231 185 113) 100%
  );
  border-radius: .2rem;
  transition: width .3s ease;
}
</style>
