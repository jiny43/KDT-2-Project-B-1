import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {getDistance} from 'geolib';

const API_KEY = 'AIzaSyBxMsKTMvDP6CxDuDjIz9PIln46JK87kro';
const YOUR_KEYWORD = 'parking'; // 원하는 키워드로 변경하세요.

export const ParkingList = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(true);
  let count = 0;

  useEffect(() => {
    const watchID = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
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

  useEffect(() => {
    async function fetchPlaces() {
      if (latitude !== null && longitude !== null) {
        try {
          console.log(latitude, longitude);
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&keyword=${YOUR_KEYWORD}&key=${API_KEY}`,
          );
          const jsonResponse = await response.json();

          console.log(jsonResponse.results);
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

  const ParkingList = (placeData: any) => {
    const geoLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    const locationLatLng = {
      latitude: placeData.geometry.location.lat,
      longitude: placeData.geometry.location.lng,
    };

    console.log(geoLocation, locationLatLng);

    // 주차장 갯수 계산
    count++;
    // 콘솔 확인
    console.log(count);

    return (
      <View
        style={{
          width: '100%',
          height: '80%',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignContent: 'center',
          flex: 1,
          backgroundColor: '#FFF9F9',
        }}>
        <View
          style={{
            width: '80%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
          }}>
          <View
            style={{
              width: '100%',
              height: '50%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>이 름 : </Text>
            <Text>{decodeURIComponent(placeData.name)}</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '50%',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>거 리 : </Text>
            <Text>{getDistance(geoLocation, locationLatLng)}m</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            width: '20%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            // 이미지 클릭 시, 모달 닫힐 예정.
            // 추후에는 클릭 시, 해당 좌표를 넘겨서 해당 좌표 주차장까지 가는 길을 알려주는 거로 로직 하면 될드읏~
            setOpenModal(false);
          }}>
          <Image
            source={require('../Img/driverduck.png')}
            style={{width: '60%', height: '80%'}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {latitude && longitude && (
        <Modal visible={openModal} animationType="fade" transparent={true}>
          <View
            style={{
              width: '75%',
              height: '50%',
              alignContent: 'center',
              justifyContent: 'center',
              flex: 1,
            }}>
            <FlatList
              data={places}
              renderItem={({item}) => ParkingList(item)}
            />
          </View>
        </Modal>
      )}
    </>
  );
};
