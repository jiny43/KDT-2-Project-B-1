import React from 'react';
import {SafeAreaView} from 'react-native';
// import InputTest from './View/getExample';
import Map from './View/map';
import GoogleMap from './View/GoogleMap';
import OpenModalToClickMarker from './View/openModalToClickMarker';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      {/* <Map></Map> */}
      {/* <GoogleMap /> */}
      <OpenModalToClickMarker />
    </SafeAreaView>
  );
}

export default App;
