// 导入文章集合构造函数
const {
    Article
} = require('../../model/article');
// 导入分页模块 mongoose-sex-page
const pagination = require('mongoose-sex-page')

module.exports = async (req, res) => {
    // 接收get参数 获取页码值
    const page = req.query.page || 1;

    // 从数据库中查询数据
    let result = await pagination(Article).page(page).size(4).display(5).find().populate('author').exec();
    // res.send(result);
    // 渲染魔板并传递数据
    let str = JSON.stringify(result)
    let json = JSON.parse(str)
    res.render('home/default', {
        result: json
    })
}