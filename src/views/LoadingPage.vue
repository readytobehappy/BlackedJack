<template>
  <div :class="$style.loading_panel">
    <template v-if="!isLoaded">
      <LoadingProgress :class="$style.progress"
                       :value="loadingProgress"/>
      <span v-text="T.Loading"
            :class="[$style.text, $style.bounce]"/>
    </template>
    <GradientButton v-else
                    :class="$style.go"
                    :value="T.Go"
                    @click="go"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import { useTextResources } from '@/resources';
import { GradientButton, LoadingProgress } from '@/components';
import { injectStore } from '@/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoadingPage',
  components: {
    LoadingProgress,
    GradientButton
  },
  setup () {
    const { isLoaded, loadGameData, loadingProgress } = injectStore();
    const router = useRouter();

    const startLoading = () => {
      if (isLoaded.value)
        return;
      loadGameData();
    };

    const go = () => {
      router.replace({
        name: 'Start'
      });
    };

    onMounted(startLoading);

    return {
      loadingProgress,
      isLoaded,
      go,
      ...useTextResources()
    };
  }
});
</script>

<style lang="scss" module>
.loading_panel {
  height: 100%;
  display: grid;
  grid-template: 1fr auto auto 1fr / 1fr 1fr 1fr;
  background-color: #f6cc8a;
}

.progress {
  grid-row: 2;
  grid-column: 2;
  width: 100%;
  margin-bottom: 1rem;
}

.text {
  color: #58401B;
  grid-row: 3;
  grid-column: 2;
  text-align: center;
  font-family: 'Ruslan Display', cursive;
  font-size: 1.4rem;
}

.go {
  grid-row: 2 / 4;
  grid-column: 2;
  justify-self: center;
}

.bounce {
  animation-name: bounce;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
}

@keyframes bounce {
  0% {
    transform: translateY(0);
  }

  40% {
    transform: translateY(-10px);
  }

  80% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(0);
  }
}
</style>
