import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { CardState } from "../utils/CardState";
import { addClick } from "../redux/actions";
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
  evaluateMatch,
  flippedCards,
  isInvisible,
  isMatched,
  isNotMatched,
  makeVisible,
  notMatchedCards,
} from "../utils/game";

const NO_MATCH_STEP_DURATION = 120;

const CardView = ({ card, cardSize, margin }) => {
  const { runMatchAnimation, matchAnimationStyle } = useMatchAnimation();
  runMatchAnimation.value = isMatched(card);

  const { runNoMatchAnimation, noMatchAnimationStyle } = useNoMatchAnimation();
  runNoMatchAnimation.value = isNotMatched(card);

 const offset = useSharedValue(false);

  const flip = useAnimatedStyle(() => {
    offset.value = false
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

  const check = (cards) => {
    const visibleCards = flippedCards(cards)
    if (visibleCards.length !== 2 && notMatchedCards(cards).length == 0) {
      return true
    }
    return false
  }

  const onClick = (card, cards, clicks) => {
   if (card.cardState === CardState.Invisible) {

     offset.value = check(cards)

     // if (!this.timer.isStarted) {
     //   this.timer.start()
     // }
     if (notMatchedCards(cards).length > 0) {
       // Ignore clicks while cards are not matched (ie red)
       return;
     }
     addClick(clicks + 1, dispatch);
     makeVisible(card.index, cards, dispatch);
     evaluateMatch(cards, dispatch);
   } else {
     null
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
          onClick(card, cards, clicks);
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
