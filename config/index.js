// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    globle_var: {
      DOMAIN: '"http://shop.efubao.com"', // 接口服务器主域名
      PICTURE_HOST: '"http://img2.efbimg.com"', // 图片拼接路径
      UPLOAD_IMAGE: '"http://openapi.efubao.com/oss/fileupload/singlepic?platform=plt&businessType=order"' // 上传路径
    }
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    apiPort: 3000,
    distPort: 8081,//打包目录
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false,
    globle_var: {
      // DOMAIN: '"http://shop.efubao.qa"', // 接口服务器主域名
      // DOMAIN: '"http://shop.efubao.devp:9010"', // 接口服务器主域名
      // DOMAIN: '"http://localhost:3000"', // 接口服务器主域名
      // DOMAIN: '"http://shop.efubao.prod"', // 接口服务器主域名
      // DOMAIN: '"http://10.20.3.137:3000"', // 接口服务器主域名
      DOMAIN: '"http://10.20.1.56:3000"', // 接口服务器主域名
      PICTURE_HOST: '"http://img2-qa.efbimg.com"', // 图片拼接路径
      UPLOAD_IMAGE: '"http://openapi.efubao.qa/oss/fileupload/singlepic?platform=plt&businessType=order"' // 图片上传路径 
    }
  },
  test: {
    env: require('./test.env'),
    globle_var: {
      DOMAIN: '"http://shop.efubao.qa"', // 接口服务器主域名
      PICTURE_HOST: '"http://img2-qa.efbimg.com"', // 图片拼接路径
      UPLOAD_IMAGE: '"http://openapi.efubao.qa/oss/fileupload/singlepic?platform=plt&businessType=order"' // 图片上传路径 
    }
  },
  devp: {
    env: require('./devp.env'),
    globle_var: {
      DOMAIN: '"http://shop.efubao.prod"', // 接口服务器主域名
      PICTURE_HOST: '"http://img2-qa.efbimg.com"', // 图片拼接路径
      UPLOAD_IMAGE: '"http://openapi.efubao.qa/oss/fileupload/singlepic?platform=plt&businessType=order"' // 图片上传路径 
    }
  }
}
