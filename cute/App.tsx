import React from 'react';
import {SafeAreaView} from 'react-native';
import Map from './View/map';
import {SafeAreaView, StyleSheet} from 'react-native';
// import InputTest from './View/getExample';
import GoogleMap from './View/GoogleMap';
import SelectedPath from './View/SelectedPath';

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <GoogleMap />
    </SafeAreaView>
  );
};

// 최상위 부모요소의 설정없이는 안먹어서 부득이하게..
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
