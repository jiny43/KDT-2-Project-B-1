import requests, pprint

import requests
import json


def fetch_path_data():
    try:
        headers = {
            "Authorization": "KakaoAK 9d667c01eb07e9f64c1df5d6156dbbf2",  # 카카오디벨로퍼스에서 발급 받은 API 키 값
            "Content-Type": "application/json",
        }

        params = {
            "origin": "127.11015314141542,37.39472714688412",  # 출발지
            "destination": "127.10824367964793,37.401937080111644",  # 목적지
            "waypoints": "",  # 경유지
            "priority": "RECOMMEND",  # 경로 탐색 우선순위 옵션
            "car_fuel": "GASOLINE",  # 차량 유종 정보
            "car_hipass": False,  # 하이패스 장착 여부
            "alternatives": False,  # 대안 경로 제공 여부
            "road_details": False,  # 상세 도로 정보 제공 여부
        }

        response = requests.get(
            "https://apis-navi.kakaomobility.com/v1/directions",
            headers=headers,
            params=params,
        )
        data = json.loads(response.text)
        print("Fetched path data:", data)
    except Exception as e:
        print("Error fetching path data:", e)


fetch_path_data()
