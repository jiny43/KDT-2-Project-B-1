import React from 'react';
import {
  Image,
  ImageProps,
  Modal,
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ModalSelectThreeProps extends TouchableOpacityProps {
  imageProps: ImageProps;
  textProps: TextProps;
  children: React.ReactNode;
}

const ModalSelectThree = (/* props: ModalSelectThreeProps */) => {
  // const {imageProps, textProps, children, ...touchableOpacityProps} = props;
  const duruchigiRequire = require('../Img/Daejeon_Duruchigi.png');
  return (
    <TouchableOpacity>
      <Image
        source={duruchigiRequire}
        alt="두부두루치기"
        style={ModalStyle.imgStyle}
      />
      <Text style={ModalStyle.textStyle}>두부두루치기</Text>
    </TouchableOpacity>
  );
};

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
  imgStyle: {
    width: '30%',
    height: '30%',
    borderRadius: 100,
  },
  textStyle: {
    flex: 1,
  },
});

export default ModalSelectThree;
