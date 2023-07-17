import {LatLngTypes} from './mapviewInitialRegionData';

export interface OriginalData {
  business_status: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    viewport: {
      northeast: {
        lat: number;
        lng: number;
      };
      southwest: {
        lat: number;
        lng: number;
      };
    };
  };
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  name?: string;
  place_id?: string;
  plus_code?: {
    compound_code?: string;
    global_code?: string;
  };
  rating?: number;
  reference?: string;
  scope?: string;
  types?: [string, string];
  user_ratings_total?: number;
  vicinity?: string;
  photos?: [
    {
      height?: number;
      html_attributions?: string[];
      photo_reference?: string;
      width?: number;
    },
  ];
}

export interface ModifiedData {
  business_status: string;
  geometry: {
    location: {
      latitude: number;
      longitude: number;
    };
    viewport: {
      northeast: {
        latitude: number;
        longitude: number;
      };
      southwest: {
        latitude: number;
        longitude: number;
      };
    };
  };
  icon?: string;
  icon_background_color?: string;
  icon_mask_base_uri?: string;
  name?: string;
  place_id?: string;
  plus_code?: {
    compound_code?: string;
    global_code?: string;
  };
  rating?: number;
  reference?: string;
  scope?: string;
  types?: [string, string];
  user_ratings_total?: number;
  vicinity?: string;
  photos?: [
    {
      height?: number;
      html_attributions?: string[];
      photo_reference?: string;
      width?: number;
    },
  ];
}

function modifyData(data: OriginalData): ModifiedData {
  const modifiedData: ModifiedData = {
    business_status: data.business_status,
    geometry: {
      location: {
        latitude: data.geometry.location.lat,
        longitude: data.geometry.location.lng,
      },
      viewport: {
        northeast: {
          latitude: data.geometry.viewport.northeast.lat,
          longitude: data.geometry.viewport.northeast.lng,
        },
        southwest: {
          latitude: data.geometry.viewport.southwest.lat,
          longitude: data.geometry.viewport.southwest.lng,
        },
      },
    },
    icon: data.icon,
    icon_background_color: data.icon_background_color,
    icon_mask_base_uri: data.icon_mask_base_uri,
    name: data.name,
    place_id: data.place_id,
    plus_code: data.plus_code,
    rating: data.rating,
    reference: data.reference,
    scope: data.scope,
    types: data.types,
    user_ratings_total: data.user_ratings_total,
    vicinity: data.vicinity,
    photos: data.photos,
  };

  return modifiedData;
}

// 비동기로 장소 가져오기.
async function fetchPlaces(
  location: LatLngTypes,
  keywords: string,
  API_KEY: string,
) {
  const {latitude, longitude} = location;
  // 경도, 위도가 받아진 경우.
  try {
    // 아래  fetch URL을 통해 데이터를 가져온다.
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&keyword=${keywords}&key=${API_KEY}`,
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

      const results = jsonResponse.results.map((result: OriginalData) => {
        return modifyData(result);
      });
      return results;
    }
  } catch (error) {
    console.error(error);
  }
}

export default fetchPlaces;
