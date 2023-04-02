<template>
  <div v-text="value"
       :class="$style.header"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'HeaderText',
  props: {
    value: {
      required: true,
      type: String
    }
  }
});
</script>

<style lang="scss" module>
  .header {
    font-family: 'Ruslan Display', cursive;
    font-size: 3rem;
    text-align: center;
  }
</style>
