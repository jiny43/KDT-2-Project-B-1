import React, { useEffect } from 'react';
import { KakaoApiService } from './KakaoApiService'; 

function App() {
  useEffect(() => {
    // KakaoApiService의 인스턴스 생성
    const kakaoApiService = new KakaoApiService();

    // getDirections 함수 호출
    kakaoApiService.getDirections();
  }, []);

  return null;
}

export default App;
