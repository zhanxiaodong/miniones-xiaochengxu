var util = require("../../utils/util.js")
Page({
  data: {
    user: {
      days: 0,
      babyCount: 0,
      stylistCount: 0,
      currentBoxCount: 0,
      CouponCount:0,
    },
    userInfo: {},
    vipImg: '/images/icons/h-gray.png'
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
        var level = res.data.data.user.level
        var vipImg = that.data.vipImg
        if (level >= 40){
          vipImg = '/images/icons/h-yellow.png'
        }
        that.setData({
          user: result,
          vipImg: vipImg
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
      url: '../babyInfo/babyInfo?edit=edit',
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
    var that = this
    var openId = wx.getStorageSync('openId')
    wx.request({
      url: util.requestUrl + 'user/findUserInfo?openId=' + openId,
      success: function (res) {
        var result = res.data.data
        var level = res.data.data.user.level
        if (level >= 40) {
          wx.navigateTo({
            url: '../vip/vip',
          })
        } else {
          wx.navigateTo({
            url: '../club/club',
          })
        }
        that.setData({
          user: result,
        })
      }
    })
  },
  goPlan: function() {
    wx.navigateTo({
      url: '../plan/plan?setting=setting',
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