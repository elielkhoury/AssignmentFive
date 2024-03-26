import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  Linking,
  Button,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';

const Login = () => {
  const {requestPermission, hasPermission} = useCameraPermission();
  const device = useCameraDevice('back');
  const camera = useRef<Camera>(null);

  const [isCameraVisible, setIsCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState<null | string>(null);

  const openCamera = () => setIsCameraVisible(true);
  const closeCamera = () => setIsCameraVisible(false);

  const handleCameraPermission = async () => {
    const isAccessGranted = await requestPermission();

    if (!isAccessGranted) {
      Alert.alert('Permission required', 'Open settings to grant permission', [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Open settings',
          style: 'default',
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]);
      return;
    }
    openCamera();
  };

  const takePhoto = async () => {
    const photo = await camera.current?.takePhoto();
    setCapturedImage(`file://${photo!.path}`);
    closeCamera();
  };

  const saveImage = async () => {
    await CameraRoll.saveAsset(capturedImage!, {type: 'photo'}).then(() => {
      Alert.alert('Success', 'Photo saved successfully', [
        {style: 'cancel', text: 'cancel'},
        {
          text: 'open photos',
          onPress: async () => {
            await Linking.openURL('photos-redirect://');
          },
        },
      ]);
    });
  };

  if (device === null) {
    return (
      <View style={styles.mainView}>
        <Text style={{fontSize: 20, color: 'red'}}>
          Camera feature not supported
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.mainView}>
      {!!capturedImage ? (
        <>
          <View
            style={{
              width: 300,
              height: 300,
              borderRadius: 10,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: capturedImage}}
              style={{width: '100%', height: '100%'}}
            />
          </View>

          <Pressable
            onPress={() => {
              setCapturedImage(null);
            }}
            style={styles.button}>
            <Text style={{fontSize: 20, color: '#fff'}}>Clear image</Text>
          </Pressable>

          <Pressable onPress={saveImage} style={styles.button}>
            <Text style={{fontSize: 20, color: '#fff'}}>
              Save to camera roll
            </Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={handleCameraPermission} style={styles.button}>
          <Text style={{fontSize: 20, color: '#fff'}}>
            {hasPermission ? 'Open camera' : 'Request camera access'}
          </Text>
        </Pressable>
      )}

      {isCameraVisible && (
        <>
          <View style={{position: 'absolute', top: 100, end: 24, zIndex: 1}}>
            <Button title="Close" color="#fff" onPress={closeCamera} />
          </View>

          <Camera
            photo
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device!}
            isActive={true}
          />

          <View style={{position: 'absolute', bottom: 100}}>
            <Pressable onPress={takePhoto} style={styles.button}>
              <Text style={{fontSize: 20, color: '#fff'}}>Take photo</Text>
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007aff',
    borderRadius: 8,
    marginTop: 24,
  },
});

export default Login;
