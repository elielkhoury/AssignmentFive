import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import {Swipeable, GestureHandlerRootView} from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photosString = await AsyncStorage.getItem('photos');
        const photos = photosString ? JSON.parse(photosString) : [];
        setPhotos(photos);
      } catch (error) {
        console.error('Error fetching photos from local storage:', error);
      }
    };
    fetchPhotos();
  }, []);

  const handleDeletePhoto = async (id: string) => {
    const updatedPhotos = photos.filter(photo => photo.id !== id);
    setPhotos(updatedPhotos);
    await AsyncStorage.setItem('photos', JSON.stringify(updatedPhotos));
  };

  const renderPhotoItem = ({item}: {item: Photo}) => {
    const rightSwipeActions = () => (
      <View
        style={{
          flex: 1,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: 20,
        }}>
        <Text style={{color: 'white', fontWeight: '600'}}>Delete</Text>
      </View>
    );

    const handleLongPress = () => {
      Alert.alert('Photo Details', `Timestamp: ${item.timestamp}`);
    };

    return (
      <Swipeable
        renderRightActions={rightSwipeActions}
        onSwipeableRightOpen={() => handleDeletePhoto(item.id)}>
        <TouchableWithoutFeedback onLongPress={handleLongPress}>
          <View>
            <PhotoItem
              photo={item}
              onDelete={() => handleDeletePhoto(item.id)}
            />
          </View>
        </TouchableWithoutFeedback>
      </Swipeable>
    );
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        {photos.length > 0 ? (
          <FlatList
            data={photos}
            renderItem={renderPhotoItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <Text>No photos found</Text>
        )}
      </View>
    </GestureHandlerRootView>
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
