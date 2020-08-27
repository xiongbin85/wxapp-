const app = getApp()
import {
    get,
    add
} from "../../utils/db"
import {
    uploadMany
} from "../../utils/uploadMany"
Page({
    data: {
        files: [],
        openid: "",
        typeList: [],
        userInfo: {}
    },
    onLoad() {
        //获取用户信息
        if (app.globalData.userInfo != null) {
            this.setData({
                userInfo: app.globalData.userInfo,
            })
        } else {
            // console.log(app);
            app.readyGetUserInfo = (res) => {
                console.log();
                this.setData({
                    userInfo: res.userInfo,
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
        //渲染
        this.getMenuTypeList()
    },
    //获取菜谱分类列表
    async getMenuTypeList() {
        let res = await get("menuType")
        // console.log(res);
        this.setData({
            typeList: res.data
        })
    },
    //选择图片
    chooseImg(e) {
        // console.log(e);
        //获取图片的临时路径并渲染到页面
        let files = e.detail.tempFilePaths.map(item => {
            return {
                url: item
            }
        })
        this.setData({
            files
        })
    },
    //上传图片并把数据存入数据库
    async submit(e) {
        //先上传图片
        let {
            files
        } = this.data
        let res = await uploadMany(files)
        //菜谱图片
        let fileIds = []
        res.forEach(item => {
            fileIds.push(item.fileID)
        })
        //把数据存入数据库
        //菜谱名
        let menuName = e.detail.value.menuName
        //菜谱分类id
        let typeId = e.detail.value.menuCate
        //菜做法
        let desc = e.detail.value.cookStep
        //添加的时间
        let addtime = new Date().getTime()
        //用户信息
        let {
            nickName,
            avatarUrl
        } = this.data.userInfo
        //关注数
        let follows = 0
        //浏览数
        let views = 0
        if (menuName == "" || typeId == "" || desc == "" || fileIds == []) {
            wx.showToast({
                title: "有空选项",
                icon: "none"
            })
            return
        } else {
            add("menu", {
                fileIds,
                menuName,
                typeId,
                desc,
                addtime,
                nickName,
                avatarUrl,
                follows,
                views
            })
            wx.showToast({
                title: '添加成功',
            })
            wx.reLaunch({
                url: '/pages/mine/mine',
            })
        }

    }
});