import React from 'react'
import { StyleSheet, View } from 'react-native'
import  CardView  from './CardView'
import { GAP_SIZE, useCardSize } from '../style/sizes'

export function Board({ cards }) {
  const { boardSize, cardSize } = useCardSize()

  return (
    <View style={[styles.containerPortrait, { width: boardSize }]}>
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
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: GAP_SIZE / 2,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
})
