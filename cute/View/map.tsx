import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps'; // 지도 라이브러리
import Geolocation from '@react-native-community/geolocation';

export const GoogleMap = () => {

  const [latitude, setLatitude] = useState<number | null>(null)
  const [longitude, setLongitude] = useState<number | null>(null)

  useEffect(() => {
    // getCurrentPosition 현재위치 조회
    Geolocation.getCurrentPosition(
      // 위치정보
      position => {
        // 위도, 경도
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude
        
        // useState 활용
        setLatitude(latitude)
        setLongitude(longitude)
      },

      // 만약 에러라면
      error => {
        console.log(error.code, error.message)
      },
      { 
        // 가능한 정확한 위치 정보를 가져오기 위해 노력을 해야하는가
        // -> 당연한거 아니냐 false 면 정확하게 안갖고오는거야..?
        enableHighAccuracy: true,
        // 위치정보를 가져오기위한 요청 지연에 대한 허용 시간
        timeout: 15000,
        // 10초이내 최신 위치 정보를 사용하겠다.
        maximumAge: 10000 }
      )
      
      console.log(latitude,longitude)

  }, [])


  return (
    <MapView
      // 지도의 스타일, 특히 사이즈를 꼭 넣어야한다. 
      style={{ width: '100%', height: '100%' }}
      // 처음 지도 로드되었을 때의 위치와 확대값
      initialRegion={{
        // 위도
        latitude: 36.349376,
        // 경도
        longitude: 127.377410,
        // 위도 델타 ( 지도 표시 영역의 위도 범위 )
        latitudeDelta: 0.0522,
        // 경도 델타 ( 지도 표시 영역의 경도 범위 )
        longitudeDelta: 0.0221,
      }}>
      <Marker
        // 핀이 찍힐 위도, 경도
        coordinate={{
          latitude: Number(latitude),
          longitude: Number(longitude)
        }}
        // 핀의 제목
        title='im here'
        // 핀에 표시될 설명
        description='yegida'
      />
      <Marker
        // 핀이 찍힐 위도, 경도
        coordinate={{
          latitude: 36.339902,
          longitude: 127.379383
        }}
        // 핀의 제목
        title='hihi'
        // 핀에 표시될 설명
        description='hayohayo'
      />
    </MapView>
  )
}