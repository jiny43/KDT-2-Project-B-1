import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import RecommendedPath from './jieunView/RecommendedPath';
import Map from './jieunView/map';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Map></Map>
      <RecommendedPath></RecommendedPath>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
