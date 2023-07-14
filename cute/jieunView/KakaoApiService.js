import axios from 'axios';

class KakaoApiService {
  kakao_api_key = '9d667c01eb07e9f64c1df5d6156dbbf2'; // 카카오 API 키
  destination = '127.3234,36.3521'; // 목적지
  origin = '126.705278,37.456111'; // 출발지

  fetchData = async () => {
    try {
      const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${this.origin}&destination=${this.destination}`;
      const headers = {
        Authorization: `KakaoAK ${this.kakao_api_key}`,
        'Content-Type': 'application/json',
      };

      const response = await axios.get(url, { headers });
      const data = response.data;
      // console.log(data);
      const sections = data.routes[0].sections[0]; 
      console.log(sections);
      // const summary = data.routes[0].summary;
      // console.log(summary);
        //? summary(카카오 추천 경로 정보) : 출발지,목적지, 거리, 시간 , 택시 , toll 요금
      

    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };
}

const apiService = new KakaoApiService();
apiService.fetchData();
