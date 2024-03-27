import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCamera,
  faPlusSquare,
  faListUl,
  faImages,
  faMapMarker,
} from '@fortawesome/free-solid-svg-icons';
import CameraAndLibraryPicker from './src/components/CameraAndLibraryPicker';
import Counter from './src/components/Counter';
import ItemsList from './src/components/ItemsList';
import GalleryScreen from './src/screens/GalleryScreen';
import PhotoMap from './src/screens/PhotoMap';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({color, size}) => {
            let iconDefinition;
            switch (route.name) {
              case 'Camera':
                iconDefinition = faCamera;
                break;
              case 'Counter':
                iconDefinition = faPlusSquare;
                break;
              case 'ItemsList':
                iconDefinition = faListUl;
                break;
              case 'Gallery':
                iconDefinition = faImages;
                break;
              case 'PhotoMap':
                iconDefinition = faMapMarker;
                break;
              default:
                iconDefinition = faCamera;
                break;
            }
            return (
              <FontAwesomeIcon
                icon={iconDefinition}
                size={size}
                color={color}
              />
            );
          },
        })}>
        <Tab.Screen name="Camera" component={CameraAndLibraryPicker} />
        <Tab.Screen name="Counter" component={Counter} />
        <Tab.Screen name="ItemsList" component={ItemsList} />
        <Tab.Screen name="Gallery" component={GalleryScreen} />
        <Tab.Screen name="PhotoMap" component={PhotoMap} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
