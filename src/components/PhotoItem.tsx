// PhotoItem.tsx
import React from 'react';
import {View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface PhotoItemProps {
  photo: {
    id: string;
    uri: string;
    title?: string;
    timestamp: string;
    location?: string;
  };
  onDelete: () => void;
}

const PhotoItem: React.FC<PhotoItemProps> = ({photo, onDelete}) => {
  return (
    <View style={styles.container}>
      <Image source={{uri: photo.uri}} style={styles.image} />
      <Text style={styles.text}>{photo.title || 'No Title'}</Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  text: {
    flex: 1,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 10,
  },
  deleteButtonText: {
    color: '#fff',
  },
});

export default PhotoItem;
