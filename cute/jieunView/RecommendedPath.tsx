import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

const RecommendedPath = () => {
  const [pathData, setPathData] = useState({hours: 0, minutes: 0, distance: 0});

  useEffect(() => {
    const fetchPathData = async () => {
      try {
        const response = await fetch('http://10.0.2.2:3000/kakao-api/duration');
        const data = await response.json();
        const hours = Math.floor(data.duration / 3600); // 시간
        const minutes = Math.floor((data.duration % 3600) / 60); // 분
        const distanceInKm = Number((data.distance / 1000).toFixed(2)); // 미터를 킬로미터로 변환하여 소수점 2자리까지 표시
        setPathData({hours, minutes, distance: distanceInKm});
      } catch (error) {
        // console.log("Error fetching path data:", error);
      }
    };

    fetchPathData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>내비 추천</Text>
      <Text style={styles.distanceText}>예상 운전 거리:</Text>
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
