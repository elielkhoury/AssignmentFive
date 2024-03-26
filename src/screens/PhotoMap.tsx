import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PhotoDetail {
  uri: string;
  latitude: number;
  longitude: number;
  timestamp: string;
}

interface Marker {
  latitude: number;
  longitude: number;
  title?: string;
}

const PhotoMap: React.FC = () => {
  const [markers, setMarkers] = useState<Marker[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      const storedPhotos = await AsyncStorage.getItem('photos');
      const photos: PhotoDetail[] = storedPhotos
        ? JSON.parse(storedPhotos)
        : [];
      setMarkers(
        photos.map(photo => ({
          latitude: photo.latitude,
          longitude: photo.longitude,
          title: photo.timestamp,
        })),
      );
    };

    fetchPhotos();
  }, []);

  return (
    <View style={styles.container}>
      <MapView style={styles.map}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PhotoMap;
