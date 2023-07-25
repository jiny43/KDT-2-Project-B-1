import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Geolocation from '@react-native-community/geolocation';

const GPS = ({ text }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lon);
        console.log(`위도: ${lat}, 경도: ${lon}`);
      },
      error => {
        console.error(`위치 가져오기 오류: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  return (
    <View>
      <Text>{text}</Text>
      {latitude !== null && longitude !== null && (
        <Text>
          현재 위치: 위도 {latitude}, 경도 {longitude}
        </Text>
      )}
    </View>
  );
};

export default GPS;
