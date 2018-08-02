require('babel-register')
// require('nightwatch-cucumber')({
//   nightwatchClientAsParameter: true,
//   featureFiles: ['test/e2e/features'],
//   stepDefinitions: ['test/e2e/features/step_definitions'],
//   jsonReport: 'test/e2e/reports/cucumber.json',
//   htmlReport: 'test/e2e/reports/cucumber.html',
//   openReport: false
// })
var config = require('../../config')
var seleniumServer = require('selenium-server')
var phantomjs = require('phantomjs-prebuilt')

// http://nightwatchjs.org/gettingstarted#settings-file
module.exports = {
  src_folders: ['test/e2e/specs'], //测试文件的存放目录
  output_folder: 'test/e2e/reports', //测试报表的存放目录
  //custom_commands_path: ['test/e2e/custom-assertions'], //自定义命令存放目录
  custom_assertions_path: ['test/e2e/custom-assertions'], //自定义断言存放目录
  //page_objects_path: 'test/e2e/page-objects', //页面对象文件存放目录
  //global_path: '' //全局模块配置文件目录
  //live_output: '' false, //是否并行缓冲输出
  //disable_colors: false, //输出报表中禁用带有颜色的文字
  //paralel_process_delay: 10, //并行时进程启动延迟ms
  //test_worker: false, //配置并行式运行测试
  //test_runner: 'default', //配置其他测试运行器
  selenium: { //selenium 服务运行配置项
    start_process: true, //是否自动管理 selenium 进程
    start_session: true, //是否启动selenium会话
    server_path: seleniumServer.path, //selenium jar运行文件目录
    host: '127.0.0.1',
    //log_path: '', //日志输出目录
    port: 4444, //selenium 服务启动占用端口
    cli_args: { //selenium 命令行参数列表
      'webdriver.chrome.driver': require('chromedriver').path
      //'webdriver.firefox.profile':
      //'webdriver.ie.driver':
    }
  },

  test_settings: { //测试配置
    default: {
      selenium_port: 4444, //端口
      selenium_host: 'localhost', //主机地址
      request_timeout_options: 60000,//定义selenium的超时选项
      silent: true, //是否显示扩展的selenium命令日志
      output: true, //是否将结果输出到终端
      //disable_colors: false, //输出报表中禁用带有颜色的文字
      //screenshots: '', //设置 selenium 生成截屏的选项
      //username: '${SAUCE_USERNAME}', //设置Auth请求头中的票据
      //access_key: '${SAUCE_ACCESS_KEY}', //设置Auth请求头中的密码
      //proxy: '', //代理服务器 http://user:pass@host:port
      //desiredCapabilities: //描述浏览器的相关参数并传递至selenium
      //launch_url: 'http://localhost:' + (process.env.PORT || config.dev.port),//启动测试的URL
      //exclude: [], //配置不进行测试的文件
      //log_screenshot_data: false, //当启动截屏时不显示base64的图片数据
      //use_xpath: false, //使用XPath作为测试的元素定位默认策略
      //cli_args: {},//用于覆盖全局的 selenium.cli_args
      //end_session_on_fail: true, //当任意单元测试失败时终止会话
      //skip_testcases_on_fail: true, //当任意单元测试失败时忽略剩余的测试单元
      //output_folder: '', //指定JunitXML测试报告输出目录
      //persist_globals: false, //是否共享相同的全局配置
      //compatible_testcase_support: false, //是否允许测试写入与Mocha框架可互换的标准Express接口
      //detailed_output: true, //是否禁止断言输出具体的错误信息，只显示测试单元成功还是失败 主要用于并行测试
      globals: {//全局变量 或全局配置项 
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    phantom: {
      desiredCapabilities: {
        browserName: 'phantomjs',
        javascriptEnabled: true,
        acceptSslCerts: true,
        "phantomjs.page.settings.userAgent": 'Mozilla/5.0 (Macintosh; Intel MacOS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36',
        "phantomjs.binary.path": phantomjs.path
      }
    }
  }
}
