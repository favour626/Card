import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Animated } from "react-native";

const Board = () => {
  // State to store the cards
  const [cards, setCards] = useState([
    { id: "1", flip: false, match: false },
    { id: "2", flip: false, match: false },
    // Add more cards as needed
  ]);

  // State to store the currently flipped cards
  const [flippedCards, setFlippedCards] = useState([]);

  // Function to flip a card
  const flipCard = (card) => {
    // Update the state of the card to be flipped
    setCards((prevCards) => {
      return prevCards.map((c) => {
        if (c.id === card.id) {
          return { ...c, flip: !c.flip };
        }
        return c;
      });
    });

    // Add the flipped card to the list of flipped cards
    setFlippedCards((prevFlippedCards) => [...prevFlippedCards, card]);

    // If there are two flipped cards, check for a match
    if (flippedCards.length === 1) {
      checkMatch();
    }
  };

  // Function to check if two cards match
  const checkMatch = () => {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    // Update the state of the cards to be matched if they match, or flip them back over if they don't
    if (card1.id === card2.id) {
      setCards((prevCards) => {
        return prevCards.map((c) => {
          if (c.id === card1.id || c.id === card2.id) {
            return { ...c, flip: false, match: true };
          }
          return c;
        });
      });
    } else {
      setTimeout(() => {
        setCards((prevCards) => {
          return prevCards.map((c) => {
            if (c.id === card1.id || c.id === card2.id) {
              return { ...c, flip: false };
            }
            return c;
          });
        });
      }, 1000);
    }

    // Reset the list of flipped cards
    setFlippedCards([]);
  };

  // Render each card in the FlatList
  const renderCard = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => flipCard(item)}>
        <Animated.View
          style={[styles.card, item.flip ? styles.flipped : styles.unflipped]}
        >
          {item.flip ? (
            <Text style={styles.cardText}>{item.id}</Text>
          ) : (
            <Text style={styles.cardText}>?</Text>
          )}
        </Animated.View>
      </TouchableOpacity>
    );
  };
};
