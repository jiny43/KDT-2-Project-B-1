import React from "react";
import { Text, View, StyleSheet } from "react-native";

const RecommendedPath = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>내비 추천</Text>
      <Text style={styles.duration}>45분</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  duration: {
    fontSize: 16,
  },
});

export default RecommendedPath;
