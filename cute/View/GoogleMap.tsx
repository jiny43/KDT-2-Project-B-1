import MapView from 'react-native-maps';

const GoogleMap = () => {
  return (
    <MapView
      initialRegion={{
        latitude: 36.36,
        longitude: 127.38,
        latitudeDelta: 36.0,
        longitudeDelta: 127.0,
      }}
    />
  );
};

export default GoogleMap;
