function serializeToJson(form) {
    var result = {};
    // 获取到列表中用户输入的内容
    // [{name:'email',value:'用户输入的内容'},{...}]
    var f = form.serializeArray();
    f.forEach(function (item) {
        // tesult.email
        result[item.name] = item.value;
    });
    return result;
}