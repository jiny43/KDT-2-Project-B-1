import React, {useState} from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

type touchableOpacityType =
  | 'busan'
  | 'daejeon'
  | 'daegu'
  | 'gangwondo'
  | 'gwangju'
  | 'incheon'
  | 'ulsan';

interface regionImgType {
  [key: string]: Array<[string, string, any]>;
}

const ModalSelectThree = (props: {region: touchableOpacityType}) => {
  const regionImgSourceRequire: regionImgType = {
    daejeon: [
      ['duruchigi', '두부 두루치기', require('../Img/Daejeon_Duruchigi.png')],
      ['bread', '빵', require('../Img/Daejeon_Twigim-soboro-bread.png')],
      ['kalguksu', '칼국수', require('../Img/Daejeon_Kalguksu.png')],
    ],
  };

  const regionList: touchableOpacityType[] = [
    'busan',
    'daejeon',
    'daegu',
    'gangwondo',
    'gwangju',
    'incheon',
    'ulsan',
  ];

  return (
    <>
      {regionList.map(ele => {
        if (props.region === ele) {
          return regionImgSourceRequire[ele].map(element => {
            return (
              <TouchableOpacity key={element[0]}>
                <Image source={element[2]} style={ModalStyle.imgStyle} />
                <Text style={ModalStyle.textStyle}>{element[1]}</Text>
              </TouchableOpacity>
            );
          });
        }
      })}
    </>
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
    width: 90,
    height: 70,
    resizeMode: 'contain',
    borderRadius: 100,
  },
  textStyle: {
    flex: 1,
    textAlign: 'center',
  },
});

export default ModalSelectThree;
