import { computed, ComputedRef, ref, Ref } from 'vue';
import enUsResources from './en-US';
import ruRuResources from './ru-RU';
import { Locale, TextResources } from './types';

const textResources: Record<Locale, TextResources> = {
  'en-US': enUsResources,
  'ru-RU': ruRuResources
};

let locale: Ref<Locale>;
let T: ComputedRef<TextResources>;

export function useTextResources () {
  if (!locale) { // lazy init
    locale = ref<Locale>(window.navigator.language === 'ru-RU' ? 'ru-RU' : 'en-US');
    T = computed<TextResources>(() => textResources[locale.value]);
  }

  const setLocale = (value: Locale) => {
    locale.value = value;
  };

  return {
    T,
    setLocale
  };
}
