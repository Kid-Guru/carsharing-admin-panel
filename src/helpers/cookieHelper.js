import Cookies from 'js-cookie';

export default {
  setAccessRefreshTokens(accessToken, refreshToken, expiresIn) {
    const expires = new Date(Date.now() + ((expiresIn - 600) * 1000));
    this.setAccessToken(accessToken, expires);
    this.setRefreshToken(refreshToken, expires);
  },
  setAccessToken(token, expires) {
    Cookies.set('accessToken', token, {
      secure: true,
      samesite: 'strict',
      expires,
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

    });
  },
  getRefreshToken() {
    return Cookies.get('refreshToken');
  },
  removeRefreshToken() {
    Cookies.remove('refreshToken');
  },
};
