/* eslint-disable import/prefer-default-export */
import { HOST_URL } from '../routes/apiRoutes';

const getImageURL = (path) => {
  if (path.includes('base64')) {
    return path;
  }
  return `${HOST_URL}${path}`;
};

export { getImageURL };
