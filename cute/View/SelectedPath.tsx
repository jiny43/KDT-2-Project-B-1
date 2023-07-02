import React from "react";
import { Text } from "react-native";

//googlemap 에 prop 으로 전달해주기 !
type SelectedPathProps = {
  path: string; //문자열 타입 
};

//SelectedPath 컴포넌트는 'path' prop을 받아서 Text 컴포넌트로 렌더링해준다.
const SelectedPath = ({ path }: SelectedPathProps) => {
  return (
    <Text>{path}</Text>
  );
}

export default SelectedPath;
