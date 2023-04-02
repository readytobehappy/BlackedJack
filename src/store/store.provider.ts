import { computed, inject, InjectionKey, provide, readonly, ref, shallowRef, watch } from 'vue';
import { AnimatedGIF } from '@pixi/gif';
import { loadResources } from './loadResources';

const GIF_TEXTURE_URL = '/img/cardtexture.gif';

type StoreState = ReturnType<typeof provideStore>;
const stateKey: InjectionKey<StoreState> = Symbol('store-state');

export function provideStore () {
  const loadingProgress = ref(0);
  const blobs = shallowRef<Record<string, string>>({
    '/music/ramparts.mp3': '',
    '/music/upinmyjam.mp3': '',
    '/music/shuffle.mp3': '',
    '/music/take.mp3': '',
    '/img/bgtexture.jpg': '',
    '/img/cards.svg': ''
  });
  const setBlobs = (value: Record<string, string>) => {
    blobs.value = value;
  };
  const deckSprite = shallowRef<AnimatedGIF | null>(null);
  const isMusicDisabled = ref(Boolean(+(window.localStorage.getItem('isMusicDisabled') ?? '0')));
  const audioSources: HTMLAudioElement[] = [];
  const soundEffects = ref<string[]>([]);
  const refreshAudioSources = () => {
    audioSources.forEach(audio => {
      if (isMusicDisabled.value)
        audio.pause();
      else
        audio.play();
    });
  };

  watch(isMusicDisabled, isMusicDisabled => {
    window.localStorage.setItem('isMusicDisabled', isMusicDisabled ? '1' : '0');
    refreshAudioSources();
  });

  const isLoaded = computed(() => loadingProgress.value >= 1);

  const addAudioSource = (value: HTMLAudioElement) => {
    audioSources.push(value);
    refreshAudioSources();
  };

  const removeAudioSource = (value: HTMLAudioElement) => {
    const index = audioSources.indexOf(value);
    if (index >= 0)
      audioSources.splice(index, 1);
  };

  const addSoundEffect = (value: string) => {
    soundEffects.value.push(value);
  };

  const clearSoundEffects = () => {
    soundEffects.value = [];
  };

  const loadGameData = () => {
    const loadingUrls = Object.keys(blobs.value);
    loadResources(loadingUrls,
      progress => {
        loadingProgress.value = progress;
      },
      async blobValues => {
        blobs.value = blobValues;
        const data = await fetch(GIF_TEXTURE_URL);
        const buffer = await data.arrayBuffer();
        const image = await AnimatedGIF.fromBuffer(buffer);
        deckSprite.value = image;
      });
  };

  const toggleMusic = () => {
    isMusicDisabled.value = !isMusicDisabled.value;
  };

  const state = {
    loadingProgress,
    blobs: readonly(blobs),
    setBlobs,
    deckSprite,
    isLoaded,
    isMusicDisabled: readonly(isMusicDisabled),
    addAudioSource,
    removeAudioSource,
    soundEffects,
    addSoundEffect,
    clearSoundEffects,
    loadGameData,
    toggleMusic
  };

  provide(stateKey, state);
  return state;
}

export function injectStore () {
  const state = inject(stateKey) as StoreState;
  if (!state)
    /* eslint-disable no-console */
    console.error('Компонент можно использовать только внутри компонента с provideStore()');

  return state;
}
