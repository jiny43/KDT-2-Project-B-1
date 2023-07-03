import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';

function OpenModalToClickMarker() {
  return (
    <>
      <View
        style={[
          ModalStyle.width70,
          ModalStyle.backgroundColor,
          ModalStyle.height100,
        ]}>
        <Text>일단 크기를 좀 보자</Text>
      </View>
    </>
  );
}

const ModalStyle = StyleSheet.create({
  width70: {
    width: '70%',
  },
  height100: {
    height: '100%',
  },
  backgroundColor: {
    backgroundColor: '#fafafa',
  },
});

export default OpenModalToClickMarker;
