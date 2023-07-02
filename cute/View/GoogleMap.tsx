import { Image, View, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MetroCoord from '../model/MetropolitanCoordinate.json';
import addLatLngDate, { latLngDeltaDataType } from '../model/mapviewInitialRegionData';
import SelectedPath from './SelectedPath';

const GoogleMap = () => {
  const latLngDeltaData: latLngDeltaDataType = {
    latitudeDelta: 0.1,
    longitudeDelta: 0.5,
  };


  return (
    <>
      <View style={{ flex: 1 }}>
        <SelectedPath path="대전 -> 대구(팔공막창)"  />
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={addLatLngDate(MetroCoord.daejeon, latLngDeltaData)}
        >
          <Marker
            key={Object.keys(MetroCoord.daejeon)[0]}
            coordinate={MetroCoord.daejeon}
            description={'대전 소보로빵'}
          >
            <Image
              source={require('../Img/Daejeon_Twigim-soboro-bread.png')}
              style={{ width: 70, height: 70 }}
            />
          </Marker>
        </MapView>
      </View>
    </>
  );
};

export default GoogleMap;
