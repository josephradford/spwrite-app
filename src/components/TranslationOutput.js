import React from 'react';
import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function TranslationOutput({ value }) {
  const handleCopy = async () => {
    if (value) {
      await Clipboard.setStringAsync(value);
      Alert.alert('Copied!', 'Translation copied to clipboard');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.output}>
        <Text style={styles.text}>
          {value || 'Translation appears here'}
        </Text>
      </View>
      {value && (
        <Pressable style={styles.copyButton} onPress={handleCopy}>
          <Text style={styles.copyIcon}>📋</Text>
        </Pressable>
      )}
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
  copyButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    padding: 8,
  },
  copyIcon: {
    fontSize: 20,
  },
});
