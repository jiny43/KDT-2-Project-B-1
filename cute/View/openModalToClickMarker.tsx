import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModalSelectThree from './TouchableOpacityImageText';

function OpenModalToClickMarker() {
  return (
    <>
      <View
        style={[
          ModalStyle.width70,
          ModalStyle.backgroundColor,
          ModalStyle.height100,
          ModalStyle.flexDirection,
        ]}>
        <ModalSelectThree />
        <ModalSelectThree />
        <ModalSelectThree />
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
  flexDirection: {
    flexDirection: 'column',
  },
});

export default OpenModalToClickMarker;
