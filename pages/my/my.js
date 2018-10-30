var util = require("../../utils/util.js")
Page({
  data: {
    user: {
      days: 0,
      babyCount: 0,
      stylistCount: 0,
      currentBoxCount: 0,
      CouponCount:0
    },
    userInfo: {},
  },
  onShow: function(options) {
    this.findInfo()
  },
  findInfo: function() {
    var that = this
    var openId = wx.getStorageSync('openId')
    var userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      that.setData({
        userInfo: userInfo
      })
    }
    wx.request({
      url: util.requestUrl + 'user/findUserInfo?openId=' + openId,
      success: function(res) {
        var result = res.data.data
        that.setData({
          user: result
        })
      }
    })
  },
  goWoman: function() {
    wx.navigateTo({
      url: '../designinfo/designinfo',
    })
  },
  goOrder: function() {
    wx.navigateTo({
      url: '../order/order',
    })
  },
  goBaby: function() {
    wx.navigateTo({
      url: '../babyInfo/babyInfo',
    })
  },
  goReduce: function() {
    wx.navigateTo({
      url: '../coupon/coupon',
    })
  },
  invitePerson: function() {
    wx.navigateTo({
      url: '../invitation/invitation',
    })
  },
  goVip: function() {
    wx.navigateTo({
      url: '../club/club',
    })
  },
  goPlan: function() {
    wx.navigateTo({
      url: '../plan/plan',
    })
  },
  goWallet: function() {
    wx.navigateTo({
      url: '../wallet/wallet',
    })
  },
  goEmpty: function() {
    wx.navigateTo({
      url: '../empty/empty',
    })
  },
  
  goGuide: function() {
    wx.navigateTo({
      url: '../guide/guide',
    })
  }
})