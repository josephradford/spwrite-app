import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TranslationInput from '../../src/components/TranslationInput';
import CharacterCounter from '../../src/components/CharacterCounter';

describe('TranslationInput', () => {
  test('renders TextInput with placeholder', () => {
    const { getByPlaceholderText } = render(
      <TranslationInput
        value=""
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
      />
    );
    expect(getByPlaceholderText('Type here...')).toBeTruthy();
  });

  test('displays current value', () => {
    const { getByDisplayValue } = render(
      <TranslationInput
        value="test input"
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
      />
    );
    expect(getByDisplayValue('test input')).toBeTruthy();
  });

  test('shows clear button when value is not empty', () => {
    const { getByText } = render(
      <TranslationInput
        value="test"
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
      />
    );
    expect(getByText('×')).toBeTruthy();
  });

  test('hides clear button when value is empty', () => {
    const { queryByText } = render(
      <TranslationInput
        value=""
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={() => {}}
      />
    );
    expect(queryByText('×')).toBeNull();
  });

  test('calls onClear when clear button pressed', () => {
    const mockClear = jest.fn();
    const { getByText } = render(
      <TranslationInput
        value="test"
        onChangeText={() => {}}
        placeholder="Type here..."
        onClear={mockClear}
      />
    );

    fireEvent.press(getByText('×'));
    expect(mockClear).toHaveBeenCalledTimes(1);
  });

  describe('keyboard dismiss functionality', () => {
    test('TextInput has returnKeyType="done"', () => {
      const { getByPlaceholderText } = render(
        <TranslationInput
          value=""
          onChangeText={() => {}}
          placeholder="Type here..."
          onClear={() => {}}
        />
      );
      const textInput = getByPlaceholderText('Type here...');
      expect(textInput.props.returnKeyType).toBe('done');
    });

    test('TextInput has blurOnSubmit enabled', () => {
      const { getByPlaceholderText } = render(
        <TranslationInput
          value=""
          onChangeText={() => {}}
          placeholder="Type here..."
          onClear={() => {}}
        />
      );
      const textInput = getByPlaceholderText('Type here...');
      expect(textInput.props.blurOnSubmit).toBe(true);
    });
  });

  describe('character limit functionality', () => {
    test('shows character counter when maxLength provided', () => {
      const { UNSAFE_getByType } = render(
        <TranslationInput
          value="hello"
          onChangeText={() => {}}
          placeholder="Type here..."
          onClear={() => {}}
          maxLength={5000}
        />
      );
      expect(UNSAFE_getByType(CharacterCounter)).toBeTruthy();
    });

    test('does not show character counter when maxLength not provided', () => {
      const { UNSAFE_queryByType } = render(
        <TranslationInput
          value="hello"
          onChangeText={() => {}}
          placeholder="Type here..."
          onClear={() => {}}
        />
      );
      expect(UNSAFE_queryByType(CharacterCounter)).toBeNull();
    });

    test('prevents typing beyond maxLength', () => {
      const mockChange = jest.fn();
      const longText = 'a'.repeat(5000);
      const { getByPlaceholderText } = render(
        <TranslationInput
          value={longText}
          onChangeText={mockChange}
          placeholder="Type here..."
          onClear={() => {}}
          maxLength={5000}
        />
      );

      const input = getByPlaceholderText('Type here...');
      expect(input.props.maxLength).toBe(5000);
    });
  });
});
