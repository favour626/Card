import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { CardState } from "../utils/CardState";
import { color } from "../style/color";
import { addClick, addPoint, complete } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useMatchAnimation, useNoMatchAnimation } from "../utils/animationfunc";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import {
  backgroundColor,
  flippedCards,
  isCompleted,
  isInvisible,
  isMatched,
  isNotMatched,
  notMatchedCards,
} from "../utils/game";

const NO_MATCH_STEP_DURATION = 120;
const NO_MATCH_ANIMATION_DURATION = NO_MATCH_STEP_DURATION * 5;

const CardView = ({ card, cardSize, margin }) => {
  const { runMatchAnimation, matchAnimationStyle } = useMatchAnimation();
  runMatchAnimation.value = isMatched(card);

  const { runNoMatchAnimation, noMatchAnimationStyle } = useNoMatchAnimation();
  runNoMatchAnimation.value = isNotMatched(card);

  const offset = useSharedValue(0);

  const flip = useAnimatedStyle(() => {
    offset.value = 0;
    return {
      transform: [
        {
          scaleX: withSequence(
            withTiming(0.3, { duration: NO_MATCH_STEP_DURATION }),
            withTiming(-0.3, {
              duration: 30,
            }),
            withTiming(1, { duration: NO_MATCH_STEP_DURATION * 1.8 })
          ),
        },
      ],
    };
  });

  const { cards, clicks } = useSelector((state) => state.TileReducer);

  const dispatch = useDispatch();

  const [click, setClicks] = useState(clicks);
  const [Cards, setCards] = useState(cards);

  React.useEffect(() => {
    addPoint(Cards, dispatch);
  }, [Cards]);

  React.useEffect(() => {
    addClick(clicks + 1, dispatch);
  }, [click]);

  const onClick = (card, cards, click) => {
    if (card.cardState === CardState.Invisible) {
      const visibleCards = flippedCards(cards);

      if (visibleCards.length !== 2 && notMatchedCards(cards).length == 0) {
        offset.value = Math.random();
      }
      console.log("onClick() card", card.cardType);
      // if (!this.timer.isStarted) {
      //   this.timer.start()
      // }
      if (notMatchedCards(cards).length > 0) {
        // Ignore clicks while cards are not matched (ie red)
        return;
      }
      setClicks(click + 1);
        makeVisible(card.index);
        evaluateMatch(cards);

    } else {
      console.log("onClick() ignored");
    }
  };

  const makeVisible = (index) => {
    const change = [...cards];
    const tidy = change.find((card) => card.index === index);
    tidy.cardState = CardState.Visible;
    addPoint(change, dispatch);
  };

  const makeMatched = (index) => {
    const change = cards;
    const tidy = change.find((card) => card.index === index);
    tidy.cardState = CardState.Matched;
    addPoint(change, dispatch);
  };

  const hide = (index) => {
    const change = cards;
    const tidy = change.find((card) => card.index === index);
    tidy.cardState = CardState.NotMatched;
    setTimeout(() => {
      tidy.cardState = CardState.Invisible;
      addPoint(change, dispatch);
    }, NO_MATCH_ANIMATION_DURATION);
  };

  const evaluateMatch = (cards) => {
    const visibleCards = flippedCards(cards);
    if (visibleCards.length !== 2) {
      return;
    }
    if (visibleCards[0].cardType === visibleCards[1].cardType) {
      makeMatched(visibleCards[0].index);
      makeMatched(visibleCards[1].index);
      if (isCompleted(cards)) {
        // this.timer.stop();
        complete(dispatch);
      }
    } else {
      hide(visibleCards[0].index);
      hide(visibleCards[1].index);
    }
  };

  return (
    <Animated.View style={[matchAnimationStyle, noMatchAnimationStyle, flip]}>
      <Pressable
        style={[
          styles.container,
          {
            width: cardSize,
            height: cardSize,
            margin: margin,
            backgroundColor: backgroundColor(card),
          },
        ]}
        onPress={() => {
          onClick(card, cards, click);
        }}
      >
        {!isInvisible(card) && (
          <View style={styles.center}>
            <Icon name={card.cardType} size={30} color="#fff" />
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default CardView;

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
