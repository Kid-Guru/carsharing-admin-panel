import Cookies from 'js-cookie';

const ONE_WEEK = 604800;

export default {
  setAccessRefreshTokens(accessToken, refreshToken, expiresIn) {
    const expiresAccessToken = new Date(Date.now() + ((expiresIn - 600) * 1000));
    const expiresRefreshToken = new Date(Date.now() + ONE_WEEK * 1000);
    this.setAccessToken(accessToken, expiresAccessToken);
    this.setRefreshToken(refreshToken, expiresRefreshToken);
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
  setRefreshToken(token, expires) {
    Cookies.set('refreshToken', token, {
      secure: true,
      samesite: 'strict',
      expires,
    });
  },
  getRefreshToken() {
    return Cookies.get('refreshToken');
  },
  removeRefreshToken() {
    Cookies.remove('refreshToken');
  },
};
