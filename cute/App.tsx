import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
// import InputTest from './View/getExample';
// import GoogleMap from './View/GoogleMap';
import OpenModalToClickMarker from './View/openModalToClickMarker';
import Map from './View/yoone';
import Map2 from './View/map';

const App: React.FC = () => {
  return (
    <SafeAreaView>
      <Map />
      {/* <Map2 /> */}
      {/* <GoogleMap /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
