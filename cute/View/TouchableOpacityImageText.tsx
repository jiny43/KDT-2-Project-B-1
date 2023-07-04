import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';

export type MetroCityList =
  | 'busan'
  | 'daejeon'
  | 'daegu'
  | 'gangwondo'
  | 'gwangju'
  | 'incheon'
  | 'ulsan';

export type regionImgType = {
  [key in MetroCityList]: Array<[string, string, any]>;
};

const ModalSelectThree = (props: {region: MetroCityList}) => {
  const regionImgSourceRequire: regionImgType = {
    busan: [
      ['DongnaePajeon', '동래파전', require('../Img/MeongOri.png')],
      ['DwaejiGukbap', '돼지국밥', require('../Img/MeongOri.png')],
      ['Milmyeon', '밀면', require('../Img/MeongOri.png')],
    ],
    daejeon: [
      ['duruchigi', '두부 두루치기', require('../Img/Daejeon_Duruchigi.png')],
      ['bread', '빵', require('../Img/Daejeon_Twigim-soboro-bread.png')],
      ['kalguksu', '칼국수', require('../Img/Daejeon_Kalguksu.png')],
    ],
    daegu: [
      ['NapjakMandu', '납작만두', require('../Img/MeongOri.png')],
      ['Makchang', '막창', require('../Img/MeongOri.png')],
      ['Mungtigi', '뭉티기', require('../Img/MeongOri.png')],
    ],
    gangwondo: [
      ['Mulhoe', '물회', require('../Img/MeongOri.png')],
      ['Dakgangjeong', '닭강정', require('../Img/MeongOri.png')],
      ['Makguksu', '막국수', require('../Img/MeongOri.png')],
    ],
    gwangju: [
      ['Hanjeongsik', '한정식', require('../Img/MeongOri.png')],
      ['Oritang', '오리탕', require('../Img/MeongOri.png')],
      ['Tteokgalbi', '떡갈비', require('../Img/MeongOri.png')],
    ],
    incheon: [
      ['SagogNaengmyeon', '사곶냉면', require('../Img/MeongOri.png')],
      ['Hongeo', '홍어', require('../Img/MeongOri.png')],
      ['Jjolmyeon', '쫄면', require('../Img/MeongOri.png')],
    ],
    ulsan: [
      ['Bulgogi', '불고기', require('../Img/MeongOri.png')],
      ['GoraeGogi', '고래고기', require('../Img/MeongOri.png')],
      ['Ssambap', '쌈밥', require('../Img/MeongOri.png')],
    ],
  };

  const regionList: MetroCityList[] = [
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
