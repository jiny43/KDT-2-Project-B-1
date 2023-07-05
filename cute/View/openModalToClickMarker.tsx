import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModalSelectThree, {MetroCityList} from './TouchableOpacityImageText';

function OpenModalToClickMarker({
  closeModal,
  regionInfo,
}: {
  closeModal: () => void;
  regionInfo: string;
}) {
  return (
    <>
      <View style={ModalStyle.viewContainerStyle}>
        <View style={ModalStyle.viewStyle}>
          <ModalSelectThree region={regionInfo as MetroCityList} />
        </View>
        <Text style={{flex: 3}}>촤좌좍</Text>
      </View>
      <View style={ModalStyle.buttonStyle}>
        <Button title="  X  " onPress={closeModal} />
      </View>
    </>
  );
}

const ModalStyle = StyleSheet.create({
  viewContainerStyle: {
    width: '75%',
    height: '70%',
    backgroundColor: 'rgba(255,255,255,0.90)',
  },
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  buttonStyle: {
    padding: 10,
    zIndex: 1,
    position: 'absolute',
    right: '25%',
    bottom: 0,
  },
});

export default OpenModalToClickMarker;
