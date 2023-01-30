import {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const MATCH_STEP_DURATION = 180;
const NO_MATCH_STEP_DURATION = 120;


export function useMatchAnimation() {
  const runMatchAnimation = useSharedValue(false);
  const matchAnimationStyle = useAnimatedStyle(() => {
    // Code here runs on the UI thread, so it will be synchronous
    if (!runMatchAnimation.value) {
      return {
        transform: [{ scaleX: 1 }, { scaleY: 1 }],
      };
    }
    return {
      transform: [
        {
          scaleX: withSequence(
            withTiming(1.4, { duration: MATCH_STEP_DURATION }),
            withRepeat(
              withTiming(-1.4, {
                duration: NO_MATCH_STEP_DURATION,
              }),
              3,
              true
            ),
            withTiming(1, { duration: MATCH_STEP_DURATION * 1.8 })
          ),
        },
        {
          scaleY: withSequence(
            withTiming(0.6, { duration: MATCH_STEP_DURATION }),
            withTiming(2, { duration: MATCH_STEP_DURATION * 1.2 }),
            withTiming(0.8, { duration: MATCH_STEP_DURATION * 1.4 }),
            withTiming(1.1, { duration: MATCH_STEP_DURATION * 1.6 }),
            withTiming(1, { duration: MATCH_STEP_DURATION * 1.8 })
          ),
        },
      ],
    };
  });
  return { runMatchAnimation, matchAnimationStyle };
}

export function useNoMatchAnimation() {
  const runNoMatchAnimation = useSharedValue(false);
  const noMatchAnimationStyle = useAnimatedStyle(() => {
    if (!runNoMatchAnimation.value) {
      return {
        transform: [{ translateX: 0 }, { rotateZ: "0deg" }],
      };
    }
    return {
      transform: [
        {
          translateX: withSequence(
            withTiming(10, { duration: NO_MATCH_STEP_DURATION }),
            withRepeat(
              withTiming(-10, {
                duration: NO_MATCH_STEP_DURATION,
              }),
              3,
              true
            ),
            withTiming(0, { duration: NO_MATCH_STEP_DURATION })
          ),
        },
        {
          rotateZ: withSequence(
            withTiming("6deg", { duration: NO_MATCH_STEP_DURATION }),
            withRepeat(
              withTiming(`${[-12, 12]}deg`, {
                duration: NO_MATCH_STEP_DURATION,
              }),
              3,
              true
            ),
            withTiming("0deg", { duration: NO_MATCH_STEP_DURATION })
          ),
        },
      ],
    };
  });
  return { runNoMatchAnimation, noMatchAnimationStyle };
}
