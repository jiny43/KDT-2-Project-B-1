import React from 'react';
import { SafeAreaView } from 'react-native';
// import InputTest from './view/getExample';
import { GoogleMap } from './View/map';
import { ParkingModal } from './View/parkingModal'

function App(): JSX.Element {

  return (
    <SafeAreaView style={{ width: "100%", height: "100%", position: "relative" }}>
      <GoogleMap />
      <ParkingModal />
    </SafeAreaView>
  );
}

export default App;