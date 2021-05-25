// 引用express框架
const express = require('express');
// 创建网站服务器
const app = express();
// 系统模块path 处理路径
const path = require('path')
// 数据库连接
require('./model/connect');
// 导入express-session模块
const session = require('express-session');
// 导入 art-template模板引擎
const template = require('art-template');
// 引入dateformat 进行全局配置 (所有模板都能使用了)
const dateFormat = require('dateformat');
// 引入morgan第三方模块
const morgan = require('morgan');
// 引入config第三方模块
const config = require('config');



// 处理post请求参数
app.use(express.urlencoded({
    // 推荐设置为false 使用系统模块querystring 处理请求参数的格式
    extended: false,
    // 处理完成后 post参数被保存在了body当中
}));

console.log(config.get('title'));

// 获取系统环境变量 返回值是一个对象:当前系统中的系统环境变量和值
if (process.env.NODE_ENV == 'development') {
    // 当前是开发环境
    console.log('当前是开发环境');
    // 调用morgan第三方模块
    // 在开发环境中 将客户端发送到服务器端的请求信息打印到控制台中
    app.use(morgan('dev'))
} else {
    // 当前是生产环境 production
    console.log('当前是生产环境');
}

// 拦截所有请求,交给session处理 配置session
app.use(session({
    resave: true, // 新增
    saveUninitialized: false, // 新增
    secret: 'secret key',
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
    }
}));


// 告诉express框架模板所在的位置
app.set('views', path.join(__dirname, 'views'));
// 告诉express框架模板的默认后缀是什么
app.set('view engine', 'art');
// 当渲染后缀为art的模板时 所使用的模板引擎的是什么
app.engine('art', require('express-art-template'));

// 向模板内部导入dateFormat变量
template.defaults.imports.dateFormat = dateFormat;


// 开放静态资源文件
app.use(express.static(path.join(__dirname, 'public')))

// 导入路由模块
const home = require('./route/home');
const admin = require('./route/admin');

// 拦截请求 判断用户状态 以/admin开头都会被拦截
app.use('/admin', require('./middleware/loginGuard'))


// 匹配一级路由请求路径 app.use进行拦截
app.use('/home', home);
app.use('/admin', admin);

// 错误处理中间件
app.use((err, req, res, next) => {
    // err 拿到了 next()传递过来的字符串
    // 将字符串对象转换为对象类型
    // JSON.parse()
    const result = JSON.parse(err);
    let params = [];
    for (let attr in result) {
        if (attr != 'path') {
            params.push(attr + '=' + result[attr]);
        }
    }
    res.redirect(`${result.path}?${params.join('&')}`);
})


// 监听端口
app.listen(8080);
console.log('网站服务器启动成功,请访问localhost');