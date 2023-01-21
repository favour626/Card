import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { color } from '../style/color'
import React from 'react'


export function InfoModal({ onClose }) {
  return (
    <Modal animationType="slide">
      <View style={styles.modalContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.closePressable,
            {
              backgroundColor: pressed ? color.redLight : color.red,
            },
          ]}
          onPress={onClose}>
          <Text style={styles.closeText} accessibilityHint="Close">
            X
          </Text>
        </Pressable>
        <Text>Hi!</Text>
        <Text>You can find the source code on GitHub: favour626</Text>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    padding: 40,
    backgroundColor: color.blue,
  },
  closePressable: {
    backgroundColor: color.red,
    alignSelf: 'flex-end',
    width: 50,
    height: 50,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 20,
  },
})
