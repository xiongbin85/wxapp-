const app = getApp()
const db = wx.cloud.database()
import {
  get,
  add,
  inc
} from "../../utils/db"
Page({
  data: {
    menuDetail: {},
    _id: "",
    like: false,
    openid: "",
    follows: 0
  },
  async onLoad(e) {
    // 获取openid
    let _openid = wx.getStorageSync("openid")
    // 获取传过来的_id
    let _id = e.id
    //用户的关注列表
    let res = await get("follow", {
      _openid
    })
    //如果关注列表里面有_id就已关注
    let like = res.data.some(item => item.menuId == _id)
    this.setData({
      _id,
      like,
    })
    //渲染页面
    this.getMenuDetail()
  },
  //获取菜谱详情
  async getMenuDetail() {
    let {
      _id
    } = this.data
    //根据_id查询
    let res = await get("menu", {
      _id
    })
    // console.log(res,"111");
    let follows = res.data[0].follows
    let title = res.data[0].menuName
    wx.setNavigationBarTitle({
      title
    })
    this.setData({
      menuDetail: res.data[0],
      follows
    })
  },
  //添加关注
  async addFollow(e) {
    let _id = e.currentTarget.id
    let {
      menuName,
      fileIds
    } = this.data.menuDetail
    //把添加关注的人的信息和菜谱信息存入数据库
    add("follow", {
      menuId: _id,
      menuName,
      fileIds
    })
    //点击关注，关注数加1
    // db.collection('menu').doc(_id).update({
    //   data: {
    //     follows: db.command.inc(1)
    //   }
    // })
    inc("menu", _id, {
      follows: db.command.inc(1)
    })
    let follows = this.data.follows + 1
    this.setData({
      like: true,
      follows
    })
  },
  //取消关注
  delFollow() {
    let _openid = this.data.openid
    let menuId = this.data._id

    wx.showModal({
      content: '是否取消关注',
      success: (res) => {
        if (res.confirm) {
          wx.cloud.callFunction({
            name: "batchDel",
            data: {
              _openid,
              menuId
            },
            success: (res) => {
              //点击关注，关注数-1
              // db.collection('menu').doc(menuId).update({
              //   data: {
              //     follows: db.command.inc(-1)
              //   }
              // })
              inc("menu", menuId, {
                follows: db.command.inc(-1)
              })
              let follows = this.data.follows - 1
              this.setData({
                like: false,
                follows
              })
            }
          })
        }
      }
    })
  },
  //转发功能
  share() {
    wx.showToast({
      title: '暂无此功能',
      icon: "none"
    })
  }
})