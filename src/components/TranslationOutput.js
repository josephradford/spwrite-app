import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TranslationOutput({ value }) {
  return (
    <View style={styles.container}>
      <View style={styles.output}>
        <Text style={styles.text} selectable={true}>
          {value || 'Translation appears here'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
  },
  output: {
    backgroundColor: '#E5E5EA',
    borderRadius: 12,
    padding: 16,
    minHeight: 120,
  },
  text: {
    fontSize: 17,
    color: '#000',
  },
});
