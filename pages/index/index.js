//index.js
//获取应用实例
const app = getApp()

Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isShow:true
  },

  handleParent(){
		// console.log('父元素');
		// 跳转页面
		wx.switchTab({
			url: '/pages/list/list',
			success(){
				console.log('跳转成功');
			}
		})
  },
  
  handleGetUserInfo(data){
    // 判断用户点击的是允许还是拒绝
    if(data.detail.rawData){
      // 如果点击允许则重新onLoad
      this.onLoad();
    }
  },

  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  // 点击开启小程序之旅按钮跳转到list页面
  handleClick() {
    // 需要回退使用navigateTo，不需要回退使用redirectTo
    wx.navigateTo({
      url: '/pages/list/list',
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

    // 判断用户是否登录
    wx.getSetting({
      success:(data)=>{
        if(data.authSetting['scope.userInfo']){
          // 已登录则不显示登录按钮
          this.setData({
            isShow:false
          });
        }else{
          // 未登录则显示登录按钮
          this.setData({
            isShow:true
          });
        }
      }
    })
  },
  
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})