import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DirectionToggle from '../components/DirectionToggle';
import TranslationInput from '../components/TranslationInput';
import TranslationOutput from '../components/TranslationOutput';
import translationService from '../services/TranslationService';

export default function TranslatorScreen() {
  const [direction, setDirection] = useState('to-speedwriting');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleToggleDirection = () => {
    setDirection(prev =>
      prev === 'to-speedwriting' ? 'to-english' : 'to-speedwriting'
    );
    setOutputText('');
  };

  const handleTranslate = () => {
    Keyboard.dismiss();

    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    const result = translationService.translatePhrase(inputText, direction);
    setOutputText(result);
  };

  const handleClear = () => {
    setInputText('');
    setOutputText('');
  };

  const placeholder = direction === 'to-speedwriting'
    ? 'Type English words...'
    : 'Type speedwriting...';

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={styles.title}>SPWrite</Text>
            </View>

            <DirectionToggle
              direction={direction}
              onToggle={handleToggleDirection}
            />

            <TranslationInput
              value={inputText}
              onChangeText={setInputText}
              placeholder={placeholder}
              onClear={handleClear}
            />

            <Pressable
              style={[styles.translateButton, !inputText.trim() && styles.buttonDisabled]}
              onPress={handleTranslate}
              disabled={!inputText.trim()}
            >
              <Text style={styles.translateButtonText}>Translate</Text>
            </Pressable>

            <TranslationOutput value={outputText} />
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  inner: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  translateButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#C7C7CC',
  },
  translateButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '600',
  },
});
