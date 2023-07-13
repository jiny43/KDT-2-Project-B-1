import fetchPlaces from './searchData';
import {LatLngTypes} from './mapviewInitialRegionData';
import coord from './MetropolitanCoordinate.json';

export interface FetchPlacesType {
  business_status: string;
  geometry: {location: LatLngTypes};
  place_id: string;
  name: string;
  vicinity: string;
  photos?: PhotoType;
  rating?: number;
  types?: string;
}

export interface PhotoType {
  width?: number;
  height?: number;
  html_attributions?: string;
  photo_reference?: string;
}

function restaurantList(location: LatLngTypes, keywords: string) {
  const API_KEY = 'AIzaSyBxMsKTMvDP6CxDuDjIz9PIln46JK87kro';

  let data: FetchPlacesType[] = [];

  fetchPlaces(location, keywords, API_KEY).then(res => {
    const results = res.map((val: FetchPlacesType) => {
      if (val.types?.includes('restaurant') || val.types?.includes('food')) {
        const valresult = {
          business_status: val.business_status,
          geometry: val.geometry,
          place_id: val.place_id,
          name: val.name,
          vicinity: val.vicinity,
          photos: val.photos,
          rating: val.rating,
        };
        return valresult;
      }
    });
    console.log('results 콘솔', results);
    return results;
  });
  return data;
}

const a = restaurantList(coord.daejeon, '두부+두루치기');
console.log('a', a);
