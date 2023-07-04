import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const App = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.buttonText}>먹보추천경로</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
