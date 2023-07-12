import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const ComponentUnder: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>하단 컴포넌트 공간</Text>
      <Text>카카오 API에서 불러와 사용할 공간</Text>
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
