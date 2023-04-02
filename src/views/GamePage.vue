<template>
  <div :class="$style.root"
       @click="pageClick">
    <div ref="sceneDiv"
         :class="$style.scene"/>
    <div v-if="isSceneLoaded"
         v-text="dealerText"
         :class="$style.dealer_text"/>
    <div v-if="isSceneLoaded"
         v-text="userText"
         :class="$style.user_text"/>
    <div v-if="isSceneLoaded"
         :class="$style.button_panel">
      <div v-if="!isGameOver && !canClose"
           :class="$style.button_group">
        <GradientButton :value="T.Hit"
                        @click="hit()"/>
        <GradientButton :value="T.Stand"
                        @click="stand()"/>
      </div>
    </div>
    <div :class="$style.game_over_panel">
      <HeaderText :class="$style.game_over_text"
                  :style="{ opacity: gameOverText ? 1 : 0 }"
                  :value="gameOverText"/>
    </div>
    <BackgroundMusic src="/music/ramparts.mp3"/>
    <SoundEffects :effects="['shuffle', 'take']"/>
    <MusicButton :class="$style.music_button"/>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue';
import { ref, watch } from 'vue';
import { useTextResources } from '@/resources';
import { BackgroundMusic, GradientButton, HeaderText, MusicButton, SoundEffects } from '@/components';
import { CardActionType, useGame } from '@/game';
import { usePixi } from '@/pixi';
import { injectStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'GamePage',
  components: {
    HeaderText,
    GradientButton,
    BackgroundMusic,
    SoundEffects,
    MusicButton
  },
  setup () {
    const { isLoaded, addSoundEffect } = injectStore();
    const router = useRouter();
    const isSceneLoaded = ref(false);
    const sceneDiv = ref<HTMLDivElement | null>(null);
    const loadComplete = () => {
      isSceneLoaded.value = true;
    };
    const { processAction } = usePixi(sceneDiv, loadComplete);

    const {
      isGameOver,
      isUserWon,
      isSameScore,
      dealerScore,
      userScore,
      hit,
      stand,
      reset
    } = useGame(args => {
      switch (args.type) {
        case CardActionType.RESET:
          addSoundEffect('shuffle');
          break;
        case CardActionType.MOVE_FROM_DECK_TO_DEALER:
        case CardActionType.MOVE_FROM_DECK_TO_USER:
          addSoundEffect('take');
          break;
      }
      processAction(args);
    });

    watch(isSceneLoaded, () => {
      reset();
    });

    onBeforeMount(() => {
      if (isLoaded.value)
        return;
      router.replace({
        name: 'Loading'
      });
    });

    const canClose = ref(false);

    const pageClick = () => {
      if (!canClose.value)
        return;
      router.replace({
        name: 'Start'
      });
    };

    const { T } = useTextResources();

    const gameOverText = computed(() => {
      if (!isGameOver.value)
        return '';
      if (isSameScore.value)
        return T.value.Draw;

      return isUserWon.value
        ? T.value.Winner
        : T.value.Loser;
    });

    const dealerText = computed(() => T.value.Hand.Dealer.replace('{score}', `${dealerScore.value}`));
    const userText = computed(() => T.value.Hand.User.replace('{score}', `${userScore.value}`));

    watch(isGameOver, isGameOver => {
      if (!isGameOver)
        return;
      setTimeout(() => {
        canClose.value = true;
      }, 500); // закрывать можно через полсекунды после окончания игры
    });

    return {
      T,
      isSceneLoaded,
      sceneDiv,
      isGameOver,
      isUserWon,
      isSameScore,
      dealerScore,
      userScore,
      canClose,
      gameOverText,
      dealerText,
      userText,
      hit,
      stand,
      pageClick
    };
  }
});
</script>

<style lang="scss" module>
.root {
  height: 100%;
  display: grid;
  grid-template: 2rem 1fr 5rem 1fr 2rem / 2rem 1fr 1fr 1fr 2rem;
}

.scene {
  grid-row: 1 / 6;
  grid-column: 1 / 6;
  z-index: -1;
}

.dealer_text,
.user_text {
  grid-column: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

.dealer_text {
  grid-row: 2;
}

.user_text {
  grid-row: 4;
}

.button_panel {
  grid-row: 4;
  grid-column: 4;
  display: flex;
  justify-content: center;
}

.button_group {
  display: flex;
  flex-direction: column;
  gap: .8rem;
  width: fit-content;
  height: fit-content;
}

.game_over_panel {
  grid-row: 2 / 5;
  grid-column: 2 / 5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.game_over_text {
  opacity: 0;
  color: #ce9f54;
  text-shadow: .2rem .2rem .2rem rgba(0 0 0 / 60%);
  transition: opacity 3s ease;
}

.music_button {
  position: absolute;
  right: 2rem;
  bottom: 2rem;
}
</style>
