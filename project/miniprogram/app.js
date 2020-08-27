//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'test-lw7c5',
        traceUser: true,
      })
    }
    //查看用户授权情况，看用户是不是同意获取信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          //用户同意获取信息，调用wx.getUserInfo获取信息
          wx.getUserInfo({
            success: res => {
              //把信息赋给globalData
              this.globalData.userInfo = res.userInfo
              if (this.readyGetUserInfo) {
                this.readyGetUserInfo(res)
              }
            }
          })
        }
      }
    })
    //获取用户的openid
    wx.cloud.callFunction({
      name: "login",
      success: res => {
        this.globalData.openid = res.result.openid
        wx.setStorageSync("openid", res.result.openid)
        if (this.readyGetOpenId) {
          this.readyGetOpenId(res)
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    openid: null
  }
})