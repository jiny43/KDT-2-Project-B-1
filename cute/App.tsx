import React from 'react';
import {SafeAreaView} from 'react-native';
import {GoogleMap} from './View/map';
import {ModalComponent} from './View/Modal';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <ModalComponent />
      <GoogleMap />
    </SafeAreaView>
  );
}

export default App;
