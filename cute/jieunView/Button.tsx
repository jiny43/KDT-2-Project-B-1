import React from "react";
import { Text, StyleSheet, TouchableOpacity, View, Alert } from "react-native";

interface ButtonProps {
  name: string;
}

const Button: React.FC<ButtonProps> = ({ name }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.selectedname}
        onPress={() => Alert.alert('주차장경로로 변경해야함')}
      >
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  selectedname: {
    width: 100,
    height: 35,
    backgroundColor: 'white',
    borderRadius: 100,
    position: "absolute",
    bottom: 170,
    left: 15,
    fontSize: 19,
  },
});

export default Button;
