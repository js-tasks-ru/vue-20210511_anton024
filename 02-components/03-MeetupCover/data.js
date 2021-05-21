const API_URL = 'https://course-vue.javascript.ru/api';

export function getImageUrlByImageId(imageId) {
  return `${API_URL}/images/${imageId}`;
}
