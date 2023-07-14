export interface PhotosType {
  height: number;
  width: number;
  photo_reference: string;
  html_attributions: string[];
}

function hrefRegex(object: PhotosType[]) {
  const regex = /href="([^"]*)"/;
  const hrefs = object.map(photos => {
    const attributionHTML = photos.html_attributions[0];
    const match = attributionHTML.match(regex);

    if (match) {
      return match[1];
    } else {
      console.log('일치하는 데이터가 없습니다.');
      return null;
    }
  });

  return hrefs;
}

export default hrefRegex;
