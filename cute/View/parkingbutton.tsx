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
    top: 530,
    left: 10,
    backgroundColor: 'white',
    width: 100,
    height: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center', 
  },
  buttonText: {
    color: 'black', 
    fontWeight: 'bold',

  },
});

export default App;
