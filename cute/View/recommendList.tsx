import React, {useEffect} from 'react';
import {LatLngTypes} from '../model/mapviewInitialRegionData';
import fetchPlaces from '../model/searchData';
import {Image, Text, View} from 'react-native';
import hrefRegex, {PhotosType} from '../model/hrefRegex';

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

const RecommendList = ({
  location,
  keywords,
}: {
  location: LatLngTypes;
  keywords: string;
}) => {
  // const [fetchData, setFetchData] = React.useState<string>('');
  const [fetchData, setFetchData] = React.useState<FetchPlacesType[]>([
    {
      business_status: '',
      geometry: {location: {latitude: 0, longitude: 0}},
      place_id: '',
      name: '',
      vicinity: '',
      photos: {width: 0, height: 0, html_attributions: '', photo_reference: ''},
      rating: 0,
      types: '',
    },
  ]);

  const API_KEY = 'AIzaSyBxMsKTMvDP6CxDuDjIz9PIln46JK87kro';

  useEffect(() => {
    fetchPlaces(location, keywords, API_KEY).then(res => {
      const results = res.map((val: any) => {
        if (val.types?.includes('restaurant') || val.types?.includes('food')) {
          return val;
        }
      });
      const resultUndefinedFilter = results.filter(
        (val: any[]) => val !== undefined,
      );

      setFetchData(resultUndefinedFilter);
    });
  }, []);

  console.log('fetchData', fetchData[0].photos);

  return (
    <View>
      {fetchData.map((val: any) => {
        return (
          <View>
            <Image source={val.photos} />
            <Text>{val.name}</Text>
            <Text>영업상태 : {val.business_status}</Text>
            <Text>추천 : {val.rating}</Text>
            {/* <Image src={} */}
          </View>
        );
      })}
      {/* <Text>{fetchData}</Text> 
          <Text>{fetchData[1].business_status}</Text>
          <Text>{fetchData[1].vicinity}</Text>
          <Text>{fetchData[1].rating}</Text>
          <Text>{fetchData[1].geometry.location.latitude}</Text>
          <Text>{fetchData[1].geometry.location.longitude}</Text>
          <Text>{fetchData[1].photos?.height}</Text>
          <Text>{fetchData[1].photos?.width}</Text>
          <Text>{fetchData[1].photos?.html_attributions}</Text>
          <Text>{fetchData[1].photos?.photo_reference}</Text> */}
    </View>
  );
};

export default RecommendList;
