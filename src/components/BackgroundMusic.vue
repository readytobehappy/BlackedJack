<template>
  <audio ref="audio"
         :src="blobSrc"
         autoplay="true"/>
</template>

<script lang="ts">
import { injectStore } from '@/store';
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'BackgroundMusic',
  props: {
    src: {
      required: true,
      type: String,
      validator: value => typeof value === 'string' && !!value
    }
  },
  setup (props) {
    const { blobs, addAudioSource, removeAudioSource } = injectStore();
    const audio = ref<HTMLAudioElement | null>(null);

    onMounted(() => {
      audio.value && addAudioSource(audio.value);
    });

    onBeforeUnmount(() => {
      audio.value && removeAudioSource(audio.value);
    });

    const blobSrc = computed(() => blobs.value[props.src] ?? null);

    return {
      audio,
      blobSrc
    };
  }
});
</script>
