import React, {useEffect} from 'react';
import {LatLngTypes} from '../model/mapviewInitialRegionData';
import fetchPlaces from '../model/searchData';
import {Text, View} from 'react-native';

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
          // const valResult = {
          //   business_status: val.business_status,
          //   geometry: val.geometry,
          //   place_id: val.place_id,
          //   name: val.name,
          //   vicinity: val.vicinity,
          //   photos: val.photos || {
          //     height: 0,
          //     width: 0,
          //     html_attributions: '',
          //     photo_reference: '',
          //   },
          //   rating: val.rating || 0,
          // };
          // return valResult;
          return val;
        }
      });
      const resultUndefinedFilter = results.filter(
        (val: any[]) => val !== undefined,
      );
      // const stringify = JSON.stringify(resultUndefinedFilter, null, 2);

      // setFetchData(stringify);
      setFetchData(resultUndefinedFilter);
    });
  }, []);

  console.log('fetchData', fetchData);

  return (
    <View>
      {fetchData.map((val: any) => {
        return <Text>{val.name}</Text>;
      })}
      {/* <Text>{fetchData}</Text> */}
      {/* <Text>{fetchData[1].business_status}</Text>
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
