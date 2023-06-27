import React, { useState, useEffect } from 'react';
import { Map } from 'react-kakao-maps-sdk';

const KakaoMap = () => {
  interface GeolocationType {
    latitude: number;
    longitude: number;
  }
  const [location, setLocation] = useState<GeolocationType>();

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

  return (
    <>
      {location && (
        <Map
          center={{ lat: location.latitude, lng: location.longitude }}
          style={{ width: '800px', height: '600px' }}
          level={3}
        ></Map>
      )}
    </>
  );
};

export default KakaoMap;
