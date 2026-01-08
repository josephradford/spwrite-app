import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import TranslationInput from '../../src/components/TranslationInput';

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
});
