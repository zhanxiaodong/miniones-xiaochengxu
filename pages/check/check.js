var util = require("../../utils/util.js")
import WxValidate from '../../utils/WxValidate'
Page({
  data: {
    smsCodeDisabled: true,
    second: false,
    sufix: ''
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.initValidate()
  },
  initValidate() {
    const rules = {
      mobile: {
        required: true,
        tel: true
      }
    }

    const messages = {
      mobile: {
        required: '请输入手机号'
      }
    }

    // 创建实例对象
    this.WxValidate = new WxValidate(rules, messages)
  },
  next: function (e) {
    util.saveFormId(wx.getStorageSync('openId'), e.detail.formId)
    var mobile = this.data.mobile
    var sufix = mobile.substring(mobile.length - 3)
    var that = this
    wx.request({
      url: util.requestUrl + 'user/getSmsCode?tel=' + mobile,
      success: function (res) {
        var code = res.data.data
        if (code) {
          that.setData({
            sufix: sufix,
            second: true,
            code: code
          })
          wx.navigateTo({
            url: "/pages/password/password?mobile=" + mobile + "&code="+code
          })
        } else {
          wx.showToast({
            title: '发送失败',
            image: '/images/icons/warn.png',
            duration: 2000
          })
        }
      }
    })

  },
  mobileInput: function (e) {
    var value = e.detail.value
    var message
    if (!value) {
      message = '请输入手机号'
    } else if (!/^1[34578]\d{9}$/.test(value)) {
      message = '请输入正确手机号'
    }
    if (message) {
      this.setData({
        smsCodeDisabled: true
      })
    } else {
      this.setData({
        mobile: value,
        smsCodeDisabled: false
      })
    }
  },
  getPhoneNumber: function (e) {
    if (e.detail.encryptedData) {
      util.getPhoneNum(e)

    }
  },
  toNext: function () {
    wx.navigateTo({
      url: "/pages/password/password"
    })
  },
  
})