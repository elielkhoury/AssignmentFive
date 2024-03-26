import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Image, ImageProps} from 'react-native';

interface FadeInImageProps extends ImageProps {
  uri: string;
  testID?: string;
}

const FadeInImage: React.FC<FadeInImageProps> = ({uri, testID, ...props}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View
      style={{...styles.container, opacity: fadeAnim}}
      testID={testID}>
      <Image source={{uri}} style={styles.image} {...props} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
  },
});

export default FadeInImage;
