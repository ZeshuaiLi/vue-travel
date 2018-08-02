// 静态dist目录转发
module.exports = port => {
  const serve = require('serve')
  const path = require('path')
  const server = serve(path.resolve(__dirname, '../dist'), {
    port: port,
    ignore: ['node_modules']
  })
}
