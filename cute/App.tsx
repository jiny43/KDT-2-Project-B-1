import React from 'react';
import {SafeAreaView} from 'react-native';
// import InputTest from './View/getExample';
import Map from './View/map';
import GoogleMap from './View/GoogleMap';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Map></Map>
      <GoogleMap />
    </SafeAreaView>
  );
}

export default App;
