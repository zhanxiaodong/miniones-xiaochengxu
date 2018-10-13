//logs.js
const util = require('../../utils/util.js')
var viplev = require('../../utils/viplev.js')

Page({
  data: {
    needAuth: false,
    address: null,
    logs: []
  },

  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      util.getOpenId()
      this.checkAuth()
      wx.showLoading({
        title: '授权中...',
      })
      var that = this
      that.next()
      wx.hideLoading()
    }
  },
  checkAuth: function () {
    if (!wx.getStorageSync('openId')) {
      this.setData({
        needAuth: true
      })
    } else {
      var zmsocre = this.data.zmsocre
      if (zmsocre) {
        var item = new Object()
        item.zmsocre = zmsocre
        item.openId = wx.getStorageSync('openId')
        item.idCard = this.data.cerNo
        item.name = this.data.name
        wx.request({
          url: util.requestUrl + 'user/updateZmScore',
          method: 'POST',
          data: item,
          success: function (res) {

          }
        })
      }
      this.setData({
        needAuth: false
      })
    }
  },
  next:function(){
    wx.navigateTo({
      url: "/pages/check/check",
    })
  },
  onLoad: function (options) {
    var that = this;
    if (options.back) {
      wx.navigateTo({
        url: '../back/back?boxId=' + options.boxId
      })
    }
    if (options.share) {
      wx.navigateTo({
        url: '../invitation/invitation'
      })
    }
    if (options.zmscore) {
      that.setData({
        zmsocre: options.zmscore,
        name: options.name,
        cerNo: options.cerNo
      })
    }
    that.checkAuth()
    var userInfo = wx.getStorageSync('userInfo')
    wx.getSystemInfo({
      success: function (res) {
        var width = res.windowWidth - 20
        var height = res.windowHeight
        that.setData({
          contwidth: width,
          conqheight: height * 0.4,
          topHeight: Math.ceil(height / 600 * 30),
          imgwidth: (width - 14 - 40) / 2,
          conheight: height - 60
        });
      }
    });
  },
})
