import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RecommendList from './recommendList';

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

const ModalSelectThree = ({
  forRegion,
  navigation,
}: {
  forRegion: MetroCityList;
  navigation: any;
}) => {
  const [selectFood, setSelectFood] = React.useState<string>('');
  const [selectRegion, setSelectRegion] =
    React.useState<MetroCityList>('daejeon');

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
  const recommendEle = (valueFirst: string, valueSecond: MetroCityList) => {
    setSelectFood(valueFirst);
    setSelectRegion(valueSecond);
  };

  return (
    <View style={{height: '100%'}}>
      <View style={ModalStyle.viewStyle}>
        {regionList.map(ele => {
          if (forRegion === ele) {
            return regionImgSourceRequire[ele].map(element => {
              return (
                <TouchableOpacity
                  key={element[0]}
                  style={{height: 100}}
                  onPress={() => recommendEle(element[1], ele)}>
                  <Image source={element[2]} style={ModalStyle.imgStyle} />
                  <Text style={ModalStyle.textStyle}>{element[1]}</Text>
                </TouchableOpacity>
              );
            });
          }
        })}
      </View>
      <View
        style={{
          flex: 1,
          flexWrap: 'wrap',
          borderWidth: 1,
          borderColor: 'red',
          borderStyle: 'solid',
        }}>
        <RecommendList
          region={selectRegion}
          keywords={selectFood}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

const ModalStyle = StyleSheet.create({
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
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // flex: 1,
  },
});

export default ModalSelectThree;
