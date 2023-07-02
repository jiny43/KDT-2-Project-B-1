import { Image, View } from 'react-native';
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
      <View>
        <MapView
          style={{ width: '100%', height: '100%' }}
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
          <SelectedPath path="대전 -> 대구" />
        </MapView>
      </View>
      
    </>
  );
};

export default GoogleMap;
