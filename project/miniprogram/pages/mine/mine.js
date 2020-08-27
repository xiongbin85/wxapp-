const app = getApp()
import {
    get,
    del
} from "../../utils/db"
Page({
    data: {
        list: ["菜谱", "分类", "关注"],
        activeId: 0,
        userInfo: "",
        isLogin: false,
        menuType: [],
        openid: "",
        menuList: [],
        followList: [],
    },
    onLoad() {
        //获取用户信息
        if (app.globalData.userInfo != null) {
            this.setData({
                userInfo: app.globalData.userInfo,
                isLogin: true
            })
        } else {
            // console.log(app);
            app.readyGetUserInfo = (res) => {
                console.log();
                this.setData({
                    userInfo: res.userInfo,
                    isLogin: true
                })
            }
        }
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
        //渲染页面
        this.getMenuList()
        this.getMenuTypeList()
        this.getFollowList()
    },
    //页面渲染
    onShow() {
        //渲染页面
        this.getMenuList()
        this.getMenuTypeList()
        this.getFollowList()
    },
    //获取菜谱列表
    async getMenuList() {
        let {
            openid
        } = this.data
        let res = await get("menu", {
            _openid: openid
        })
        this.setData({
            menuList: res.data
        })
    },
    //获取菜谱分类列表
    async getMenuTypeList() {
        let res = await get("menuType")
        this.setData({
            menuType: res.data
        })
    },
    //删除菜谱
    delMenu(e) {
        let _id = e.currentTarget.id
        let index = e.currentTarget.dataset.index
        let _this = this
        wx.showModal({
            content: '是否删除',
            success(res) {
                if (res.confirm) {
                    //根据_id删除数据
                    del("menu", _id)
                    //删除下标为index的一项然后重新渲染页面
                    let menuList = _this.data.menuList
                        .filter((item, i) => {
                            return i != index
                        })
                    _this.setData({
                        menuList
                    })
                }
            }
        })
    },
    //向左滑动跳转分类列表
    slideButtonTap(e) {
        // console.log(e);
        let _id = e.currentTarget.id
        wx.navigateTo({
            url: '/pages/typeDetail/typeDetail?id=' + _id,
        })
    },
    //获取用户关注列表
    async getFollowList() {
        let {
            openid
        } = this.data
        let res = await get("follow", {
            _openid: openid
        })
        this.setData({
            followList: res.data
        })
    },
    //切换列表
    switch (e) {
        let index = e.currentTarget.id
        this.setData({
            activeId: index
        })
    },
    //登录
    login(e) {
        this.setData({
            userInfo: e.detail.userInfo,
            isLogin: true
        })
    },
    //跳转添加菜谱页面
    addMenu() {
        wx.navigateTo({
            url: '/pages/addMenu/addMenu',
        })
    },
    //跳转添加菜谱分类页面
    addMenuType() {
        wx.navigateTo({
            url: '/pages/addMenuType/addMenuType',
        })
    },
    //菜谱详情页面
    menuDetail(e) {
        let _id = e.currentTarget.id
        wx.navigateTo({
            url: '/pages/menuDetail/menuDetail?id=' + _id,
        })
    }
})