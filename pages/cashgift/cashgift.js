var util = require("../../utils/util.js")
Page({
  data: {
    amount: 0,
    needAuth: false,
    backHome: false
  },
  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      util.getOpenId()
      this.checkAuth()
    }
  },
  checkAuth: function () {
    if (!wx.getStorageSync('openId')) {
      this.setData({
        needAuth: true
      })
    } else {
      this.setData({
        needAuth: false
      })
    }
  },
  onLoad: function (options) {
    var otherOpenId = options.openId
    if (options.expre) {
      wx.reLaunch({
        url: '../classify/index',
      })
    } else if (otherOpenId) {
      this.checkAuth()
      this.setData({
        otherOpenId: otherOpenId,
        amount: 100,
        backHome: true
      })
    }
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          mapheight: res.windowHeight
        })
      }
    })
  },
  onUnload: function () {

  },
  onShow: function () {
    var openId = wx.getStorageSync('openId')
    if (openId) {
      this.findWalletInfo(openId)
    }
  },
  updateInv: function () {
    var otherOpenId = this.data.otherOpenId
    var openId = this.data.openId
    if (otherOpenId && openId) {
      var item = new Object()
      item.wechatOpenId = openId
      item.otherOpenId = otherOpenId
      var that = this
      wx.request({
        url: util.requestUrl + 'user/updateInv',
        method: 'POST',
        data: item,
        success: function(res){
          that.setData({
            otherOpenId: ''
          })
        }
      })
    }
  },
  findWalletInfo: function (openId) {
    var that = this
    wx.request({
      url: util.requestUrl + 'user/findWalletInfo?openId=' + openId,
      success: function (res) {
        var result = res.data.data
        var cash = result.cash
        if (cash) {
          that.setData({
            amount: cash
          })
        }
        var otherOpenId = that.data.otherOpenId
        if (otherOpenId && otherOpenId != openId) {
          that.setData({
            amount: cash + 100
          })
          that.updateInv()
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title: '孩童穿搭订阅:职场妈妈最爱,省时省心省力',
      imageUrl: "/images/inv.jpg",
      path: "pages/websh/websh?openId=" + wx.getStorageSync('openId')
    }
  },
  goback: function () {
    wx.reLaunch({
      url: '../clothes/clothes'
    })
  }
});