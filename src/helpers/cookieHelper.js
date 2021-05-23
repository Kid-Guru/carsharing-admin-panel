import Cookies from 'js-cookie';

export default {
  setAccessToken(token) {
    Cookies.set('accessToken', token, {
      secure: true,
      samesite: 'strict',
      // path: '/',
      // domain: '.simbirsoft1.com',
    });
  },
  getAccessToken() {
    return Cookies.get('accessToken');
  },
  removeAccessToken() {
    Cookies.remove('accessToken');
  },
  setRefreshToken(token) {
    Cookies.set('refreshToken', token, {
      secure: true,
      samesite: 'strict',
      // path: '/',
      // domain: '.simbirsoft1.com',
    });
  },
  getRefreshToken() {
    return Cookies.get('refreshToken');
  },
  removeRefreshToken() {
    Cookies.remove('refreshToken');
  },
  // setRefreshToken(token: string) {
  //   await localStorage.setItem(LocalStorageKey.refreshToken, token)
  // },
  // getRefreshToken() {
  //   const token: string | null = await localStorage.getItem(LocalStorageKey.refreshToken)
  //   return token
  // },
};
