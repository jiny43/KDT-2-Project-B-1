import MapView from 'react-native-maps';
import React from 'react-native';

const App = () => {
  return (
    <MapView 
    style={{width:'100%', height:'100%'}}
  initialRegion={{
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }}
/>)
};

export default App;
