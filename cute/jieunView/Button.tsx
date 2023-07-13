import React from "react";
import { Text, StyleSheet } from "react-native";

type ButtonName = {
  name: string;
};

const Button = ({ name }: ButtonName) => {
  return (
    <Text style={styles.selectedname}>{name}</Text>
  );
}

const styles = StyleSheet.create({
  selectedname: {
    width:100,
    height:40,
  },
});

export default Button;
