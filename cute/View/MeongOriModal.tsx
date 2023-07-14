import React from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import OpenModalToClickMarker from './openModalToClickMarker';

function MeongOriModal({
  closeModal,
  windowBool,
  regionInfo,
  navigation,
}: {
  closeModal: () => void;
  windowBool: boolean;
  regionInfo: string;
  navigation: any;
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={windowBool}
      onRequestClose={closeModal}>
      <View style={{height: '30%'}}>
        <Text style={MeongOriStyle.TextStyle}> 오리의 추천 맛집 </Text>
        <Image
          source={require('../Img/MeongOri.png')}
          style={MeongOriStyle.ImageStyle}
        />
      </View>
      <OpenModalToClickMarker
        closeModal={closeModal}
        regionInfo={regionInfo}
        navigation={navigation}
      />
    </Modal>
  );
}

const MeongOriStyle = StyleSheet.create({
  TextStyle: {
    fontSize: 30,
    left: '8%',
    bottom: '60%',
    zIndex: 1,
    position: 'absolute',
    fontWeight: '800',
  },
  ImageStyle: {
    width: '75%',
    height: '100%',
    opacity: 0.65,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
});

export default MeongOriModal;
