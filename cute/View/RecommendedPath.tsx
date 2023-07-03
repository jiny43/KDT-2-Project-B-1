import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const RecommendedPath = () => {
  const [pathData, setPathData] = useState(undefined);

  useEffect(() => {
    const fetchPathData = async () => {
      try {
        const response = await fetch("http://10.0.2.2:3000/kakao-api/directions");
        const data = await response.json();
        const minutes = Math.floor(data / 60); // 분
        const seconds = data % 60; // 초
        setPathData({ minutes, seconds });
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
      {pathData && (
        <View style={styles.contentContainer}>
          <Text style={styles.duration}>{`${pathData.minutes}분 ${pathData.seconds}초`}</Text>
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
