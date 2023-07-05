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
      ['DongnaePajeon', '동래파전', require('../Img/Busan_DongnaePajeon.png')],
      ['DwaejiGukbap', '돼지국밥', require('../Img/Busan_Dwaeji-gukbap.png')],
      ['Milmyeon', '밀면', require('../Img/Busan_Milmyeon.png')],
    ],
    daejeon: [
      ['duruchigi', '두부 두루치기', require('../Img/Daejeon_Duruchigi.png')],
      ['bread', '빵', require('../Img/Daejeon_Twigim-soboro-bread.png')],
      ['kalguksu', '칼국수', require('../Img/Daejeon_Kalguksu.png')],
    ],
    daegu: [
      ['NapjakMandu', '납작만두', require('../Img/Daegu_NapjakMandu.png')],
      ['Makchang', '막창', require('../Img/Daegu_Makchang.png')],
      ['Mungtigi', '뭉티기', require('../Img/Daegu_Mungtigi.png')],
    ],
    gangwondo: [
      ['Mulhoe', '물회', require('../Img/Gangwon_Mulhoe.png')],
      ['Dakgangjeong', '닭강정', require('../Img/Gangwondo_Dakgangjeong.png')],
      ['Makguksu', '막국수', require('../Img/Gangwon_Makguksu.png')],
    ],
    gwangju: [
      ['Hanjeongsik', '한정식', require('../Img/Gwangju_Hanjeongsik.png')],
      ['Oritang', '오리탕', require('../Img/Gwangju_Ori-tang.png')],
      ['Tteokgalbi', '떡갈비', require('../Img/Gwangju_Tteokgalbi.png')],
    ],
    incheon: [
      [
        'SagogNaengmyeon',
        '사곶냉면',
        require('../Img/Incheon_SagogNaengmyeon.png'),
      ],
      ['Hongeo', '홍어', require('../Img/Incheon_Hongeo.png')],
      ['Jjolmyeon', '쫄면', require('../Img/Incheon_Jjolmyeon.png')],
    ],
    ulsan: [
      ['Bulgogi', '불고기', require('../Img/Ulsan_Bulgogi.png')],
      ['GoraeGogi', '고래고기', require('../Img/Ulsan_Gorae-gogi.png')],
      ['Ssambap', '쌈밥', require('../Img/Ulsan_Ssambap.png')],
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
