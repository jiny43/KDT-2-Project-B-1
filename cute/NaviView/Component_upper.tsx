import {useState, useEffect} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {getDistance} from 'geolib';

interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface GuidanceData {
  Guidance: string;
  Distance: number;
  xlatatue: number;
  ylatatue: number;
}

const Upper = () => {
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(
    null,
  );
  const [guidanceData, setGuidanceData] = useState<GuidanceData[]>([]);

  useEffect(() => {
    console.log(guidanceData);
    console.log('여기는 마운트 될때마다 바뀝니다.');
    const checkLocationPermission = async () => {
      const res = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (res2 === RESULTS.GRANTED) {
          getLocation();
        }
      } else if (res === RESULTS.GRANTED) {
        getLocation();
      }
    };

    const getLocation = () => {
      Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const newRegion: Coordinate = {
            latitude,
            longitude,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
          };
          console.log(latitude, longitude);
          console.log('여기는 라따뚜이입니다.');
          setInitialPosition(newRegion);
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    checkLocationPermission();
  }, [guidanceData]);

  useEffect(() => {
    const fetchDirections = async () => {
      if (initialPosition) {
        const {latitude, longitude} = initialPosition;
        const response = await fetch(
          `http://10.0.2.2:3000/kakao-guidance/guidance/${initialPosition.longitude},${initialPosition.latitude}`,
        );
        const data: GuidanceData[] = await response.json();

        // let closeNextData = null;
        // for (let i = 0; i < data.length; i++) {
        //   const distance = getDistance(
        //     {latitude, longitude},
        //     {latitude: data[i].xlatatue, longitude: data[i].ylatatue},
        //   );

        //   // 현재 위치에서 가장 가까운 ' 다음' 위치를 찾으면 멈춥니다.
        //   if (distance <= data[i].Distance) {
        //     closeNextData = data[i];
        //     break;
        //   }r
        // }
        // // 가장 가까운 '다음' 위치의
        // if (closeNextData) {
        //   setGuidanceData([closeNextData]);
        // }
        console.log(data);
        console.log('여기는 가이드 데이터입니다.');
        setGuidanceData(data);
      }
    };
    fetchDirections();
  }, [initialPosition]);

  return (
    <View style={styles.container}>
      {guidanceData.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        guidanceData.map((data, index) => (
          <Text key={index} style={styles.textDetail}>
            {data.Guidance ? data.Guidance : 'No Guidance'}:{' '}
            {data.Distance ? data.Distance : 'No Distance'}
          </Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
  },
  guidanceItem: {
    // 여기에 각 가이드라인 항목의 스타일을 설정합니다...
    margin: 5,
  },
  textDetail: {
    fontSize: 45,
    color: 'blue',
  },
});

export default Upper;
