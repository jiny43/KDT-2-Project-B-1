import requests, pprint

# 카카오 REST API 키를 설정합니다.
kakao_api_key = "9d667c01eb07e9f64c1df5d6156dbbf2"

# 출발지와 목적지의 좌표를 설정합니다.
origin = "127.3853,36.3492"
destination = "127.4332,36.3521"


# API endpoint URL
url = f"https://apis-navi.kakaomobility.com/v1/directions?origin={origin}&destination={destination}"
# url = f"https://apis-navi.kakaomobility.com/v1/directions?origin={origin}&destination={destination}&priority=RECOMMEND"

# 헤더 정보
headers = {
    "Authorization": f"KakaoAK {kakao_api_key}",
    "Content-Type": "application/json",
}

# API 요청
response = requests.get(url, headers=headers)

# API 응답 확인
if response.status_code == 200:
    data = response.json()  # 응답 데이터는 JSON 형식입니다.
    pprint.pprint(data)
else:
    print(f"Error: {response.status_code}")
