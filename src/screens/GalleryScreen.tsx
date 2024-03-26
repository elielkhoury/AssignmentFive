// GalleryScreen.tsx
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
// import CameraRoll from '@react-native-community/cameraroll';
import PhotoItem from '../components/PhotoItem';

interface Photo {
  id: string;
  uri: string;
  title?: string;
  timestamp: string;
  location?: string;
}

const GalleryScreen = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);

  const fetchPhotos = async () => {
    // Permissions and fetching logic here (unchanged)
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const handleDeletePhoto = (id: string) => {
    setPhotos(currentPhotos => currentPhotos.filter(photo => photo.id !== id));
  };

  return (
    <View style={styles.container}>
      {photos.length > 0 ? (
        <FlatList
          data={photos}
          renderItem={({item}) => (
            <PhotoItem
              photo={item}
              onDelete={() => handleDeletePhoto(item.id)}
            />
          )}
          keyExtractor={item => item.id}
        />
      ) : (
        <Text>No photos found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GalleryScreen;
