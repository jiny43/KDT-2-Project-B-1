import React from "react";
import { Text, StyleSheet,View } from "react-native";


//googlemap 에 prop 으로 전달해주기 !
type SelectedPathProps = {
  path: string; //문자열 타입 
};

//SelectedPath 컴포넌트는 'path' prop을 받아서 Text 컴포넌트로 렌더링해준다.
const SelectedPath = ({ path }: SelectedPathProps) => {
  return (
    <Text style={styles.selectedPath}>{path}</Text>
  );
}

const styles = StyleSheet.create({

  //텍스트 스타일
  selectedPath: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    
  },
});
export default SelectedPath;
