import React from 'react';
import {SafeAreaView} from 'react-native';
import Map from './View/map';
import GoogleMap from './View/GoogleMap';
import SelectedPath from './View/SelectedPath';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <GoogleMap />
    </SafeAreaView>
  );
}

export default App;
