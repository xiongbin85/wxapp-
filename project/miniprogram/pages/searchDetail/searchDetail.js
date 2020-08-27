const app = getApp()
import {
    get
} from "../../utils/db"
Page({
    data: {
        menuList: [],
        openid: "",
        value: ""
    },
    onLoad(e) {
        let value = e.value
        this.setData({
            value,
            openid: wx.getStorageSync("openid")
        })
        this.getMenuList()
    },
    //获取菜谱列表
    async getMenuList() {
        let {
            value,
            openid
        } = this.data
        let res = await get("menu")
        //筛选出菜谱名包含查询的字段
        this.setData({
            menuList: res.data.filter(item => {
                return item.menuName.includes(value)
            })
        })
    },
})