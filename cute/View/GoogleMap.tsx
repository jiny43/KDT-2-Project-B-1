import {Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import MetroCoord from '../model/MetropolitanCoordinate.json';
import addLatLngDate, {
  latLngDeltaDataType,
} from '../model/mapviewInitialRegionData';
import React, {useState} from 'react';
import MeongOriModal from './MeongOriModal';
import MetroMarker from './MetroMarker';

// 네비게이션 사용을 위해 매개변수에 네비게이션을 넣어주세요.
// App.tsx 에 작성하신 페이지부터 네비게이션 기능 사용을 할 최종 목적지까지 navigation을 전달해줘야 사용 가능합니다.
const GoogleMap: React.FC<any> = ({navigation}) => {
  const [windowBool, setWindowBool] = useState<boolean>(false);
  const [isMapReady, setIsMapReady] = useState<boolean>(false);
  const [regionInfo, setRegionInfo] = useState<string>('');
  const latLngDeltaData: latLngDeltaDataType = {
    latitudeDelta: 3,
    longitudeDelta: 3,
  };
  const openModal = (regionInfo: string) => {
    setWindowBool(true);
    setRegionInfo(regionInfo);
  };
  const closeModal = () => {
    setWindowBool(false);
  };
  const onMapReady = () => {
    setIsMapReady(true);
  };

  const renderLoading = () => {
    return (
      <View style={{flex: 1}}>
        <Text>Loading Map...</Text>
      </View>
    );
  };
  return (
    <>
      {isMapReady ? null : renderLoading()}
      <View style={{flex: 1}}>
        <MapView
          onMapReady={onMapReady}
          style={{
            width: '100%',
            height: '100%',
            minHeight: 800,
            minWidth: 200,
          }}
          provider={PROVIDER_GOOGLE}
          initialRegion={addLatLngDate(MetroCoord.daejeon, latLngDeltaData)}>
          <MetroMarker openModal={openModal} />
        </MapView>
      </View>
      <MeongOriModal
        closeModal={closeModal}
        windowBool={windowBool}
        regionInfo={regionInfo}
        navigation={navigation}
      />
    </>
  );
};

export default GoogleMap;
