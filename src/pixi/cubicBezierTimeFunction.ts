import bezierFunction from 'bezier-easing';

export type TimeFunction = ReturnType<typeof bezierFunction>;

export enum TimeFunctionKey {
  LINEAR = 'linear',
  EASE = 'ease',
  EASEIN = 'easeIn',
  EASEOUT = 'easeOut',
  EASEINOUT = 'easeInOut'
}

export const TIME_FUNCTIONS: Record<TimeFunctionKey, TimeFunction> = {
  [TimeFunctionKey.LINEAR]: bezierFunction(0.0, 0.0, 1.0, 1.0),
  [TimeFunctionKey.EASE]: bezierFunction(0.25, 0.1, 0.25, 1.0),
  [TimeFunctionKey.EASEIN]: bezierFunction(0.42, 0.0, 1.0, 1.0),
  [TimeFunctionKey.EASEOUT]: bezierFunction(0.0, 0.0, 0.58, 1.0),
  [TimeFunctionKey.EASEINOUT]: bezierFunction(0.42, 0.0, 0.58, 1.0)
};
