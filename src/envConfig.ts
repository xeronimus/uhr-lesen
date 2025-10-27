const isDev = process.env.NODE_ENV === 'development';
// const isDev = false;

const envConfig = {
  debug: isDev,
  isDev: isDev
};

export default envConfig;
