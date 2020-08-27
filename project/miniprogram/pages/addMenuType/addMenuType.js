//引入添加数据库方法
import {
    add,
    get,
    del,
    update
} from "../../utils/db"
Page({
    data: {
        typeList: [],
        addMenuType: false,
        updateMenuType: false,
        index: 0,
        _id: ""
    },
    //加载菜谱分类列表
    onLoad() {
        this.showMenuTypeList()
    },
    //渲染页面
    async showMenuTypeList() {
        let res = await get("menuType")
        // console.log(res);
        this.setData({
            typeList: res.data
        })
    },
    //显示添加输入框
    showAddMenuType() {
        this.setData({
            addMenuType: true
        })
    },
    //显示修改输入框
    showUpdateMenuType(e) {
        let _id = e.currentTarget.id
        let index = e.currentTarget.dataset.index
        this.setData({
            updateMenuType: true,
            _id,
            index
        })
    },
    //添加菜谱分类
    addMenuType(e) {
        let {
            typeName
        } = e.detail.value
        if (typeName == "") {
            wx.showToast({
                title: '不能添加空菜谱分类名',
                icon: "none"
            })
        } else {
            //添加数据库
            add("menuType", {
                typeName
            })
            this.setData({
                typeList: this.data.typeList.concat({
                    typeName
                }),
                addMenuType: false
            })
            wx.showToast({
                title: '添加成功',
                icon: "none"
            })
        }
    },
    //删除菜谱分类
    delMenuType(e) {
        let _id = e.currentTarget.id
        let index = e.currentTarget.dataset.index
        let _this = this
        wx.showModal({
            content: '是否删除',
            success(res) {
                if (res.confirm) {
                    //根据_id删除数据
                    del("menuType", _id)
                    //删除下标为index的一项然后重新渲染页面
                    let typeList = _this.data.typeList
                        .filter((item, i) => {
                            return i != index
                        })
                    _this.setData({
                        typeList
                    })
                }
            }
        })
    },
    //修改菜谱分类
    async updateMenuType(e) {
        //获取修改的菜谱分类名
        let {
            typeName
        } = e.detail.value
        //获取修改的菜谱分类的_id 和当前页面数组的index
        let {
            _id,
            index
        } = this.data
        //修改菜谱分类名
        if (typeName == "") {
            wx.showToast({
                title: '不能添加空菜谱分类名',
                icon: "none"
            })
        } else {
            await update("menuType", _id, {
                typeName
            })
            this.data.typeList.forEach((item, i) => {
                if (i == index) {
                    item.typeName = typeName
                }
            })
            wx.showToast({
                title: '修改成功',
            })
            //重新渲染页面
            this.setData({
                updateMenuType: false,
                typeList: this.data.typeList
            })
        }

    }
})