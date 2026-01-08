import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { Keyboard } from 'react-native';
import TranslatorScreen from '../../src/screens/TranslatorScreen';

// Mock Keyboard.dismiss
jest.spyOn(Keyboard, 'dismiss');

describe('TranslatorScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('keyboard dismiss functionality', () => {
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

  describe('real-time translation', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('translates automatically after debounce delay', () => {
      const { getByPlaceholderText, getByText } = render(<TranslatorScreen />);

      const input = getByPlaceholderText('Type English words...');
      fireEvent.changeText(input, 'happy');

      // Should not translate immediately
      expect(() => getByText('hpy')).toThrow();

      // Fast-forward time past debounce
      act(() => {
        jest.advanceTimersByTime(300);
      });

      // Should now show translation
      expect(getByText('hpy')).toBeTruthy();
    });

    test('debounce resets when user continues typing', () => {
      const { getByPlaceholderText, queryByText } = render(<TranslatorScreen />);

      const input = getByPlaceholderText('Type English words...');
      fireEvent.changeText(input, 'h');

      act(() => {
        jest.advanceTimersByTime(100);
      });
      fireEvent.changeText(input, 'ha');

      act(() => {
        jest.advanceTimersByTime(100);
      });
      fireEvent.changeText(input, 'hap');

      // Should not have translated yet (debounce keeps resetting)
      expect(queryByText('hpy')).toBeNull();

      // Fast-forward full debounce time
      act(() => {
        jest.advanceTimersByTime(300);
      });

      // Now should show partial match or original
      expect(input.props.value).toBe('hap');
    });

    test('clears translation when input is cleared', () => {
      const { getByPlaceholderText, getByText, queryByText } = render(<TranslatorScreen />);

      const input = getByPlaceholderText('Type English words...');
      fireEvent.changeText(input, 'happy');
      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(getByText('hpy')).toBeTruthy();

      // Clear input
      fireEvent.changeText(input, '');
      act(() => {
        jest.advanceTimersByTime(300);
      });

      // Translation should be cleared
      expect(queryByText('hpy')).toBeNull();
    });

    test('does not show Translate button', () => {
      const { queryByText } = render(<TranslatorScreen />);
      expect(queryByText('Translate')).toBeNull();
    });
  });
});
