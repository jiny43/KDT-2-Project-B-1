import React from 'react';
import {Marker} from 'react-native-maps';
import MetroCoord from '../model/MetropolitanCoordinate.json';
import {Image} from 'react-native';
import {MetroCityList} from './TouchableOpacityImageText';

const MetroMarker = ({
  openModal,
}: // region,
{
  openModal: (regionInfo: string) => void;
  // region: string;
}) => {
  type MetroMarkerType = {
    [key in MetroCityList]: [string, string, any];
  };

  const MetroRegionInfo: MetroMarkerType = {
    busan: [
      'busan',
      '부산 돼지국밥',
      require('../Img/Busan_Dwaeji-gukbap.png'),
    ],
    daegu: ['daegu', '대구 막창', require('../Img/Daegu_Makchang.png')],
    daejeon: [
      'daejeon',
      '대전 빵',
      require('../Img/Daejeon_Twigim-soboro-bread.png'),
    ],
    gangwondo: [
      'gangwondo',
      '강원도 닭강정',
      require('../Img/Gangwondo_Dakgangjeong.png'),
    ],
    gwangju: ['gwangju', '광주 오리탕', require('../Img/Gwangju_Ori-tang.png')],
    incheon: ['incheon', '인천 홍어', require('../Img/Incheon_Hongeo.png')],
    ulsan: ['ulsan', '울산 고래고기', require('../Img/Ulsan_Gorae-gogi.png')],
  };

  const regionList: MetroCityList[] = [
    'busan',
    'daegu',
    'daejeon',
    'gangwondo',
    'gwangju',
    'incheon',
    'ulsan',
  ];

  return (
    <>
      {regionList.map(ele => {
        return (
          <Marker
            key={Object.keys(MetroCoord[ele])[0]}
            coordinate={MetroCoord[ele]}
            description={MetroRegionInfo[ele][1]}
            onPress={() => openModal(MetroRegionInfo[ele][0])}>
            <Image
              source={MetroRegionInfo[ele][2]}
              style={{width: 70, height: 70}}
            />
          </Marker>
        );
      })}
    </>
  );
};

export default MetroMarker;
