import {Alert, Image, Modal, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import MetroCoord from '../model/MetropolitanCoordinate.json';
import addLatLngDate, {
  latLngDeltaDataType,
} from '../model/mapviewInitialRegionData';
import React, {useState} from 'react';
import OpenModalToClickMarker from './openModalToClickMarker';

const GoogleMap = () => {
  const [windowBool, setWindowBool] = useState<boolean>(false);
  const latLngDeltaData: latLngDeltaDataType = {
    latitudeDelta: 0.1,
    longitudeDelta: 0.5,
  };

  const openModal = () => {
    setWindowBool(true);
  };

  const closeModal = () => {
    setWindowBool(false);
  };

  return (
    <>
      <View>
        <MapView
          style={{width: '100%', height: '100%'}}
          provider={PROVIDER_GOOGLE}
          initialRegion={addLatLngDate(MetroCoord.daejeon, latLngDeltaData)}>
          <Marker
            key={Object.keys(MetroCoord.daejeon)[0]}
            coordinate={MetroCoord.daejeon}
            description={'대전 소보로빵'}
            onPress={openModal}>
            <Image
              source={require('../Img/Daejeon_Twigim-soboro-bread.png')}
              style={{width: 70, height: 70}}
            />
          </Marker>
        </MapView>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={windowBool}
        onRequestClose={closeModal}>
        <OpenModalToClickMarker />
      </Modal>
    </>
  );
};
export default GoogleMap;
