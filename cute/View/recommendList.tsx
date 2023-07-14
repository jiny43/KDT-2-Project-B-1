import React, {useEffect} from 'react';
import {LatLngTypes} from '../model/mapviewInitialRegionData';
import fetchPlaces from '../model/searchData';
import {Image, Text, View} from 'react-native';
import ImgReference, {PhotosType} from '../model/ImgReference';

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
  const hrefList = fetchData.map((val: any) => {
    const photos = val.photos[0];
    return ImgReference(photos.photo_reference, API_KEY);
  });
  console.log('hrefList', hrefList);

  return (
    <View>
      {fetchData.map((val: any, index: number) => {
        return (
          <View>
            <Image
              source={{
                uri: 'https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=Aaw_FcKQViOF1_586NU9llPzJ0we7PPDU6z8_1AJkDXMxTmcNx-CLu_RDyyK8SIK64hiUGTlFmQ30KMUCwsRPLPVczCo5lD7mO4H4O4T0mdHPOpdG-b7TchWpPRnGlByevWzZR5UJSVRsVplpuJAp_RiBO77dJo7L_B63QG9Iy4rDUvbtACv&key=AIzaSyBxMsKTMvDP6CxDuDjIz9PIln46JK87kro',
              }}
              style={{width: 100, height: 100}}
            />
            <Text>{val.name}</Text>
            <Text>
              영업상태 :{' '}
              {val.business_status === 'OPERATIONAL' ? '영업 중' : '준비 중'}
            </Text>
            <Text>추천 : {val.rating}</Text>
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
