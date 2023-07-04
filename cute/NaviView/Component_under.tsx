import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export const ComponentUnder: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Under Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '20%', // 하단 컴포넌트는 화면의 20% 차지
    width: '100%', // 가로로 화면을 꽉 채우기
    backgroundColor: 'pink', // 배경색 지정
    justifyContent: 'center', // 세로 방향으로 중앙 정렬
    alignItems: 'center', // 가로 방향으로 중앙 정렬
  },
});

export default ComponentUnder;
