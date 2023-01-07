import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Grid } from "../components/Grid";

const NUM_OBJECTS = 8;

const GameScreen = ({ navigation }) => {
  const [objects, setObjects] = useState([]);
  const [revealedTiles, setRevealedTiles] = useState([]);
  const [selectedTile, setSelectedTile] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setObjects(generateObjects());
    setRevealedTiles([]);
    setSelectedTile(null);
    setScore(0);
  };

  const generateObjects = () => {
    const objects = [];
    for (let i = 0; i < NUM_OBJECTS; i++) {
      objects.push(i);
      objects.push(i);
    }
    return shuffle(objects);
  };

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleTilePress = (index) => {
    if (revealedTiles.includes(index)) {
      return;
    }
    if (selectedTile === null) {
      setSelectedTile(index);
      setRevealedTiles([...revealedTiles, index]);
    } else {
      setRevealedTiles([...revealedTiles, index]);
      if (objects[selectedTile] === objects[index]) {
        setScore(score + 1);
        setSelectedTile(null);
        if (score + 1 === NUM_OBJECTS) {
          alert("You won!");
          resetGame();
        }
      } else {
        setTimeout(() => {
          setRevealedTiles(
            revealedTiles.filter(
              (tile) => tile !== index && tile !== selectedTile
            )
          );
          setSelectedTile(null);
        }, 1000);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>Score: {score}</Text>
      <Grid objects={objects} onTilePress={handleTilePress} />
      <Button title="Reset" onPress={resetGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default GameScreen;
