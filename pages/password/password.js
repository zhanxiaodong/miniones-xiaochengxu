var util = require("../../utils/util.js")
Page({
    data: {
        sufix: ''
    },
    onLoad: function (options) {
      var mobile = options.mobile
      var code = options.code
      var sufix = mobile.substring(mobile.length - 4)
      console.log(options)
      this.setData({
        mobile: mobile,
        code: code,
        sufix: sufix
      })
    },
    codeInput: function (e) {
      var value = e.detail.value
      this.setData({
        codeIn: value
      })
    },
    codeCheck: function () {
      var codeIn = this.data.codeIn
      var code = this.data.code
      var tel = this.data.mobile
      var openId = wx.getStorageSync('openId')
      if (code == codeIn) {
        var that = this
        wx.request({
          url: util.requestUrl + 'user/modifyOrRegist',
          method: 'POST',
          data: {
            userName: this.data.mobile,
            code: code,
            openId: wx.getStorageSync('openId')
          },
          success: function (res) {
            wx.setStorageSync('level', res.data.data.level)
            if (res.data.data.copyUser) {
              wx.showToast({
                title: '复制信息成功',
                icon: 'success',
                duration: 2000
              })
              setTimeout(function () {
                wx.switchTab({
                  url: '../index/index'
                })
              }, 2000)
            } else {
              wx.redirectTo({
                url: '../detail/detail',
              })
            }
          }
        })
      } else {
        wx.showToast({
          title: '验证码错误',
          image: '/images/warn.png',
          duration: 1000
        });
      }
    },
})