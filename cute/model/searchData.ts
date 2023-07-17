

export interface LocationType {
  lat : number;
  lng : number;
}
// 비동기로 장소 가져오기.
async function fetchPlaces(
  location: LocationType,
  keywords: string,
  API_KEY: string,
) {
  const {lat, lng} = location;
  // 경도, 위도가 받아진 경우.
  try {
    // 아래  fetch URL을 통해 데이터를 가져온다.
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&keyword=${keywords}&key=${API_KEY}`,
    );
    // 응답받은 데이터를 변수에 담는다.
    const jsonResponse = await response.json();

    // 만약 응답받은 데이터 중 status가 OK라면 ( OK인 경우가 제대로 응답받은 것 )
    if (jsonResponse.status === 'OK') {
      // 해당 데이터 중 results 안에 있는 위치정보들을 places에 담기.
      // console.log('요청한 자료 데이터입니다.', jsonResponse.results);
      // console.log(
      //   'fetch데이터를 받아오는데 성공하였습니다.',
      //   jsonResponse.results,
      // );
      return jsonResponse.results;
    }
  } catch (error) {
    console.error(error);
  }
}

export default fetchPlaces;
