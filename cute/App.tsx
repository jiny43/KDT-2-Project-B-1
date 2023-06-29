import React from 'react';
import {SafeAreaView} from 'react-native';
import InputTest from './view/getExample';
import { Map } from './view/map';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Map />
    </SafeAreaView>
  );
}

export default App;
