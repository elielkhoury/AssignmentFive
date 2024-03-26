import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CameraAndLibraryPicker from './src/components/CameraAndLibraryPicker';
import Counter from './src/components/Counter';
import ItemsList from '/Users/elieelkhoury/Desktop/Eurisko/AssignmentFive/src/components/ItemsList';
import GalleryScreen from './src/screens/GalleryScreen';
import PhotoMap from './src/screens/PhotoMap';

const Tab = createBottomTabNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
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
