import * as React from 'react';
import { Map } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  return (
    <Map
      center={{ lat: 33.450701, lng: 126.570667 }}
      style={{ width: '800px', height: '600px' }}
      level={3}
    ></Map>
  );
};

export default KakaoMap;
