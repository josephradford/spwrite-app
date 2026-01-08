import React from 'react';
import { render } from '@testing-library/react-native';
import CharacterCounter from '../../src/components/CharacterCounter';

describe('CharacterCounter', () => {
  test('displays current character count', () => {
    const { getByText } = render(<CharacterCounter current={150} max={5000} />);
    expect(getByText('150 / 5000')).toBeTruthy();
  });

  test('displays zero when current is 0', () => {
    const { getByText } = render(<CharacterCounter current={0} max={5000} />);
    expect(getByText('0 / 5000')).toBeTruthy();
  });

  test('applies warning style when approaching limit (>4500)', () => {
    const { getByText } = render(<CharacterCounter current={4600} max={5000} />);
    const text = getByText('4600 / 5000');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#FF9500' })
      ])
    );
  });

  test('applies error style when at or over limit', () => {
    const { getByText } = render(<CharacterCounter current={5000} max={5000} />);
    const text = getByText('5000 / 5000');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ color: '#FF3B30' })
      ])
    );
  });
});
