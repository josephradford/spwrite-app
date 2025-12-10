import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function DirectionToggle({ direction, onToggle }) {
  const isToSpeedwriting = direction === 'to-speedwriting';

  return (
    <Pressable style={styles.container} onPress={onToggle}>
      <Text style={styles.text}>
        {isToSpeedwriting ? 'English → Speedwriting' : 'Speedwriting → English'}
      </Text>
      <Text style={styles.swapIcon}>⇅</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
  },
  swapIcon: {
    fontSize: 20,
  },
});
