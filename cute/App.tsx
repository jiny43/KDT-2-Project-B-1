import React from 'react';
import {SafeAreaView} from 'react-native';
import {GoogleMap} from './View/map';
import {ParkingChooseModal} from './View/parkingModal';
import {GooglePlacesInput} from './View/search';
import {ParkingList} from './View/ParkingList';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      {/* <ParkingList /> */}
      <ParkingChooseModal />
      {/* <GooglePlacesInput /> */}
      <GoogleMap />
    </SafeAreaView>
  );
}

export default App;
