import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const Counter: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <View style={styles.container}>
      <Text testID="count">{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Counter;
