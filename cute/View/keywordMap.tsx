import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const API_KEY = 'AIzaSyBxMsKTMvDP6CxDuDjIz9PIln46JK87kro';
const YOUR_KEYWORD = 'parking'; // 원하는 키워드로 변경하세요.

export const ParkingMap=()=> {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<any[]>([]);

  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      error => {
        console.log(error.code, error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
      },
    );

    return () => Geolocation.clearWatch(watchID);
  }, []);

  // 가까운 위치에 특정 키워드를 가진 장소 검색하기 위해 구글 플레이스 API 요청하기
  useEffect(() => {
    async function fetchPlaces() {
      if (latitude !== null && longitude !== null) {
        try {
          console.log(latitude, longitude)
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&keyword=${YOUR_KEYWORD}&key=${API_KEY}`,
          );
          const jsonResponse = await response.json();

          console.log(jsonResponse)
          if (jsonResponse.status === 'OK') {
            setPlaces(jsonResponse.results);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    fetchPlaces();
  }, [latitude, longitude]);

  return (
    <>
      {latitude && longitude && (
        <View style={{ flex: 1 }}>
          <MapView
            // provider={PROVIDER_GOOGLE}
            style={{ width:"100%",height:"100%",flex: 1 }}
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {places.map((place, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: place.geometry.location.lat,
                  longitude: place.geometry.location.lng,
                }}
              >
                <Callout>
                  <View>
                    <Text>{JSON.stringify(place)}</Text>
                  </View>
                </Callout>
              </Marker>
            ))}
          </MapView>
        </View>
      )}
    </>
  );
}