import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MetroCoord from '../model/MetropolitanCoordinate.json';
import {useState} from 'react';

const GoogleMap = () => {
  return (
    <>
      <View>
        <MapView
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 36.3575,
            longitude: 127.3808,
            latitudeDelta: 0.01,
            longitudeDelta: 0.005,
          }}
        />
      </View>
    </>
  );
};

export default GoogleMap;
