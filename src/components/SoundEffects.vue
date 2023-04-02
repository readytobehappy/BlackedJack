<template>
  <div ref="rootDiv"
       style="visibility: collapse">
    <audio v-for="effect in effects"
           :key="effect"
           :src="urlFromCache(`/music/${effect}.mp3`)"
           :data-key="effect"/>
  </div>
</template>

<script lang="ts">
import { injectStore } from '@/store';
import { defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
  name: 'SoundEffects',
  props: {
    effects: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  setup () {
    const { blobs, soundEffects, clearSoundEffects, isMusicDisabled } = injectStore();
    let audios: Record<string, HTMLAudioElement> | null = null;
    const play = (audio: HTMLAudioElement) => {
      audio.loop = false;
      audio.pause();
      audio.currentTime = 0;
      audio.play();
    };
    const urlFromCache = (url: string) => blobs.value[url];

    const rootDiv = ref<HTMLDivElement | null>(null);

    watch(soundEffects, soundEffects => {
      if (!soundEffects.length)
        return;

      if (!audios) {
        const cache: Record<string, HTMLAudioElement> = { };
        const elements = rootDiv.value
          ? Array.from(rootDiv.value.querySelectorAll('audio'))
          : [];
        for (const audio of elements) {
          const key = audio.getAttribute('data-key') ?? '';
          cache[key] = audio;
        }
        audios = cache;
      }

      let timeout = 0;
      if (!isMusicDisabled.value) {
        for (const soundEffect of soundEffects) {
          const audio = audios[soundEffect];
          if (!audio)
            continue;
          setTimeout((audio: HTMLAudioElement) => play(audio), timeout, audio);
          timeout += 500;
        }
      }
      clearSoundEffects();
    }, { deep: true });

    return {
      rootDiv,
      urlFromCache
    };
  }
});
</script>
