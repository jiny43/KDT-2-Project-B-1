import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class KakaoApiguidance {
  private kakao_api_key = '9d667c01eb07e9f64c1df5d6156dbbf2'; // 카카오 API 키
  private destination = '127.3234,36.3521'; // 목적지

  private async getDataFromApi(origin: string) {
    const url = `https://apis-navi.kakaomobility.com/v1/directions?origin=${origin}&destination=${this.destination}`;
    const headers = {
      Authorization: `KakaoAK ${this.kakao_api_key}`,
      'Content-Type': 'application/json',
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data; // 응답 데이터
    } catch (error) {
      console.error(`Error: ${error}`);
      return null;
    }
  }

  async getGuidance(origin: string) {
    const data = await this.getDataFromApi(origin);
    console.log(data);
    console.log('위에가 가이드 데이터이다.');
    if (!data) return null;
    return this.extractGuidance(data);
  }

  // 가이드 정보 추출 로직 구현
  private extractGuidance(data: any) {
    // 가이드 정보 추출
    const guides = [];
    const sections = data['routes'][0]['sections'];
    for (const section of sections) {
      const sectionGuides = section['guides'];
      for (const guide of sectionGuides) {
        if (
          'guidance' in guide &&
          'distance' in guide &&
          'x' in guide &&
          'y' in guide
        ) {
          // 'guidance'와 'distance' 키가 존재하는지 확인
          guides.push({
            guidance: guide['guidance'],
            distance: guide['distance'],
            xlatatue: guide['x'],
            ylatatue: guide['y'],
          });
        }
      }
    }
    return guides; // 가이드 정보 반환
  }
}
