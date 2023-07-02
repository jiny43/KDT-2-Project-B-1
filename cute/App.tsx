import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import GoogleMap from './View/GoogleMap';
import RecommendedPath from './View/RecommendedPath';

const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <GoogleMap />
      <RecommendedPath />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
