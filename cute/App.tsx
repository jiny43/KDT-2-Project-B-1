import React from 'react';
import {SafeAreaView} from 'react-native';
import GoogleMap from './View/GoogleMap';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <GoogleMap />
    </SafeAreaView>
  );
}

export default App;
