import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import DirectionToggle from '../components/DirectionToggle';
import TranslationInput from '../components/TranslationInput';
import TranslationOutput from '../components/TranslationOutput';
import translationService from '../services/TranslationService';

const DEBOUNCE_DELAY = 300; // ms
const MAX_CHARACTERS = 5000;

export default function TranslatorScreen() {
  const [direction, setDirection] = useState('to-speedwriting');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const debounceTimer = useRef(null);

  // Real-time translation with debouncing
  useEffect(() => {
    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      if (!inputText.trim()) {
        setOutputText('');
        return;
      }

      const result = translationService.translatePhrase(inputText, direction);
      setOutputText(result);
    }, DEBOUNCE_DELAY);

    // Cleanup on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [inputText, direction]);

  const handleToggleDirection = () => {
    setDirection(prev =>
      prev === 'to-speedwriting' ? 'to-english' : 'to-speedwriting'
    );
    setOutputText('');
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
              enableAutocorrect={direction === 'to-speedwriting'}
              maxLength={MAX_CHARACTERS}
            />

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
});
