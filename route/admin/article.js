// 将文章集合的构造函数导入到当前文件中
const {
    Article
} = require('../../model/article')
// 导入mongoose-sex-page模块
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // 接收客户端传递过来的页码
    const page = req.query.page || 1;
    let count = await Article.countDocuments({});
    count = Math.ceil(count / 2);


    // 开放模板
    // 标识,表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    // 查询所有文章数据
    // 当集合联合查询和渲染页面模板同时进行时会导致两者冲突，从而导致无法渲染页面。所以报错
    // 利用 lean（） 方法将多级联合的结果转化为普通对象 ，缓解两者的冲突。
    // page 指定当前页
    // size 指定每页显示的数据条数
    // display 指定客户端要显示的页码数量
    // exec 向数据库发送查询请求
    let articles = await pagination(Article).find().page(page).size(2).display(count).populate('author').exec();
    let str = JSON.stringify(articles);
    let json = JSON.parse(str)
    // res.send(json)
    // 渲染文章列表页面模板
    res.render('admin/article', {
        articles: json,
    })
}