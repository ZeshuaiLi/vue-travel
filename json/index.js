const glob = require('glob');
// 获取所有文件夹中的json地址
const paths = glob.sync('json/**/*.json').map(path => {
    return path.slice(5, -5); // get/user
})
const data = {};

paths.forEach(path => {
    data[path] = require('./' + path);
})

module.exports = data;