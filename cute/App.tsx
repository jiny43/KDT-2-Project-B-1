import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import KakaoService from './View/kakaoService';
// import GoogleMap from './View/GoogleMap';
import RecommendedPath from './View/RecommendedPath';
import Map from './View/map';
// import Parkingbutton from './View/Parkingbutton';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <GoogleMap></GoogleMap>
       */}
      <Map></Map>
      {/* <Parkingbutton></Parkingbutton>/ */}
      <RecommendedPath></RecommendedPath>
      {/* <KakaoService /> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
