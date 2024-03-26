import React from 'react';
import {render} from '@testing-library/react-native';
import FadeInImage from '/Users/elieelkhoury/Desktop/Eurisko/AssignmentFive/src/components/FadeInImage';

describe('FadeInImage', () => {
  it('renders correctly', () => {
    const uri = 'https://image.jpg';
    const {getByTestId} = render(
      <FadeInImage uri={uri} testID="fade-in-image" />,
    );

    const image = getByTestId('fade-in-image');
    expect(image.props.source.uri).toBe(uri);
  });
});
