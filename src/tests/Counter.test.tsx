// Counter.test.tsx
import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import Counter from '/Users/elieelkhoury/Desktop/Eurisko/AssignmentFive/src/components/Counter';

describe('Counter', () => {
  it('increments count on button press', () => {
    const {getByText, getByTestId} = render(<Counter />);

    const incrementButton = getByText('Increment');
    const countText = getByTestId('count');

    expect(countText.props.children).toBe(0);

    fireEvent.press(incrementButton);

    expect(countText.props.children).toBe(1);
  });
});
