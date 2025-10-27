const isDev = process.env.NODE_ENV === 'development';
// const isDev = false;

const envConfig = {
  storageFilePrefix: isDev ? 'myLife.dev' : 'myLife',
  photoAlbumName: isDev ? '_my-life-dev' : '_my-life',
  interceptHTTP: false,
  debug: isDev,
  isDev: isDev
};

export default envConfig;
