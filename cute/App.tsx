import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import Map from './View/MiddleView/map';
import GoogleMap from './View/GoogleMap';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Yoone from './View/yoone';
import RecommendList from './View/recommendList';
import GPS from './View/MiddleView/GPS';
// import Test from './View/MiddleView/Test';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <GPS text={'Geolocation Test'}></GPS>
  )
    // <NavigationContainer>
    //   <Stack.Navigator>
        {/* 네비게이션 연결은 하기 name명으로 하면 됩니다.
          페이지는 첫번째 순서에 있는 페이지가 실행 시, 나오는 페이지 입니다.
        지금은 북한페이지가 첫번째에 위치하였기에 북한 페이지가 노출됩니다.
        네비게이션으로 이동하고 싶은 페이지를 추가하고 싶다면 아래 추가하시면 됩니다. */}

    //     {/* 북한페이지 */}
    //     <Stack.Screen
    //       name="googleMap"
    //       component={GoogleMap}
    //       options={{headerShown: false}}
    //     />
    //     {/* 38선페이지 */}
    //     <Stack.Screen
    //       name="map"
    //       component={Map}
    //       options={{headerShown: false}}
    //     />
    //     {/* 남한페이지 */}
    //     <Stack.Screen
    //       name="yoone"
    //       component={Yoone}
    //       options={{headerShown: false}}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  // )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
