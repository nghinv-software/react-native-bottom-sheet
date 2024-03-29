/**
 * Created by nghinv on Mon Jan 11 2021
 * Copyright (c) 2021 nghinv@lumi.biz
 */

import { Easing } from 'react-native-reanimated';

export const isNullOrUndefined = (content) => {
  if (content === undefined || content === null) return true;

  return false;
};

export const defaultTimingConfig = {
  duration: 350,
  easing: Easing.bezier(0.33, 0.01, 0, 1),
};

export const defaultSpringConfig = {
  stiffness: 1000,
  damping: 500,
  mass: 3,
  overshootClamping: true,
  restDisplacementThreshold: 0.01,
  restSpeedThreshold: 0.01,
};

export const snapPoint = (
  value,
  velocity,
  points,
) => {
  'worklet';

  const point = value + 0.2 * velocity;
  const deltas = points.map((p) => Math.abs(point - p));
  const minDelta = Math.min.apply(null, deltas);
  return points.filter((p) => Math.abs(point - p) === minDelta)[0];
};
