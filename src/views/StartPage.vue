<template>
  <div :class="$style.root">
    <HeaderText :class="[$style.logo, $style.bounce]"
                :value="T.Logo"/>
    <div :class="$style.start_panel">
      <GradientButton :class="$style.start_button"
                      :value="T.Start"
                      @click="start"/>
    </div>
    <div v-if="isMobileOrTablet"
         v-text="T.MobileOrTabletDisclaimer"
         :class="$style.mobile_panel"/>
    <BackgroundMusic src="/music/upinmyjam.mp3"/>
    <MusicButton :class="$style.music_button"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue';
import { useTextResources } from '@/resources';
import { BackgroundMusic, GradientButton, HeaderText, MusicButton } from '@/components';
import { injectStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'StartPage',
  components: {
    HeaderText,
    GradientButton,
    BackgroundMusic,
    MusicButton
  },
  setup () {
    const getIsMobileOrTabletBrowser = () => ([
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ].some(toMatchItem => navigator.userAgent.match(toMatchItem)));
    const isMobileOrTablet = getIsMobileOrTabletBrowser();
    const router = useRouter();
    const { isLoaded } = injectStore();

    onBeforeMount(() => {
      if (isLoaded.value)
        return;
      router.replace({
        name: 'Loading'
      });
    });

    const start = () => {
      router.replace({
        name: 'Game'
      });
    };

    return {
      isMobileOrTablet,
      start,
      ...useTextResources()
    };
  }
});
</script>

<style lang="scss" module>
.root {
  height: 100%;
  display: grid;
  grid-template: 1fr auto auto 1fr / 1fr auto 1fr;
  grid-gap: .8rem;
  background-color: #f6cc8a;
}

.logo {
  grid-row: 2;
  grid-column: 2;
}

.start_panel {
  grid-row: 3;
  grid-column: 2;
  width: auto;
  text-align: center;
}

.start_button {
  display: inline-block;
}

.music_button {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
}

.mobile_panel {
  grid-row: 4;
  grid-column: 2;
  width: auto;
  text-align: center;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 2rem;
}

.bounce {
  animation-name: bounce;
  animation-duration: 2.36s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  10% {
    transform: translateY(-24px);
  }

  20% {
    transform: translateY(0);
  }

  25% {
    transform: translateY(0);
  }

  35% {
    transform: translateY(-18px);
  }

  45% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(0);
  }

  60% {
    transform: translateY(-6px);
  }

  70% {
    transform: translateY(0);
  }

  75% {
    transform: translateY(0);
  }

  85% {
    transform: translateY(-12px);
  }

  95% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
