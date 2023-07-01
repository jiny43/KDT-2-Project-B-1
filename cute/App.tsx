import React from 'react';
import { SafeAreaView } from 'react-native';
import InputTest from './view/getExample';
import { GoogleMap } from './View/map';
import { ParkingModal } from './View/parkingModal'

function App(): JSX.Element {
  
  return (
    <SafeAreaView>
      <ParkingModal />
      <GoogleMap />
    </SafeAreaView>
  );
}

export default App;