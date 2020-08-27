import {
  get
} from "../../utils/db"
Page({
  data: {
    hotSearch: [],
    value: "",
    recent: []
  },
  async onLoad() {
    let _openid = wx.getStorageSync("openid")
    let res = await get("menu", {
      _openid
    })
    // console.log(res); 
    let arr = res.data
    //根据浏览数排序
    arr.sort((a, b) => {
      return b.views - a.views
    })
    //截取前五位
    let hotSearch = arr.slice(0, 5)
    this.setData({
      hotSearch
    })

  },
  onShow() {
    let recent = wx.getStorageSync("recent").slice(0, 3)
    this.setData({
      recent
    })
  },
  menuDetail(e) {
    let _id = e.currentTarget.id
    wx.navigateTo({
      url: '/pages/menuDetail/menuDetail?id=' + _id,
    })
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
      let {
        recent
      } = this.data
      //历史记录为空时给recent一个初始值
      if (recent == []) {
        wx.setStorageSync("recent", [])
      }
      recent = wx.getStorageSync("recent")
      let index = recent.findIndex(item => {
        return item == value
      })
      // console.log(index);
      if (index != -1) {
        recent.splice(index, 1)
      }
      //把记录存在数组第一位
      recent.unshift(value)
      wx.setStorageSync("recent", recent)
      wx.navigateTo({
        url: "/pages/searchDetail/searchDetail?value=" + value
      })
    }
  },
  typeList(e) {
    let value = e.currentTarget.id
    wx.navigateTo({
      url: "/pages/searchDetail/searchDetail?value=" + value
    })
  }
})