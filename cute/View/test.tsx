import React from 'react';
import {Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// 앱의 모든 화면에 대한 파라미터를 설정합니다.
type RootStackParamList = {
  Map: undefined;
  A: undefined;
};

// navigation prop을 사용하여 타입을 설정합니다.
type NavigationProp = StackNavigationProp<RootStackParamList, 'A'>;

// 이제 네비게이션 훅에 다음과 같은 타입을 적용합니다.
const A = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleButtonClick = () => {
    navigation.navigate('Map'); // app.tsx파일에 설정해 놓은 이름을 써주시면 됩니다.
  };

  return (
    <>
      {/* A screen content */}
      <Button title="Go to B" onPress={handleButtonClick} />
    </>
  );
};

export default A;
