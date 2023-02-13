import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import React from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from "react-native-reanimated";
import {
  RESET_GAME,
  RESET_GAME_MEDIUM,
  UPDATE_VISIBLE_STATE,
} from "../redux/actions";
import { useDispatch } from "react-redux";

const Option = () => {

  const { height: screenHeight } = useWindowDimensions();
  const startingPosition = 0;

  const x = useSharedValue(startingPosition);

  const easy = useSharedValue(startingPosition);
  const hard = useSharedValue(startingPosition);

  React.useEffect(() => {
    // Automatically show overlay when it's rendered
    x.value = -731;
    easy.value = 431;
    hard.value = 431;
    x.value = withSpring(0, {
      duration: 400,
      easing: Easing.out(Easing.exp),
    });
    easy.value = withDelay(
      700,
      withSpring(0, {
        duration: 100,
        easing: Easing.out(Easing.exp),
      })
    );

    hard.value = withDelay(
      1300,
      withSpring(0, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      })
    );
  }, [screenHeight]);

  const goAway = () => {
    hard.value = withDelay(
      300,
      withSpring(831, {
        duration: 100,
        easing: Easing.out(Easing.exp),
      })
    );

    easy.value = withDelay(
      1000,
      withSpring(831, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      })
    );
    x.value = withDelay(
      1300,
      withSpring(-431, {
        duration: 400,
        easing: Easing.out(Easing.exp),
      })
    );
  };

  const container = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  const option = (lim) =>
    useAnimatedStyle(() => {
      return {
        transform: [{ translateX: lim.value }],
      };
    });

  return (
    <Animated.View style={[styles.main, container]}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#eb6e00",
          width: "75%",
          borderRadius: 20,
          paddingVertical: 20,
        }}
      >
        <Animated.View style={[option(easy)]}>
          <Button name={"Easy"} id={1} goAway={goAway()} />
        </Animated.View>
        <Animated.View style={[option(hard)]}>
          <Button name={"Hard"} id={2} goAway={goAway()} />
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const Button = ({ name, id, goAway }) => {
  const dispatch = useDispatch();
  const reset = () =>
    dispatch({
      type: RESET_GAME,
    });

  const reset_medium = () =>
    dispatch({
      type: RESET_GAME_MEDIUM,
    });

  const setVisible = () =>
    dispatch({
      type: UPDATE_VISIBLE_STATE,
    });

  const Reset = (id) => {
    if (id == 1) {
      reset();
      setTimeout(() => {
        setVisible();
      }, 3000);
    } else if (id == 2) {
      reset_medium();
      setTimeout(() => {
        setVisible();
      }, 3000);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => {
        Reset(id);
        goAway;
      }}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{name}</Text>
      </View>
      <View style={styles.button1}></View>
    </TouchableOpacity>
  );
};

export default Option;

const styles = StyleSheet.create({
  main: {
    zIndex: 1,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    marginVertical: 10,
    backgroundColor: "black",
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    paddingVertical: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
  },
  button1: {
    backgroundColor: "blue",
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    width: 190,
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    zIndex: -1,
    position: "absolute",
    right: "0.5%",
    bottom: "4%",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    fontWeight: "700",
  },
});
