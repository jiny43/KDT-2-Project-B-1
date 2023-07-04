import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.buttonText}>먹보추천경로</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 400,
    left: 10,
    backgroundColor: '#4A72D6',
    width: 100,
    height: 100,
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center', // Align the content vertically
    alignItems: 'center', // Align the content horizontally
  },
  buttonText: {
    color: 'white', // Set the text color to white
  },
});

export default App;
