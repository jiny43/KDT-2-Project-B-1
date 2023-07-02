import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import GoogleMap from './View/GoogleMap';
import RecommendedPath from './View/RecommendedPath';

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <GoogleMap />
      <RecommendedPath />
    </SafeAreaView>
  );
}

//SafeAreaView 컴포넌트에 스타일을 적용하여 전체 영역을 차지하도록 설정
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
