// import React, {useEffect, useState} from 'react';
// import {View, Text, Button} from 'react-native';
// import {
//   fetchPhotos,
//   addPhoto,
// } from '/Users/elieelkhoury/Desktop/Eurisko/AssignmentFive/src/services/ApiService';

// // Define the structure of a photo object
// interface Photo {
//   uri: string;
//   latitude?: number;
//   longitude?: number;
//   timestamp?: string;
// }

// const PhotosComponent: React.FC = () => {
//   // Type the state with the Photo interface
//   const [photos, setPhotos] = useState<Photo[]>([]);

//   // Fetch photos on component mount
//   useEffect(() => {
//     const loadPhotos = async () => {
//       try {
//         const data = await fetchPhotos();
//         setPhotos(data);
//       } catch (error) {
//         console.error('Failed to load photos:', error);
//       }
//     };

//     loadPhotos();
//   }, []);

//   // Example function to add a new photo
//   const handleAddPhoto = async () => {
//     const newPhoto = {
//       uri: 'https://example.com/newphoto.jpg',
//       latitude: 0,
//       longitude: 0,
//       timestamp: new Date().toISOString(),
//     };

//     try {
//       await addPhoto(newPhoto);
//       console.log('Photo added successfully');
//       // Optionally refresh the photos list here
//     } catch (error) {
//       console.error('Failed to add photo:', error);
//     }
//   };

//   return (
//     <View>
//       {photos.map((photo, index) => (
//         <Text key={index}>{photo.uri}</Text> // Example rendering
//       ))}
//       <Button title="Add Photo" onPress={handleAddPhoto} />
//     </View>
//   );
// };
