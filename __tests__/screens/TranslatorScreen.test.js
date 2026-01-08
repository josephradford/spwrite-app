import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Keyboard } from 'react-native';
import TranslatorScreen from '../../src/screens/TranslatorScreen';

// Mock Keyboard.dismiss
jest.spyOn(Keyboard, 'dismiss');

describe('TranslatorScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('keyboard dismiss functionality', () => {
    test('dismisses keyboard when Translate button pressed', () => {
      const { getByPlaceholderText, getByText } = render(<TranslatorScreen />);

      // Type some text to enable the Translate button
      const input = getByPlaceholderText('Type English words...');
      fireEvent.changeText(input, 'happy');

      // Press the Translate button
      const translateButton = getByText('Translate');
      fireEvent.press(translateButton);

      // Verify Keyboard.dismiss was called
      expect(Keyboard.dismiss).toHaveBeenCalledTimes(1);
    });

    test('dismisses keyboard when tapping outside input area', () => {
      const { UNSAFE_getByType } = render(<TranslatorScreen />);
      const TouchableWithoutFeedback = require('react-native').TouchableWithoutFeedback;

      // Find the TouchableWithoutFeedback wrapper
      const touchableArea = UNSAFE_getByType(TouchableWithoutFeedback);

      // Simulate press on the touchable area
      fireEvent.press(touchableArea);

      // Verify Keyboard.dismiss was called
      expect(Keyboard.dismiss).toHaveBeenCalledTimes(1);
    });
  });
});
