import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import axios from 'axios';

const RecommendedPath: React.FC<any> = ({navigation}) => {
  const [pathData, setPathData] = useState({hours: 0, minutes: 0, distance: 0});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kakaoApiKey = '9d667c01eb07e9f64c1df5d6156dbbf2'; // 카카오 API 키
        const destination = '127.3234,36.3521'; // 목적지
        const origin = '126.705278,37.456111'; // 출발지

        const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${destination}`;
        const headers = {
          Authorization: `KakaoAK ${kakaoApiKey}`,
          'Content-Type': 'application/json',
        };

        const response = await axios.get(url, {headers});
        const data = response.data;
        const sections = data.routes[0].sections;
        const summary = data.routes[0].summary;

        const hours = Math.floor(summary.duration / 3600); // 시간
        const minutes = Math.floor((summary.duration % 3600) / 60); // 분
        const distanceInKm = Number((summary.distance / 1000).toFixed(2)); // 미터를 킬로미터로 변환하여 소수점 2자리까지 표시
        setPathData({hours, minutes, distance: distanceInKm});
      } catch (error) {
        console.error(`Error: ${error}`);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{flex: 1}}
        onPress={() => {
          navigation.navigate('yoone');
        }}>
        <Text style={styles.title}>내비 추천</Text>
        <Text style={styles.distanceText}>예상 운전 시간:</Text>
        <Text
          style={
            styles.duration
          }>{`${pathData.hours}시 ${pathData.minutes}분`}</Text>

        <View style={styles.contentContainer}>
          <Text style={styles.distanceText}>예상 운전 거리:</Text>
          {pathData && (
            <Text style={styles.distance}>{`${pathData.distance} km`}</Text>
          )}
          <Image source={require('../Img/ori_nav.png')} style={styles.image} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

// styles
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 579,
    left: 10,
    backgroundColor: '#4A72D6',
    width: 300,
    height: 150,
    borderRadius: 10,
    padding: 20,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  duration: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    position: 'absolute',
    bottom: 20,
    left: 160,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow',
  },
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  distance: {
    fontSize: 16,
    color: 'black',
  },
});

export default RecommendedPath;
