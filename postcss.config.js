const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    parser: false,
    plugins: {
        'postcss-import': {},
        'postcss-preset-env': {},
        'cssnano': isDev  ? {} : false
    }
};