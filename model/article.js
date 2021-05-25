// 1.引入mongoose模块 数据库依赖
const mongoose = require('mongoose');

// 2.创建文章集合规则
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 20,
        required: [true, '请填写文章标题']
    },
    // 作者:实际上就是用户集合中的usernmae 所以要进行关联
    author: {
        // _id 的类型
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, '请传递作者信息']
    },
    publishDate: {
        type: Date,
        default: Date.now,
    },
    cover: {
        type: String,
        default: null
    },
    content: {
        type: String,
    }
})

// 3.根据规则创建集合
const Article = mongoose.model('Article', articleSchema)

// 4.将集合规则作为模块成员进行导出
module.exports = {
    Article: Article,
}