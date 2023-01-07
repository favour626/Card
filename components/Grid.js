import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Tile } from './Tile';

const NUM_COLS = 4;
const NUM_ROWS = 4;

export const Grid = ({ objects, onTilePress }) => {
  const [revealedTiles, setRevealedTiles] = useState([]);

  const renderTile = (object, index) => {
    const row = Math.floor(index / NUM_COLS);
    const col = index % NUM_COLS;
    const isRevealed = revealedTiles.includes(index);

    return (
      <TouchableOpacity
        key={index}
        onPress={() => onTilePress(index)}
        style={[styles.tile, { top: row * Tile.SIZE, left: col * Tile.SIZE }]}
      >
        <Tile object={object} isRevealed={isRevealed} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {objects.map(renderTile)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tile: {
    position: 'absolute',
  },
});
