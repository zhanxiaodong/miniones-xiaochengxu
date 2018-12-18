var util = require("../../utils/util.js")
import WxValidate from '../../utils/WxValidate'
Page({
  data: {
    codeDis: false,
    phoneCode: '获取验证码',
    smsCodeDisabled: true,
    second: false,
    time: 60
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
    console.log(mobile)
    var that = this
    wx.request({
      url: util.requestUrl + 'user/getSmsCode?tel=' + mobile,
      success: function (res) {
        var code = res.data.data
        if (code) {
          that.setData({
            second: true,
            code: code,
            phoneCode: 60,
           
          })
          let time = setInterval(()=>{
            let phoneCode = that.data.phoneCode
            phoneCode --
            that.setData({
              phoneCode: phoneCode,
              codeDis: true
            })
            if (phoneCode == 0 || phoneCode == null){
               clearInterval(time)
               that.setData({
                 phoneCode: "获取验证码",
                 codeDis: false
               })
            }
          },1000)
          // wx.navigateTo({
          //   url: "/pages/password/password?mobile=" + mobile + "&code="+code
          // })
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
  // toNext: function () {
  //   wx.navigateTo({
  //     url: "/pages/password/password"
  //   })
  // },

  codeInput: function (e) {
    var value = e.detail.value
    console.log(value)
    this.setData({
      codeIn: value
    })
  },

  codeCheck: function () {
    wx.showLoading({
      title: '',
      mask: true
    })
    var codeIn = this.data.codeIn
    var code = this.data.code
    console.log(this.data.code)
    console.log(this.data.codeIn)
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
          wx.hideLoading()
          wx.setStorageSync('level', res.data.data.level)
          if (res.data.data.copyUser) {
            wx.showToast({
              title: '复制信息成功',
              icon: 'success',
              duration: 2000
            })
            setTimeout(function () {
              wx.reLaunch({
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

  /*验证码倒计时*/
  // next: function (options) {
  //   var that = this;
  //   var currentTime = that.data.currentTime;
  //   that.setData({
  //     time: currentTime + '秒'
  //   })
  //   interval = setInterval(function () {
  //     that.setData({
  //       time: (currentTime - 1) + '秒'
  //     })
  //     currentTime--;
  //     if (currentTime <= 0) {
  //       clearInterval(interval)
  //       that.setData({
  //         time: '重新获取',
  //         currentTime: 60,
  //         disabled: false
  //       })
  //     }
  //   }, 1000)
  // },

  // next: function () {
  //   var times = this.data.times
  //   if (times > 1) {
  //     times--
  //     this.setData({
  //       times: times,
  //       disabled: 'true'
  //     })
  //     setTimeout(this.next, 1000);
  //   } else {
  //     console.log(times)
  //     this.setData({
  //      disabled: 'false'
  //     })
  //   }
  // },
})