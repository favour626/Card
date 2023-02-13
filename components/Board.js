import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import CardView from "./CardView";

export function Board({ cards, type }) {
  const level = { 1: 4, 2: 6, 3: 0 };

  const COLUMN_COUNT = level[type];
  const GAP_SIZE = 16;

  function useCardSize() {
    const { width } = useWindowDimensions();
    const size = width;
    // We use COLUMN_COUNT + 1 because there is gap at the left and right of
    // each column, and at the lef and right of the whole board
    return {
      boardSize: size,
      cardSize: (size - GAP_SIZE * (COLUMN_COUNT + 1)) / COLUMN_COUNT,
    };
  };

  const { boardSize, cardSize } = useCardSize();

  return (
    <View
      style={[
        styles.containerPortrait,
        { width: boardSize, padding: GAP_SIZE / 2 },
      ]}
    >
      {cards.map((card, index) => (
        <CardView
          card={card}
          key={index}
          index={index}
          cardSize={cardSize}
          margin={GAP_SIZE / 2}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  containerPortrait: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
});
