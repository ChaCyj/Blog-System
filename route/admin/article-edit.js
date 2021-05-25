module.exports = (req, res) => {
    // 开放模板
    // 标识,表示当前访问的是文章管理页面
    req.app.locals.currentLink = 'article';

    res.render('admin/article-edit')
}