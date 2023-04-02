import { Application } from 'pixi.js';
import { TIME_FUNCTIONS, TimeFunction, TimeFunctionKey } from './cubicBezierTimeFunction';

export type StartEndFunction = () => void;
export type ProgressFunction = (progress: number) => void;

interface Action {
  timeout: number;
  startTime?: number;
  timeFunction: TimeFunction;
  onStart?: StartEndFunction;
  onProgress?: ProgressFunction;
  onEnd?: StartEndFunction;
}

export { TimeFunctionKey };

export function createAnimationQueue () {
  const actions: Action[] = [];
  let application: Application | undefined;
  performance.now;

  const enqueue = (
    timeout: number,
    timeFunc: TimeFunctionKey,
    onStart?: StartEndFunction,
    onProgress?: ProgressFunction,
    onEnd?: StartEndFunction
  ) => {
    actions.push({
      timeout,
      timeFunction: TIME_FUNCTIONS[timeFunc],
      onStart,
      onProgress,
      onEnd
    });
  };

  const dispose = () => {
    application?.ticker.remove(tick);
    application = undefined;
  };

  const tick = () => {
    if (!application)
      return;

    const [action] = actions;
    if (!action)
      return;

    let identityTime = 0;
    if (!action.startTime) {
      // начальная временная точка
      action.startTime = performance.now();
      action.onStart?.();
    } else {
      const lastTime = performance.now();
      const measuredTime = (lastTime - action.startTime) / action.timeout;
      identityTime = Math.max(0, Math.min(measuredTime, 1));
    }

    const progress = action.timeFunction(identityTime);
    // промежуточная временная точка
    action.onProgress?.(progress);

    if (progress >= 1.0) {
      // конечная временная точка
      action.onEnd?.();
      actions.shift();
    }
  };

  const setApplication = (value: Application) => {
    application = value;
    application.ticker.add(tick);
  };

  return {
    enqueue,
    dispose,
    setApplication
  };
}
