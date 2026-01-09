import React from 'react';
import { render } from '@testing-library/react-native';
import TranslationOutput from '../../src/components/TranslationOutput';

describe('TranslationOutput', () => {
  test('displays provided value', () => {
    const { getByText } = render(<TranslationOutput value="translated text" />);
    expect(getByText('translated text')).toBeTruthy();
  });

  test('displays placeholder when value is empty', () => {
    const { getByText } = render(<TranslationOutput value="" />);
    expect(getByText('Translation appears here')).toBeTruthy();
  });

  test('displays placeholder when value is null', () => {
    const { getByText } = render(<TranslationOutput value={null} />);
    expect(getByText('Translation appears here')).toBeTruthy();
  });

  test('output text is selectable', () => {
    const { getByText } = render(<TranslationOutput value="test text" />);
    const textElement = getByText('test text');
    expect(textElement.props.selectable).toBe(true);
  });
});
