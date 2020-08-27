// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
    // API 调用都保持和云函数当前所在环境一致
    env: "test-lw7c5"
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
    let {
        _openid,
        menuId
    } = event;
    return await db.collection("follow").where({
        _openid,
        menuId
    }).remove()
}