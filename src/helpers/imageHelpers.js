import { URL } from '../api/api';

const getImageURL = (path) => {
  if (path.includes('base64')) {
    return path;
  }
  return `${URL}${path}`;
};

export { getImageURL };
