import React from "react";
import { View, StyleSheet } from "react-native";

export const Tile = ({ object, isRevealed }) => {
  return (
    <View
      style={[styles.container, isRevealed ? styles.revealed : styles.hidden]}
    >
      {isRevealed ? object : null}
    </View>
  );
};

Tile.SIZE = 100;

const styles = StyleSheet.create({
  container: {
    width: Tile.SIZE,
    height: Tile.SIZE,
    borderRadius: Tile.SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
  revealed: {
    backgroundColor: "#fff",
  },
  hidden: {
    backgroundColor: "#ddd",
  },
});
