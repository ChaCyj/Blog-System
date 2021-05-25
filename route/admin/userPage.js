// 导入用户集合构造函数
const {
    User
} = require('../../model/user')

module.exports = async (req, res) => {
    // 开放模板
    // 标识,表示当前访问的是用户管理页面
    req.app.locals.currentLink = 'user';



    // 接收客户端传递过来的当前页参数 如果没有传入页码 显示第一页
    let page = req.query.page || 1;
    // res.send(page);

    // 每一页显示的数据条数
    let pagesize = 10;
    // 查询用户数据的总数 不指定查询条件 就是查询所有
    let count = await User.countDocuments({})
    // 总页数
    let total = Math.ceil(count / pagesize);
    // console.log(total);

    // 页码对应的数据查询开始位置
    let start = (page - 1) * pagesize;

    // 将用户信息从数据库中查询出来
    let users = await User.find({}).limit(pagesize).skip(start);
    // users 是一个数组
    // res.send(users)

    // 渲染用户列表模板
    res.render('admin/user', {
        users: users,
        // 传入当前页 页码
        page: page,
        // 传入总页数
        total: total,
        // 传入数据条数
        count: count
    })
}