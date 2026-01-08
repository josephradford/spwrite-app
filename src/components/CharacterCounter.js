import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function CharacterCounter({ current, max }) {
  const percentage = (current / max) * 100;

  let textStyle = styles.normal;
  if (current >= max) {
    textStyle = styles.error;
  } else if (percentage > 90) {
    textStyle = styles.warning;
  }

  return (
    <Text style={[styles.counter, textStyle]}>
      {current} / {max}
    </Text>
  );
}

const styles = StyleSheet.create({
  counter: {
    fontSize: 12,
    textAlign: 'right',
    marginTop: 4,
  },
  normal: {
    color: '#8E8E93',
  },
  warning: {
    color: '#FF9500',
  },
  error: {
    color: '#FF3B30',
  },
});
