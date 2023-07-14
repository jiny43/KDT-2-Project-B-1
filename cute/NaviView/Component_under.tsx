import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const ComponentUnder: React.FC = () => {
  const [date, setDate] = useState<Date>(new Date());

  // 컴포넌트가 마운트되면 1초마다 setDate를 호출하여 상태를 업데이트합니다.
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);

    // 컴포넌트가 언마운트되면 setInterval을 해제합니다.
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>하단 컴포넌트 공간</Text>
      <Text>카카오 API에서 불러와 사용할 공간</Text>
      <Text>현재 시각: {date.toLocaleTimeString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '20%', // 상단 컴포넌트는 화면의 20% 차지
    width: '100%', // 가로로 화면을 꽉 채우기
    backgroundColor: 'pink', // 배경색 지정
    justifyContent: 'center', // 세로 방향으로 중앙 정렬
    alignItems: 'center', // 가로 방향으로 중앙 정렬
    opacity: 0.8,
  },
});

export default ComponentUnder;
