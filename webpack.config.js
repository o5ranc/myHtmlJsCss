const path = require('path');
 //html파일을 번들링 해주는 플러그인 (dist 폴더에 html 파일 생성)
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development', // 모드 선택 development, production, none
  entry: {
    main: '/src/js/main.js'
  }, // entry point
  output: { // Define output point
    path: path.resolve('./dist'), // output path
    filename: '[name].js' // output file name
  },
  // webpack-dev-server를 설치한 경우 webpack serve 명령어를 이용하여 실행 가능한 개발 서버에 대한 설정
  devServer: {
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader'],
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin
  ]
}