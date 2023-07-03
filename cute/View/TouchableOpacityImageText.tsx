import React, {useState} from 'react';
import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

const ModalSelectThree = () => {
  const [regionName, setRegionName] = useState<string | null>(null);
  const [regionNumber, setRegionNumber] = useState<number>(0);
  const regionImgSourceRequire = {
    daejeon: [
      ['duruchigi', '두부 두루치기', require('../Img/Daejeon_Duruchigi.png')],
      [
        'twigimSoboroBread',
        '튀김소보로',
        require('../Img/Daejeon_Twigim-soboro-bread.png'),
      ],
      ['kalguksu', '칼국수', require('../Img/Daejeon_Kalguksu.png')],
    ],
  };
  return (
    <TouchableOpacity>
      <Image
        source={regionImgSourceRequire.daejeon[0][2]}
        alt={regionImgSourceRequire.daejeon[0][0]}
        style={ModalStyle.imgStyle}
      />
      <Text style={ModalStyle.textStyle}>
        {regionImgSourceRequire.daejeon[0][1]}
      </Text>
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
    width: '100%',
    height: '10%',
    resizeMode: 'contain',
    borderRadius: 100,
  },
  textStyle: {
    flex: 1,
  },
});

export default ModalSelectThree;
