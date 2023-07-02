import React from 'react';
import { SafeAreaView } from 'react-native';
import { GoogleMap } from './View/map';
import { ParkingModal } from './View/parkingModal';
import { GooglePlacesInput } from './View/search';

function App(): JSX.Element {

  return (
    <SafeAreaView>
      <ParkingModal />
      <GooglePlacesInput />
      <GoogleMap />
    </SafeAreaView>
  );
}

export default App;