export interface PhotosType {
  height: number;
  width: number;
  photo_reference: string;
  html_attributions: string[];
}

function ImgReference(object: PhotosType, API_KEY: string): string {
  const {photo_reference} = object;
  let url = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${photo_reference}&key=${API_KEY}`;
  return url;
}

export default ImgReference;
