import React, {useEffect} from 'react';
import {LatLngTypes} from '../model/mapviewInitialRegionData';
import fetchPlaces from '../model/searchData';
import {Button, Image, Text, View, TouchableOpacity} from 'react-native';
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
  const [fetchData, setFetchData] = React.useState<FetchPlacesType[]>([
    {
      business_status: '',
      geometry: {location: {latitude: 0, longitude: 0}},
      place_id: '',
      name: '',
      vicinity: '',
      photos: [
        {width: 0, height: 0, html_attributions: '', photo_reference: ''},
      ],
      rating: 0,
      types: '',
    },
  ]);
  const [coordNameData, setCoordNameData] = React.useState<coordNameType>({});

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
  }, []);

  const regionData = (name: string, location: LatLngTypes) => {
    return {
      name: name,
      location: location,
    };
  };

  return (
    <View>
      {fetchData.map(val => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(
                'map',
                regionData(val.name, val.geometry.location),
              );
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
