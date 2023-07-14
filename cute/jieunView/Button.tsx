import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

type ButtonName = {
  name: string;
};

const Button = ({ name }: ButtonName) => {
  return (
    <TouchableOpacity style={styles.selectedname}>{name}</TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  selectedname: {
    width:100,
    height:40,
    backgroundColor:'white',
    borderRadius:100,
    position:"absolute",
    bottom:190,
    left:15,
    fontSize:20,
  },
});

export default Button;
