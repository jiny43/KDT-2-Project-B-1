import React, {useEffect} from 'react';
import {LatLngTypes} from '../model/mapviewInitialRegionData';
import fetchPlaces from '../model/searchData';
import {Text, View, TouchableOpacity} from 'react-native';
import coord from '../model/MetropolitanCoordinate.json';
import {MetroCityList} from './TouchableOpacityImageText';

export interface FetchPlacesType {
  business_status: string;
  geometry: {location: LatLngTypes};
  place_id: string;
  name: string;
  vicinity: string;
  photos?: PhotoType[];
  rating?: number;
  types?: string;
}

export interface PhotoType {
  width?: number;
  height?: number;
  html_attributions?: string;
  photo_reference?: string;
}

export interface coordNameType {
  location?: LatLngTypes;
  name?: string;
}

const RecommendList = ({
  region,
  keywords,
  navigation,
}: {
  region: MetroCityList;
  keywords: string;
  navigation: any;
}) => {
  const [fetchData, setFetchData] = React.useState<FetchPlacesType[]>([]);

  const API_KEY = 'AIzaSyBxMsKTMvDP6CxDuDjIz9PIln46JK87kro';
  console.log('추천지역', region, '지역 좌표', coord[region]);

  useEffect(() => {
    fetchPlaces(coord[region], keywords, API_KEY).then(res => {
      const results = res.map((val: any) => {
        if (val.types?.includes('restaurant') || val.types?.includes('food')) {
          return val;
        }
      });

      //undefined가 나오는 값 제거
      const resultUndefinedFilter = results.filter(
        (val: FetchPlacesType[]) => val !== undefined,
      );

      setFetchData(resultUndefinedFilter);
    });
  }, [keywords]);

  return (
    <View>
      {fetchData.map(val => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('map', {
                name: val.name,
                location: {
                  latitude: val.geometry.location.latitude,
                  longitude: val.geometry.location.longitude,
                },
              });
            }}>
            <View style={{margin: 4}}>
              <Text>{val.name}</Text>
              <Text>
                영업상태 :{' '}
                {val.business_status === 'OPERATIONAL' ? '영업 중' : '준비 중'}
              </Text>
              <Text>추천 : {val.rating}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default RecommendList;
