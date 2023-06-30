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
          initialRegion={}
        />
      </View>
    </>
  );
};

export default GoogleMap;
