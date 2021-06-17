import { HOST_URL } from '../routes/apiRoutes';

const getImageURL = (path) => {
  if (typeof path !== 'string') return '';
  if (path.includes('base64')) {
    return path;
  }
  return `${HOST_URL}${path}`;
};

export { getImageURL };
