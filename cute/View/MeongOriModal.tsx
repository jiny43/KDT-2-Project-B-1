import React from 'react';
import {Image, Modal, StyleSheet, Text} from 'react-native';
import OpenModalToClickMarker from './openModalToClickMarker';

function MeongOriModal({
  closeModal,
  windowBool,
}: {
  closeModal: () => void;
  windowBool: boolean;
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={windowBool}
      onRequestClose={closeModal}>
      <Text style={MeongOriStyle.TextStyle}> 오리의 추천 맛집 </Text>
      <Image
        source={require('../Img/MeongOri.png')}
        style={MeongOriStyle.ImageStyle}
      />
      <OpenModalToClickMarker closeModal={closeModal} />
    </Modal>
  );
}

const MeongOriStyle = StyleSheet.create({
  TextStyle: {
    fontSize: 30,
    left: 28,
    bottom: '88%',
    zIndex: 3,
    position: 'absolute',
    fontWeight: '800',
  },
  ImageStyle: {
    width: '70%',
    height: '30%',
    opacity: 0.65,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});

export default MeongOriModal;
