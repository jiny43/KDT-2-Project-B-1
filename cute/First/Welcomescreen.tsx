import React, {FunctionComponent} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const WelcomeScreen: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('./Img/welcome.png')} />
      <Text style={styles.text}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', // 가운데 정렬을 위해 추가
    paddingHorizontal: 16,
    backgroundColor: '#FBEB93', // 밝은 파스텔톤 색상
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 16, // 텍스트와의 간격을 위해 추가
    backgroundColor: '#FBEB93', // 배경색과 동일한 색상
  },
  text: {
    // 텍스트 스타일을 위해 추가
    fontSize: 20,
    color: '#333',
  },
});

export default WelcomeScreen;
