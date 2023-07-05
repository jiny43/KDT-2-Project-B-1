import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Image, ImageRequireSource} from 'react-native';
import MapView, {Polyline, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import ComponentUnder from '../NaviView/Component_under';
import ComponentUpper from '../NaviView/Component_upper';

interface Coordinate {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface Point {
  latitude: number;
  longitude: number;
}

const App = () => {
  const mapRef = useRef<MapView>(null);
  const [initialPosition, setInitialPosition] = useState<Coordinate | null>(
    null,
  );
  const [coordinates, setCoordinates] = useState<Point[]>([]);

  useEffect(() => {
    const checkLocationPermission = async () => {
      const res = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (res === RESULTS.DENIED) {
        const res2 = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        if (res2 === RESULTS.GRANTED) {
          getLocation();
        }
      } else if (res === RESULTS.GRANTED) {
        getLocation();
      }
    };
    // 점차 확대되는 느낌을 주기위해 settime 메서드 사용,....
    const getLocation = () => {
      Geolocation.watchPosition(
        position => {
          const {latitude, longitude} = position.coords;
          const newRegion: Coordinate = {
            latitude,
            longitude,
            latitudeDelta: 0.4,
            longitudeDelta: 0.4,
          };
          setInitialPosition(newRegion);

          if (mapRef.current) {
            setTimeout(() => {
              mapRef.current?.animateToRegion(
                {
                  ...newRegion,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                },
                2000,
              );
            }, 1000);

            setTimeout(() => {
              mapRef.current?.animateToRegion(
                {
                  ...newRegion,
                  latitudeDelta: 0.0001,
                  longitudeDelta: 0.0001,
                },
                2000,
              );
            }, 3000);
          }
        },
        error => {
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    };

    checkLocationPermission();
  }, []);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (initialPosition) {
        const response = await fetch(
          `http://10.0.2.2:3000/kakao-api/directions/${initialPosition.longitude},${initialPosition.latitude}`,
        );
        const data = await response.json();

        const transformedCoordinates = data.map((coord: [number, number]) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));

        setCoordinates(transformedCoordinates);
      }
    };

    fetchCoordinates();
  }, [initialPosition]);

  const userLocationMarker: ImageRequireSource = require('../Img/ori_nav.png');

  return (
    <View style={styles.container}>
      <ComponentUpper />
      {initialPosition && (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={initialPosition}
          showsUserLocation={false}>
          <Marker
            coordinate={initialPosition}
            image={userLocationMarker}
            style={styles.marker}
          />
          <Polyline
            coordinates={coordinates}
            strokeColor="red"
            strokeWidth={4.5}
          />
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 800,
    minWidth: 200,
  },
  map: {
    flex: 1,
  },
  marker: {
    width: 50,
    height: 50,
    color: 'red',
  },
});

export default App;

// import React, {useState, useEffect} from 'react';
// import MapView, {Polyline} from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

// interface Coordinate {
//   latitude: number;
//   longitude: number;
//   latitudeDelta: number;
//   longitudeDelta: number;
// }

// interface Point {
//   latitude: number;
//   longitude: number;
// }

// const App = () => {
//   const [initialPosition, setInitialPosition] = useState<Coordinate | null>(
//     null,
//   );
//   const [coordinates, setCoordinates] = useState<Point[]>([]);

//   const fetchCoordinates = async (position: Coordinate) => {
//     const response = await fetch(
//       `http://10.0.2.2:3000/kakao-api/directions?origin=${position.latitude},${position.longitude}`,
//     );
//     const data = await response.json();

//     const transformedCoordinates = data.map((coord: [number, number]) => ({
//       latitude: coord[1],
//       longitude: coord[0],
//     }));

//     setCoordinates(transformedCoordinates);
//     console.log(transformedCoordinates);
//   };
//   const getLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const {latitude, longitude} = position.coords;

//         console.log(position.coords);

//         const newInitialPosition = {
//           latitude,
//           longitude,
//           latitudeDelta: 0.005,
//           longitudeDelta: 0.005,
//         };

//         setInitialPosition(newInitialPosition);

//         fetchCoordinates(newInitialPosition);
//       },
//       error => {
//         console.log(error.code, error.message);
//       },
//       {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//     );
//   };

//   const checkLocationPermission = async () => {
//     const res = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

//     if (res === RESULTS.DENIED) {
//       const res2 = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
//       if (res2 === RESULTS.GRANTED) {
//         getLocation();
//       }
//     } else if (res === RESULTS.GRANTED) {
//       getLocation();
//     }
//   };

//   useEffect(() => {
//     checkLocationPermission();
//   }, []);

//   return (
//     initialPosition && (
//       <MapView
//         style={{width: '100%', height: '100%'}}
//         initialRegion={initialPosition}
//         showsUserLocation={true}>
//         <Polyline
//           coordinates={coordinates}
//           strokeColor="#000"
//           strokeWidth={3}
//         />
//       </MapView>
//     )
//   );
// };

// export default App;
