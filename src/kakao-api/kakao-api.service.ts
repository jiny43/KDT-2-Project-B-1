import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KakaoApiService {
  private kakao_api_key = '9d667c01eb07e9f64c1df5d6156dbbf2'; // 카카오 API 키
  private origin = '127.3937,36.3399'; // 출발지
  private destination = '128.601445,35.8714354'; // 목적지

  async getDirections(origin: string) {
    const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${this.destination}`;
    const headers = {
      Authorization: `KakaoAK ${this.kakao_api_key}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(url, { headers });
      const data = response.data; // 응답 데이터
      const duration = data.routes[0].sections[0].duration; //시간
      const distance = data.routes[0].sections[0].distance; //거리
      const polyline = [];
      const sections = data['routes'][0]['sections']; //경로
      for (const section of sections) {
        const roads = section['roads'];
        for (const road of roads) {
          const vertexes = road['vertexes'];
          for (let i = 0; i < vertexes.length - 1; i += 2) {
            const x = vertexes[i];
            const y = vertexes[i + 1];
            polyline.push([x, y]);
          }
        }
      }

      // console.log(duration, distance, polyline);
      return { duration, distance, polyline }; // 객체로 값을 반환
    } catch (error) {
      console.error(`Error: ${error}`);
      return null;
    }
  }
}
