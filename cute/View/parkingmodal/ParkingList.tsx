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

// API키->추후 env 등 안전하게 변경하기.
const API_KEY = 'AIzaSyBxMsKTMvDP6CxDuDjIz9PIln46JK87kro';

// 검색할 키워드 = 주차장 (영어만가능)
const YOUR_KEYWORD = 'parking';

export const ParkingList = () => {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [places, setPlaces] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(true);

  // 주차장 갯수 카운트를 위한 변수
  let count = 0;

  useEffect(() => {
    // 실시간 위치를 감시하고 변경 시 새로운 데이터 제공
    const watchID = Geolocation.watchPosition(
      // 위치
      position => {
        const {latitude, longitude} = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      //  에러 시
      error => {
        console.log(error.code, error.message);
      },
      // 부가 옵션
      {
        // 정확한 위치를 반환할 것인지
        enableHighAccuracy: true,
        // 위치정보를 가져오기까지 허용되는 시간제한
        timeout: 15000,
        // 최대한으로 허용되는 위치 정보의 나이
        maximumAge: 10000,
      },
    );

    // 위에 제공받은 데이터를 전달 및 위치 정보 감시 중지.
    return () => Geolocation.clearWatch(watchID);
  }, []);

  useEffect(() => {
    // 비동기로 장소 가져오기.
    async function fetchPlaces() {
      // 경도, 위도가 받아진 경우.
      if (latitude !== null && longitude !== null) {
        try {
          // 아래  fetch URL을 통해 데이터를 가져온다.
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&keyword=${YOUR_KEYWORD}&key=${API_KEY}`,
          );
          // 응답받은 데이터를 변수에 담는다.
          const jsonResponse = await response.json();

          console.log(jsonResponse.results);

          // 만약 응답받은 데이터 중 status가 OK라면 ( OK인 경우가 제대로 응답받은 것 )
          if (jsonResponse.status === 'OK') {
            // 해당 데이터 중 results 안에 있는 위치정보들을 places에 담기.
            setPlaces(jsonResponse.results);
          }
        } catch (error) {
          console.error(error);
        }
      }
    }

    // 위의 fetch함수 실행
    fetchPlaces();

    // 위도, 경도가 바뀔때마다.
  }, [latitude, longitude]);

  // FlatList로 조회한 데이터를 목록화 하기 위한 콜백함수.
  const ParkingList = (placeData: any) => {
    // 실시간 위치
    const geoLocation = {
      latitude: Number(latitude),
      longitude: Number(longitude),
    };

    // 검색된 장소의 위치
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
            source={require('../../Img/driverduck.png')}
            style={{width: '60%', height: '80%'}}
          />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {/* 위도, 경도가 있는 경우 모달창 실행 */}
      {latitude && longitude && (
        <Modal visible={openModal} animationType="fade" transparent={true}>
          <View
            style={{
              width: '75%',
              height: '50%',
              alignContent: 'center',
              justifyContent: 'center',
              flex: 1,
              zIndex: 10,
            }}>
            {/* places를 데이터로 리스트업 작성 */}
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
