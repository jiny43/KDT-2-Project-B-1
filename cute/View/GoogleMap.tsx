import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const GoogleMap = () => {
  return (
    <>
      <View>
        <MapView
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 36.36,
            longitude: 127.38,
            latitudeDelta: 36.0,
            longitudeDelta: 127.0,
          }}
        />
      </View>
    </>
  );
};

export default GoogleMap;
