const Path = require('path');

// const jsonServer = require('json-server')
// const server = jsonServer.create()
// const router = jsonServer.router('db.json')
// const middlewares = jsonServer.defaults()

// module.exports = port => {
//   server.use(middlewares)
//   server.use(router)
//   server.listen(port, () => {
//     console.log('JSON Server is running')
//   })
// }

// 模拟接口配置
module.exports = port => {
  const express = require('express')
  const app = express()
  // const DATA = require('../json/index');
  app.use((req, res, next) => {
    const path = req.path
    const method = req.method
    const catalog = method.toLowerCase() + path;
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || 'localhost: 3000')
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
    // const result = DATA[catalog];
    if (method.toLowerCase() === 'options') {
      return res.json({
        code: 200
      })
    }
    let result;
    try {
      result = require(Path.resolve(__dirname, '../json/' + catalog));
    } catch(e){
      console.log(e);
      return res.json({
        code: 404,
        message: '不存在'
      })
    }
    if (result.code) {
      return res.json(result)
    }
    return res.json({
      code: 200,
      message: '获取成功',
      data: result
    });
    next();
  })
  app.listen(port);
}
