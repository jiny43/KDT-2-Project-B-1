import React from "react";
import { Text } from "react-native";

//googlemap 에 prop 으로 전달해주기 !
type SelectedPathProps = {
  path: string;
};

const SelectedPath = ({ path }: SelectedPathProps) => {
  return (
    <Text>{path}</Text>
  );
}

export default SelectedPath;
