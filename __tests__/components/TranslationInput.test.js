import React from 'react';
import { render } from '@testing-library/react-native';
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
});
