/**
 * @typedef {object} MetropolitanCoordinateType
 * @property {number} latitude - 위도 좌표
 * @property {number} longitude - 경도 좌표
 */

export type MetropolitanCoordinateType = {
  latitude: number;
  longitude: number;
};

/**
 * @typedef {Object} latLngDeltaDataType
 * @property {number} latitudeDelta - 위도 변화량
 * @property {number} longitudeDelta - 경도 변화량
 */

export type latLngDeltaDataType = {
  latitudeDelta: number;
  longitudeDelta: number;
};

/**
 * @typedef {Object} MapViewInitialRegionType
 * @property {number} latitude - 위도 좌표
 * @property {number} longitude - 경도 좌표
 * @property {number} latitudeDelta - 위도 변화량
 * @property {number} longitudeDelta - 경도 변화량
 */

export type MapViewInitialRegionType = MetropolitanCoordinateType &
  latLngDeltaDataType;

/**
 *
 * @param {MetropolitanCoordinateType} metroCoord 위도 경도 좌표
 * @param {latLngDeltaDataType} latLngDeltaData 위도 경도 레벨 데이터
 * @returns {MapViewInitialRegionType}
 */

const addLatLngDate = (
  metroCoord: MetropolitanCoordinateType,
  latLngDeltaData: latLngDeltaDataType,
) => {
  const newMetropolitanPlusDelta: MapViewInitialRegionType = {
    ...metroCoord,
    ...latLngDeltaData,
  };

  return newMetropolitanPlusDelta;
};

export default addLatLngDate;
