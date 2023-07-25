// 다른 파일에서 GPS 컴포넌트를 사용하여 위치 정보를 출력하고 활용하는 예시

import React from 'react';
import { View, Text } from 'react-native';
import GPS from './GPS'; // GPS 컴포넌트를 import합니다.

const App = () => {
  // 현재 위치 정보를 출력하는 함수
  const showCurrentLocation = (latitude, longitude) => {
    console.log(`현재 위치: 위도 ${latitude}, 경도 ${longitude}`);
  };

  // GPS 컴포넌트를 사용하여 현재 위치 정보를 출력합니다.
  return (
    <View>
      <GPS
        text="현재 위치를 가져옵니다..."
        onLocationReceived={showCurrentLocation} // 현재 위치 정보를 전달받는 콜백 함수를 props로 전달합니다.
      />
    </View>
  );
};

export default App;
