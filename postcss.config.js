const isDev = process.env.NODE_ENV === 'development';

module.exports = {
    parser: false,
    plugins: [
        require('autoprefixer')({
            browsers: 'last 10 versions'
        }),
    ]
};