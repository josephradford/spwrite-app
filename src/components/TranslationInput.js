import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import CharacterCounter from './CharacterCounter';

export default function TranslationInput({ value, onChangeText, placeholder, onClear, enableAutocorrect = false, maxLength }) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        autoCapitalize={enableAutocorrect ? "sentences" : "none"}
        autoCorrect={enableAutocorrect}
        returnKeyType="done"
        blurOnSubmit={true}
        maxLength={maxLength}
      />
      {value.length > 0 && (
        <Pressable style={styles.clearButton} onPress={onClear}>
          <Text style={styles.clearText}>×</Text>
        </Pressable>
      )}
      {maxLength && (
        <CharacterCounter current={value.length} max={maxLength} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    padding: 16,
    fontSize: 17,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  clearButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearText: {
    fontSize: 24,
    color: '#8E8E93',
  },
});
