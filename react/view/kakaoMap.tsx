import React, { useState, useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  const [location, setLocation] = useState<GeolocationCoordinates>({}); // 기존 코드 수정

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = (response: GeolocationPosition): void => {
    console.log(response);
    const { latitude, longitude } = response.coords;
    setLocation({ latitude, longitude });
  };

  const errorHandler = (error) => {
    console.error(error);
  };

  return (
    <Map
      center={{ lat: 33.450701, lng: 126.570667 }}
      style={{ width: '800px', height: '600px' }}
      level={3}
    ></Map>
  );
};

export default KakaoMap;
