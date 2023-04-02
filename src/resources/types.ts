import enUsResources from './en-US';
import ruRuResources from './ru-RU';

export type Locale = 'en-US' | 'ru-RU';
export type TextResources = typeof enUsResources & typeof ruRuResources;
