import React from 'react';
import MapView from 'react-native-maps'; // 지도 라이브러리

export const Map = () => {

  return (
      <MapView
        style={{ width: '100%', height: '100%' }}
        initialRegion={{
          latitude: 37.541,
          longitude: 126.986,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} />
  )
}