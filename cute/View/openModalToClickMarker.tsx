import {Button, StyleSheet, View} from 'react-native';
import React from 'react';
import ModalSelectThree from './TouchableOpacityImageText';

function OpenModalToClickMarker({closeModal}: {closeModal: () => void}) {
  return (
    <>
      <View style={ModalStyle.viewStyle}>
        <ModalSelectThree region="daejeon" />
      </View>
      <View style={ModalStyle.buttonStyle}>
        <Button title="Close" onPress={closeModal} />
      </View>
    </>
  );
}

const ModalStyle = StyleSheet.create({
  viewStyle: {
    width: '70%',
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.90)',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  buttonStyle: {
    padding: 10,
  },
});

export default OpenModalToClickMarker;
