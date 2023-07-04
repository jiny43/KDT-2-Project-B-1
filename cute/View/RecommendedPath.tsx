import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const RecommendedPath = () => {
  const [pathData, setPathData] = useState({ minutes: 0, seconds: 0, distance: 0 });
  //버튼을 눌렀을 때  주차장 우선 데이터로 변경 
  // const [isButtonPressed, setIsButtonPressed] = useState(false);

  // 추천 경로 데이터
  useEffect(() => {
    const fetchPathData = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/kakao-api/duration");
        const data = await response.json();
        const minutes = Math.floor(data.duration / 60); // 분
        const seconds = data.duration % 60; // 초
        const distanceInKm = Number((data.distance / 1000).toFixed(2)); // 미터를 킬로미터로 변환하여 소수점 2자리까지 표시
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
      <Text style={styles.distanceText}>예상 운전 시간:</Text>
      <Text style={styles.duration}>{`${pathData.minutes}분 ${pathData.seconds}초`}</Text>

      <View style={styles.contentContainer}>
        <Text style={styles.distanceText}>예상 운전 거리:</Text>
        {/* pathData 값이 존재할 때만 해당 UI를 렌더링 */}
        {pathData && <Text style={styles.distance}>{`${pathData.distance} km`}</Text>}
        <Image source={require('../Img/ori_nav.png')} style={styles.image} />
      </View>
    </View>
  );
};




















//styles
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
  //거리 컨테이너
  contentContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    // marginBottom: 10,
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
    width: 100,
    height: 100,
    // marginLeft: 'auto',
    position: "absolute",
    bottom : 20,
    left : 160,
  },
  //내비 추천
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'yellow',
  },
  //예상 운전 거리,시간 텍스트
  distanceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  //예상 운전 거리
  distance: {
    fontSize: 16,
    color: 'black',
  },
});

export default RecommendedPath;
