import React, { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { CardState } from "../utils/CardState";
import { color } from "../style/color";
import {
  COMPLETED,
  UPDATE_CARD_STATE,
  UPDATE_CLICK_STATE,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useMatchAnimation, useNoMatchAnimation } from "../utils/animationfunc";
import Animated from "react-native-reanimated";

const BACKGROUND_COLOR_INVISIBLE = color.dark;
const BACKGROUND_COLOR_VISIBLE = color.blue;
const BACKGROUND_COLOR_MATCHED = color.teal;
const BACKGROUND_COLOR_NOT_MATCHED = color.red;

const NO_MATCH_STEP_DURATION = 120;
const NO_MATCH_ANIMATION_DURATION = NO_MATCH_STEP_DURATION * 5;

const CardView = ({ card, cardSize, margin }) => {
  const { runMatchAnimation, matchAnimationStyle } = useMatchAnimation();
  runMatchAnimation.value = isMatched(card);

  const { runNoMatchAnimation, noMatchAnimationStyle } = useNoMatchAnimation();
  runNoMatchAnimation.value = isNotMatched(card);

  const { cards, clicks } = useSelector((state) => state.TileReducer);
  const dispatch = useDispatch();

  // add point for player 1, redo later
  const addPoint = (cards) =>
    dispatch({
      type: UPDATE_CARD_STATE,
      payload: {
        cards: cards,
      },
    });

  const addClick = (clicks) =>
    dispatch({
      type: UPDATE_CLICK_STATE,
      payload: {
        clicks: clicks,
      },
    });

  const complete = () =>
    dispatch({
      type: COMPLETED,
    });

  const [click, setClicks] = useState(clicks);
  const [Cards, setCards] = useState(cards);

  React.useEffect(() => {
    addPoint(Cards);
  }, [Cards]);

  React.useEffect(() => {
    addClick(clicks + 1);
  }, [click]);

  const onClick = () => {
    if (card.cardState === CardState.Invisible) {
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
      evaluateMatch();
    } else {
      console.log("onClick() ignored");
    }
  };

  const makeVisible = (index) => {
    const change = [...cards];
    const tidy = change.find((card) => card.index === index);
    tidy.cardState = CardState.Visible;
    setCards(change);
  };

  const makeMatched = (index) => {
    const change = cards;
    const tidy = change.find((card) => card.index === index);
    tidy.cardState = CardState.Matched;
    setCards(change);
  };

  const hide = (index) => {
    const change = cards;
    const tidy = change.find((card) => card.index === index);
    tidy.cardState = CardState.NotMatched;
    setTimeout(() => {
      tidy.cardState = CardState.Invisible;
      console.log("hide");
      setCards(change);
    }, NO_MATCH_ANIMATION_DURATION);
  };

  const isInvisible = (card) => {
    return card.cardState === CardState.Invisible;
  };
  const isVisible = (card) => {
    return card.cardState === CardState.Visible;
  };
  function isMatched(card) {
    return card.cardState === CardState.Matched;
  }
  function isNotMatched(card) {
    return card.cardState === CardState.NotMatched;
  }
  const backgroundColor = () => {
    switch (card.cardState) {
      case CardState.Invisible:
        return BACKGROUND_COLOR_INVISIBLE;
      case CardState.Visible:
        return BACKGROUND_COLOR_VISIBLE;
      case CardState.Matched:
        return BACKGROUND_COLOR_MATCHED;
      case CardState.NotMatched:
        return BACKGROUND_COLOR_NOT_MATCHED;
    }
  };

  const evaluateMatch = () => {
    const visibleCards = flippedCards(cards);
    if (visibleCards.length !== 2) {
      return;
    }
    if (visibleCards[0].cardType === visibleCards[1].cardType) {
      makeMatched(visibleCards[0].index);
      makeMatched(visibleCards[1].index);
      if (isCompleted(cards)) {
        // this.timer.stop();
        complete();
      }
    } else {
      hide(visibleCards[0].index);
      hide(visibleCards[1].index);
    }
  };

  const isCompleted = (cards) => {
    return cards.every((card) => isMatched(card));
  };

  const notMatchedCards = (cards) => {
    return cards.filter((card) => isNotMatched(card));
  };

  const flippedCards = (cards) => {
    return cards.filter((card) => isVisible(card));
  };

  return (
    <Animated.View style={[matchAnimationStyle, noMatchAnimationStyle]}>
      <Pressable
        style={[
          styles.container,
          {
            width: cardSize,
            height: cardSize,
            margin: margin,
            backgroundColor: backgroundColor(),
          },
        ]}
        onPress={() => {
          onClick();
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
