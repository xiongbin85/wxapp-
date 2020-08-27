const app = getApp()
import {
    get,
    onlySkip
} from "../../utils/db"
Page({
    data: {
        menuList: [],
        menuType: [],
        openid: "",
        value: "",
        pageSize: 6,
        page: 0
    },
    async onLoad() {
        // let {
        //     page,
        //     pageSize
        // } = this.data
        // 获取openid
        if (app.globalData.openid != null) {
            this.setData({
                openid: app.globalData.openid
            })
        } else {
            app.readyGetOpenId = (res) => {
                this.setData({
                    openid: res.result.openid
                })
            }
        }
        // let res = await get("menu")
        // let maxPage = Math.ceil(res.data.length / pageSize)
        // this.data.maxPage = maxPage
        // console.log(page,pageSize);
        //渲染页面
        // this.getMenuList(page, pageSize)
        this.getMenuList()
        this.getMenuTypeList()
    },
    onShow() {
        this.getMenuList()
        this.getMenuTypeList()
    },
    //获取输入值
    getValue(e) {
        this.setData({
            value: e.detail.value
        })
    },
    //搜索
    search() {
        let {
            value
        } = this.data
        if (value == "") {
            wx.showToast({
                title: '不能输入空值',
                icon: "none"
            })
        } else {
            wx.navigateTo({
                url: "/pages/searchDetail/searchDetail?value=" + value
            })
        }
    },
    // //下拉获取下一页菜谱列表
    // async onReachBottom() {
    //     this.data.page += 1
    //     let pageSize = this.data.pageSize
    //     this.getMenuList(this.data.page, pageSize)
    // },
    // //获取第一页菜谱的列表
    // async getMenuList(page=0, pageSize=6) {
    //     if (page >= this.data.maxPage) {
    //         return
    //     } else {
    //         let res = await onlySkip("menu", page * pageSize, pageSize)
    //         this.setData({
    //             menuList: this.data.menuList.concat(res.data)
    //         })
    //     }
    // },
    //获取菜谱分类列表
    async getMenuList() {
        let res = await get("menu")
        this.setData({
            menuList: res.data
        })
    },
    async getMenuTypeList() {
        let res = await get("menuType")
        this.setData({
            menuType: res.data
        })
    },
    // 跳转详情页并传菜谱_id
    menuDetail(e) {
        let _id = e.currentTarget.id
        wx.navigateTo({
            url: '/pages/menuDetail/menuDetail?id=' + _id,
        })
    },
    //跳转菜谱分类页面
    toMenuType() {
        wx.navigateTo({
            url: '/pages/menuTypeList/menuTypeList',
        })
    },
    //跳转对应分类菜谱
    typeDetail(e) {
        let _id = e.currentTarget.id
        wx.navigateTo({
            url: '/pages/typeDetail/typeDetail?id=' + _id,
        })
    }
})