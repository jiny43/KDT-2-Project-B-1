import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const RecommendedPath = () => {
  const [pathData, setPathData] = useState({ minutes: 0, seconds: 0, distance: 0});

  useEffect(() => {
    const fetchPathData = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/kakao-api/duration");
        const data = await response.json();
        const minutes = Math.floor(data.duration / 60); // 분
        const seconds = data.duration % 60; // 초
        const distanceInKm = Number(data.distance / 1000).toFixed(2); // 미터를 킬로미터로 변환하여 소수점 2자리까지 표시
        setPathData({ minutes, seconds, distance: distanceInKm });
        console.log("Fetched path data:", data);
      } catch (error) {
        console.log("Error fetching path data:", error);
      }
    };

    fetchPathData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내비 추천</Text>
      <Text>예상 운전 시간:</Text>
      {pathData && (
        <View style={styles.contentContainer}>
          
          <Text style={styles.duration}>{`${pathData.minutes}분 ${pathData.seconds}초`}</Text>

      <Text>예상 운전 거리:</Text>
      <Text>{pathData.distance}km</Text>

          <Image
            source={require('../Img/ori_nav.png')}
            style={styles.image}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  //전체 컨테이너
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
  //시간, 오리 컨테이너
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  //시간 
  duration: {
    fontSize: 30,
    color: 'white',
    fontWeight: 'bold',
    marginRight: 10,
  },
  //이미지
  image: {
    width: 70,
    height: 70,
  },
  //내비 추천
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow',
  },
});

export default RecommendedPath;
