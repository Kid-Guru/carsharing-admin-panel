import { HOST_URL } from '../routes/apiRoutes';
import imgStub from '../assets/images/imgStub.svg';

const getImageURL = (path) => {
  if (typeof path !== 'string') return imgStub;
  if (path.includes('blob')) return imgStub;
  if (path.includes('base64')) return path;
  return `${HOST_URL}${path}`;
};

export { getImageURL };
