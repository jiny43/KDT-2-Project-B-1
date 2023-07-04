import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import OpenModalToClickMarker from './View/openModalToClickMarker';
import Map from './View/yoone';
import A from './View/test';

// Create the application stack
const Stack = createStackNavigator();
const App: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="A">
          <Stack.Screen name="A" component={A} />
          <Stack.Screen name="Map" component={Map} />
          {/* Add more screens as needed */}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
