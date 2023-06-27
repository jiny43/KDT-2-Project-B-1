import React, { useState, useEffect, MouseEventHandler } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  interface GeolocationType {
    latitude: number;
    longitude: number;
  }
  const [location, setLocation] = useState<GeolocationType>();
  const [level, setLevel] = useState<number>(3);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []);

  const successHandler = (response: GeolocationPosition): void => {
    console.log(response);
    const { latitude, longitude }: GeolocationType = response.coords;
    const result = { latitude, longitude };
    setLocation(result);
  };

  const errorHandler = (error: GeolocationPositionError) => {
    console.error(error);
  };

  const plusLevelHandler = (): void => {
    if (level < 14) {
      setLevel(level + 1);
    }
  };
  const minusLevelHandler = (): void => {
    if (level > 1) {
      setLevel(level - 1);
    }
  };

  return (
    <>
      {location && (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: '390px', height: '820px' }}
          level={level}
        >
          <button onClick={() => minusLevelHandler()}>-</button>
          <button onClick={() => plusLevelHandler()}>+</button>
        </Map>
      )}
    </>
  );
};

export default KakaoMap;
