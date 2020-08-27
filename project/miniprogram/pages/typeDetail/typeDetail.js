const app = getApp()
import {
  get,
  skip
} from "../../utils/db"
Page({
  data: {
    menuList: [],
    typeName: "",
    pageSize: 5,
    page: 0
  },
  async onLoad(e) {
    let {
      page,
      pageSize
    } = this.data
    //根据传过来的id在菜谱列表里面寻找符合条件的数据
    let _id = e.id
    let res = await get("menu", {
      typeId: _id
    })
    let maxPage = Math.ceil(res.data.length / pageSize)
    let result = await get("menuType", {
      _id
    })
    let typeName = result.data[0].typeName
    this.setData({
      typeName,
      _id,
      maxPage
    })
    this.getList(page, pageSize)
  },
  //下拉获取下一页信息
  async onReachBottom() {
    this.data.page += 1
    let pageSize = this.data.pageSize
    this.getList(this.data.page, pageSize)
  },
  //获取一页的信息
  async getList(page, pageSize) {
    let {
      _id,
      maxPage
    } = this.data
    if (page >= maxPage) {
      return
    } else {
      let res = await skip("menu", {
        typeId: _id
      }, page * pageSize, pageSize)
      this.setData({
        menuList: this.data.menuList.concat(res.data)
      })
    }

  }
})