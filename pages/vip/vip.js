// pages/vip/vip.js
var util = require("../../utils/util.js")
Page({

  data: {
    vipIcon: '/images/vip-gray.png',
    vipDetail: [
      { describe: '免押金免服务费（个性搭配与顺丰上门）'},
      { describe: '每季度获赠600元立减券' },
      { describe: '迷你王国所有消费专享9折' },
      { describe: '优惠递增（3件8折，整盒6折）' },
      { describe: '成长徽章' },
      { describe: '生日礼遇' },
    ]
  },

  onShow: function (options) {
    this.findInfo()
  },

  findInfo: function () {
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
      success: function (res) {
        var result = res.data.data
        var level = res.data.data.user.level
        that.setData({
          user: result,
          level: level
        })
      }
    })
  }
})