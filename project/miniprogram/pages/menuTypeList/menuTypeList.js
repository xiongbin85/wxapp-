const app = getApp()
import {
  get
} from "../../utils/db"
Page({
  data: {
    typeList: []
  },
  onLoad() {
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
    this.getMenuTypeList()
  },
  onShow() {
    this.getMenuTypeList()
  },
  //获取菜谱分类列表
  async getMenuTypeList() {
    let {
      openid
    } = this.data
    let res = await get("menuType", {
      _openid: openid
    })
    this.setData({
      typeList: res.data
    })
  },
  oneMenuType(e) {
    let _id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/typeDetail/typeDetail?id=' + _id,
    })
  }
})