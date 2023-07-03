import {Button, Modal, StyleSheet, View} from 'react-native';
import React from 'react';
import ModalSelectThree from './TouchableOpacityImageText';

function OpenModalToClickMarker({closeModal}: {closeModal: () => void}) {
  return (
    <>
      <View style={ModalStyle.buttonStyle}>
        <Button title="Close Modal" onPress={closeModal} />
      </View>
      <View style={ModalStyle.viewStyle}>
        <ModalSelectThree region="daejeon" />
      </View>
    </>
  );
}

const ModalStyle = StyleSheet.create({
  viewStyle: {
    width: '70%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  buttonStyle: {
    alignItems: 'flex-end',
    padding: 10,
  },
});

export default OpenModalToClickMarker;
