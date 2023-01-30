import AnimatedLottieView from "lottie-react-native";
import * as React from "react";
import Icon from "@expo/vector-icons/FontAwesome";
import {
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { color } from "../style/color";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

import { PanGestureHandler } from "react-native-gesture-handler";

/**
 * It immediately, automatically shows when rendered. Then you swipe up to close
 * it, which invokes `onClose`.
 */
export const WinOverlayTouch = ({ onClose }) => {
  const dispatch = useDispatch();

  const reset = () =>
    dispatch({
      type: RESET_GAME,
    });

  const { height: screenHeight } = useWindowDimensions();

  React.useEffect(() => { 
    // Automatically show overlay when it's rendered
    y.value = -731
    y.value = withSpring(0, { duration: 500, easing: Easing.out(Easing.exp) });
  }, [screenHeight]);

  const pressed = useSharedValue(false);
  const startingPosition = 0;
  const x = useSharedValue(startingPosition);
  const y = useSharedValue(startingPosition);

  const handleAnimationEnd = (finished) => {if (finished) { onClose() }
}
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      pressed.value = true;
    },

    onActive: (event, ctx) => {
      x.value = startingPosition + event.translationX;
      y.value = startingPosition + event.translationY;
      console.log(x.value, y.value)

    },

    onEnd: (event, ctx) => {
      pressed.value = false;
      x.value = withSpring(startingPosition);
      y.value = withSpring(startingPosition);
      if (y.value < -200) {
        y.value = withTiming(-731, {}, (finished) => runOnJS(handleAnimationEnd)(finished))
        };
      }
  });

  const ball = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  const balls = useAnimatedStyle(() => {
    return {
      backgroundColor: pressed.value ? "indigo" : "orange",
      transform: [{ scale: pressed.value ? 1.2 : 1 }],
    };
  });

  const { clicks } = useSelector((state) => state.TileReducer);

  const message = `With ${Math.floor(clicks / 2)} moves and seconds.`;

  return (
    <Animated.View style={[styles.main, ball, { height: screenHeight }]}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eb6e00",
          width: "75%",
          height: "65%",
          borderRadius: 20,
          paddingVertical: 20,
        }}
      >
        <View style={{ width: "75%", height: "65%", marginTop: 5 }}>
          <AnimatedLottieView
            source={require("../assets/meditation-skull.json")}
            autoPlay
            loop
          />
        </View>
        <Text style={styles.title}>Congrats! You Won!</Text>
        <Text style={styles.text}>{message}</Text>
        <Text style={styles.text}>Wooohooo!</Text>

        <PanGestureHandler onGestureEvent={eventHandler}>
          <Animated.View
            style={[styles.moveUp, balls, { backgroundColor: "orange" }]}
          >
              <Icon name="arrow-up" size={30} color="#fff" />
              <Text style={{ fontWeight: "700", color: "#86c4a" }}>
                Move up
              </Text>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#86c4a",
    fontWeight: "bold",
    fontSize: 22,
    marginBottom: 10,
  },
  text: {
    color: "#cebbc1",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  // TODO change button color when pressed
  button: {
    backgroundcolor: color.teal,
    paddingHorizontal: 25,
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: color.white,
    fontWeight: "bold",
    fontSize: 18,
  },
  moveUp: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    marginTop: 40,
    marginBottom: 10,
    elevation: 5,
  },
});
