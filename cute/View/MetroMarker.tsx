import React from 'react';
import {Marker} from 'react-native-maps';
import MetroCoord from '../model/MetropolitanCoordinate.json';
import {Image} from 'react-native';

const MetroMarker = ({openModal}: {openModal: () => void}) => {
  return (
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
  );
};

export default MetroMarker;
