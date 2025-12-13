import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DirectionToggle from '../../src/components/DirectionToggle';

describe('DirectionToggle', () => {
  test('renders "English → Speedwriting" when direction is to-speedwriting', () => {
    const { getByText } = render(
      <DirectionToggle direction="to-speedwriting" onToggle={() => {}} />
    );
    expect(getByText('English → Speedwriting')).toBeTruthy();
  });

  test('renders "Speedwriting → English" when direction is to-english', () => {
    const { getByText } = render(
      <DirectionToggle direction="to-english" onToggle={() => {}} />
    );
    expect(getByText('Speedwriting → English')).toBeTruthy();
  });

  test('calls onToggle when pressed', () => {
    const mockToggle = jest.fn();
    const { getByText } = render(
      <DirectionToggle direction="to-speedwriting" onToggle={mockToggle} />
    );

    fireEvent.press(getByText('English → Speedwriting'));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});
